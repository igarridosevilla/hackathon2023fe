import React, { useState, useEffect } from "react";

const Api = () => {
  const [sessionId, setSessionId] = useState(null);

  // Function to start a session
  const startSession = async () => {
    const response = await fetch("http://localhost:5000/startSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add your API key if required
        "X-API-KEY": "12345",
      },
    });
    const data = await response.json();
    setSessionId(data.sessionId);

    const socket = new WebSocket("ws://localhost:5000/chat");
    setWebSocket(socket);

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
    });
  };

  const sendMessage = (text) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const message = {
        type: "message",
        text: text,
        sessionId: sessionId,
      };
      webSocket.send(JSON.stringify(message));
    }
  };

  // Function to get session history
  const getHistory = async () => {
    const response = await fetch(
      `http://localhost:5000/getHistory?sessionId=${sessionId}`
    );
    const data = await response.json();
    console.log(data.history);
  };

  // Function to get user info
  const getUserInfo = async () => {
    const response = await fetch(
      `http://localhost:5000/getUserInfo?sessionId=${sessionId}`
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    // Uncomment the following line to start a session when the component mounts
    // startSession();
  }, []);

  return (
    <div>
      <button onClick={startSession}>Start Session</button>
      <button onClick={getHistory}>Get History</button>
      <button onClick={getUserInfo}>Get User Info</button>
      <button onClick={sendMessage}>Get History</button>
    </div>
  );
};

export default Api;
