# Coverbot backend

This repository contains the code for a simple chatbot application using Flask (Quart) for handling RESTful API endpoints and WebSocket connections.

## Requirements

- Python 3.6+
- Quart

## Installation
On the root folder of the repo

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
cd server
pip install -r requirements.txt
python main.py
```

This will start the server on localhost at the default port (8000). You can access the REST API endpoints and establish WebSocket connections at http://localhost:5000.

## Test it
### 1. Start a New Chatbot Session

This endpoint starts a new chatbot session and returns a session ID.

```bash
curl -X POST http://localhost:8000/startSession -H "X-API-KEY: 12345"
```
### 2. Retrieve the Conversation History
This endpoint retrieves the conversation history for a given session. Replace <session_id> with an actual session ID returned from the /startSession endpoint.

```bash
Copy code
curl -X GET "http://localhost:8000/getHistory?sessionId=<session_id>" -H "X-API-KEY: 12345"
```
### 3. Retrieve User Information
This endpoint retrieves user information for a given session. Again, replace <session_id> with an actual session ID.


```bash
Copy code
curl -X GET "http://localhost:8000/getUserInfo?sessionId=<session_id>" -H "X-API-KEY: 12345"
``````
