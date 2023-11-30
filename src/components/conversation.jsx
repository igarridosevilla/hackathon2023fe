import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";

import IconButton from "@mui/material/Button";

export default function Conversation() {
  const [sessionId, setSessionId] = useState(null);

  // Function to start a session
  const startSession = async () => {
    const response = await fetch("http://localhost:5000/startSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "12345",
      },
    });
    const data = await response.json();
    console.log("Received message:", data);

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

  const handleSubmit = (event) => {
    startSession();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="m">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="Message GP-T2 ..."
                autoFocus
                variant="filled"
                multiline
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton aria-label="send">
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
