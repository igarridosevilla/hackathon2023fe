import React, { useState, useRef, useEffect } from "react";
import { TextField, Paper, Typography, Grid, Avatar } from "@mui/material";
// import SendIcon from '@mui/icons-material/Send';
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

const ChatApp = () => {
  const [sessionId, setSessionId] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const paperRef = useRef();

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    startSession();
  }, []);

  // Function to start a session
  const startSession = async () => {
    const response = await fetch("http://localhost:5001/startSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "12345",
      },
    });
    const data = await response.json();

    setSessionId(data.sessionId);

    const socket = new WebSocket("ws://localhost:5001/chat");
    setWebSocket(socket);

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, { text: message.text, sender: "bot" }]);
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

  const handleSendMessage = () => {
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }

    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que se agregue un salto de línea al textarea
      handleSendMessage();
    }
  };

  const UserAvatar = () => (
    <Avatar
      alt="User Avatar"
      sx={{
        bgcolor: "#007585",
      }}
    />
  );

  const BotAvatar = () => (
    <Avatar
      alt={"Avatar"}
      sx={{
        bgcolor: "secondary.main",
      }}
      src={
        "https://static.coverwallet.com/logos-catalog/agent-avatar-495987bb-e03e-4344-8add-81093d6f76b4.png"
      }
    />
  );

  const UserMessage = (message, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        marginBottom: 16,
        placeItems: "center",
      }}
    >
      <UserAvatar />
      <Typography
        variant="body1"
        color={"primary.text"}
        style={{
          marginLeft: 8,
          textAlign: "left",
          placeItems: "center",
        }}
      >
        {message.message.text}
      </Typography>
    </div>
  );

  const BotMessage = (message, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        marginBottom: 16,
        justifyContent: "flex-end",
        placeItems: "center",
      }}
    >
      <Typography
        variant="body1"
        color={"textSecondary"}
        style={{ marginRight: 8, textAlign: "right" }}
      >
        {message.message.text}
      </Typography>
      <BotAvatar />
    </div>
  );

  const messageComponent = (message, index) =>
    message.sender === "user" ? (
      <UserMessage key={index} message={message} />
    ) : (
      <BotMessage key={index} message={message} />
    );

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: 12,
      }}
    >
      {/* Zona de mensajes */}
      <Grid
        item
        xs={12}
        md={12}
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Paper
          ref={paperRef}
          elevation={3}
          style={{
            flex: 1,
            overflowY: "auto",
            height: "calc(100% - 260px)",
            padding: 16,
          }}
        >
          {messages.map((message, index) => messageComponent(message, index))}
        </Paper>
      </Grid>

      {/* Área de entrada de texto */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sm={2}
        sx={{
          width: "70%",
          padding: "16px",
          position: "absolute",
          bottom: "16px",
        }} // Set the width to 100%
      >
        <TextField
          autoComplete="given-name"
          name="firstName"
          fullWidth
          id="firstName"
          label="Message GP-T2 ..."
          autoFocus
          multiline
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          maxRows={3}
        />
        <IconButton
          aria-label="send"
          sx={{
            height: "56px",
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default ChatApp;
