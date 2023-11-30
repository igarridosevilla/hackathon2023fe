import React, { useState, useRef, useEffect } from "react";
import { TextField, Paper, Typography, Grid, Avatar } from "@mui/material";
// import SendIcon from '@mui/icons-material/Send';
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const ChatApp = (bot) => {
  const [sessionId, setSessionId] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const paperRef = useRef();

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    startSession();
  }, []);

  useEffect(() => {
    setProgress(() => {
      return Math.min(
        messages.filter((msg) => msg.sender == "user").length * 5,
        100
      );
    });
  }, [messages]);

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
        border: "2px solid #007585",
      }}
      src={bot.user.avatar.src}
    />
  );
  console.log(bot);

  const UserMessage = (message, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        marginBottom: 16,
        justifyContent: "flex-end",
        placeItems: "center",
      }}
    >
      <div>
        <Typography
          variant="h6"
          color={"secondary.text"}
          style={{ marginRight: 16, textAlign: "right", fontSize: "1.1rem" }}
        >
          You{" "}
        </Typography>
        <Typography
          variant="body1"
          color={"primary.text"}
          style={{ marginRight: 16, textAlign: "right", fontSize: "1.1rem" }}
        >
          {message.message.text}
        </Typography>
      </div>
      <UserAvatar />
    </div>
  );

  const BotMessage = (message, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        marginBottom: 16,
        placeItems: "center",
      }}
    >
      <BotAvatar />
      <div>
        <Typography
          variant="h6"
          color={"secondary.text"}
          style={{
            marginLeft: 16,
            textAlign: "left",
            placeItems: "center",
            fontSize: "1.1rem",
          }}
        >
          {bot.user.name}
        </Typography>
        <Typography
          variant="body1"
          color={"secondary.text"}
          style={{
            marginLeft: 16,
            textAlign: "left",
            placeItems: "center",
            fontSize: "1.1rem",
          }}
        >
          {message.message.text}
        </Typography>
      </div>
    </div>
  );

  const messageComponent = (message, index) =>
    message.sender === "user" ? (
      <UserMessage key={index} message={message} />
    ) : (
      <BotMessage key={index} message={message} />
    );

  return (
    <>
      <Grid
        item
        xs={12}
        md={11.5}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "60%",
            paddingTop: 6,
          }}
        >
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 4,
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
              padding: 12,
              marginRight: "5%",
              backgroundColor: "#CDDBDE",
              borderRadius: "16px",
              border: "2px solid #007585",
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
            width: "83%",
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
            style={{
              backgroundColor: "#CDDBDE",
            }}
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
    </>
  );
};

export default ChatApp;
