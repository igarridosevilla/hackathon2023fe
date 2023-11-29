import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
// import SendIcon from '@mui/icons-material/Send';
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const UserAvatar = () => (
    <Avatar style={{ margin: 8 }}>
      <Avatar
        src={
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F59%2FUser-avatar.svg%2F800px-User-avatar.svg.png&tbnid=QhTI36alBacoyM&vet=12ahUKEwj3jrH3oemCAxXVmScCHY_KDV0QMygAegQIARBz..i&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUser-avatar.svg&docid=jkSSRW6HEZViEM&w=800&h=800&q=user%20avatar&ved=2ahUKEwj3jrH3oemCAxXVmScCHY_KDV0QMygAegQIARBz'
        }
        alt='User Avatar'
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        }}
      />
    </Avatar>
  );

  const BotAvatar = () => (
    <Avatar style={{ marginRight: 8 }}>
      <ChatIcon />
    </Avatar>
  );

  return (
    <Grid container spacing={2}>
      {/* Zona de mensajes */}
      <Grid
        item
        xs={12}
        md={12}
        style={{
          display: 'flex',
          height: '70vh',
        }}
      >
        <Paper
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 16,
            borderRadius: '3%',
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              {message.sender === 'user' ? <UserAvatar /> : <BotAvatar />}
              <Typography
                variant='body1'
                color={message.sender === 'user' ? 'primary' : 'textSecondary'}
                style={{ marginLeft: message.sender === 'bot' ? 8 : 0 }}
              >
                {message.text}
              </Typography>
            </div>
          ))}
        </Paper>
      </Grid>

      {/* Área de entrada de texto */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%", padding: "16px" }} // Set the width to 100%
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
        />
        <IconButton aria-label="send">
          <SendIcon />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default ChatApp;
