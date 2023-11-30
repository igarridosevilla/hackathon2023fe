from quart import Quart, websocket, request, abort
from quart.json import jsonify
from quart_cors import cors
from chatbot import create_conversation
from dotenv import load_dotenv
import os

import json
import uuid
import functools
import logging


app = Quart(__name__)
app = cors(app, allow_origin="*")
logging.basicConfig(level=logging.DEBUG)
app.logger.setLevel(logging.DEBUG)

# Storage for session data
sessions = {}
conversation = create_conversation()

user_fixtures = {
    "JohnDoe123": {
        "name": "John",
        "surname": "Doe",
        "address": "123 Main St, Anytown, AN",
        "job": "Software Developer",
    }
}

VALID_API_KEYS = {"1234"}


def require_apikey(view_function):
    @functools.wraps(view_function)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get("X-API-KEY")
        if api_key in VALID_API_KEYS:
            return view_function(*args, **kwargs)
        else:
            abort(401)  # Unauthorized

    return decorated_function


@app.route("/startSession", methods=["POST"])
# @require_apikey
def start_session():
    # Generate a unique session ID
    session_id = str(uuid.uuid4())
    sessions[session_id] = {"conversation": None}  # Initialize conversation history
    return jsonify(sessionId=session_id), 200


@app.route("/getHistory", methods=["GET"])
# @require_apikey
def get_history():
    session_id = request.args.get("sessionId")
    if session_id not in sessions:
        return jsonify(error="Session not found"), 404
    return jsonify(history=sessions[session_id]), 200


@app.route("/getUserInfo", methods=["GET"])
# @require_apikey
async def get_user_info():
    session_id = request.args.get("sessionId")
    if session_id not in sessions:
        return jsonify(error="Session not found"), 404
    # Assuming a fixed user fixture for demonstration
    user_info = user_fixtures.get("JohnDoe123", {})
    return jsonify(user_info), 200


@app.websocket("/chat")
async def chat():
    while True:
        data = await websocket.receive()
        if data is None:
            break
        message = json.loads(data)
        # {'type':'message','text':'input/output text','session_id':'auuid'}
        if message["type"] == "message":
            session_id = message.get("sessionId")
            conversation = ""
            text_input = message["text"]
            if text_input != "exit":
                if os.environ["DEV_MOCKS"] == "true":
                    text_input = message["text"]
                    await websocket.send(
                        json.dumps({"type": "response", "text": text_input})
                    )
                else:
                    if session_id and session_id in sessions:
                        conversation = sessions[session_id]["conversation"]
                    else:
                        conversation = create_conversation()
                        sessions[session_id] = {"conversation": conversation}
                    if conversation is None:
                        conversation = create_conversation()
                        sessions[session_id] = {"conversation": conversation}
                    response = conversation({"question": text_input})
                    # Send the response back to the client
                    await websocket.send(
                        json.dumps({"type": "response", "text": response["text"]})
                    )


if __name__ == "__main__":
    load_dotenv(override=True)
    app.run(debug=True, port=5001, host="0.0.0.0")
