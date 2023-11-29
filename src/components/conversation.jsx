import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";

import IconButton from "@mui/material/Button";

export default function Conversation() {
  const handleSubmit = (event) => {
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
