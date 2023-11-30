import React from "react";
import { Container, Avatar, Typography, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Link from "@mui/material/Link";

const iconStyle = {
  fontSize: 30,
  margin: 8,
};
export default function SideBar({ user }) {
  return (
    <Container
      component="agentSideBar"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user?.avatar && (
        <Avatar
          alt={user?.avatar.alt}
          sx={{ m: 1, bgcolor: "secondary.main", width: 120, height: 120 }}
          src={user?.avatar.src}
        />
      )}
      {user?.name && (
        <Typography variant="h5" gutterBottom style={{ marginTop: 16 }}>
          {user?.name}
        </Typography>
      )}
      {user?.description && (
        <Typography variant="h7" color="textSecondary" gutterBottom>
          {user?.description}
        </Typography>
      )}
      {user?.phone && (
        <Link
          href="https://mui.com/material-ui/getting-started/templates/"
          underline="hover"
        >
          {user?.phone}
        </Link>
      )}
      <Container
        component="contact"
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {user?.phoneIcon && (
          <IconButton>
            {user?.phoneIcon && <PhoneIcon style={iconStyle} />}
          </IconButton>
        )}
        {user?.emailIcon && (
          <IconButton>
            {user?.emailIcon && <EmailIcon style={iconStyle} />}
          </IconButton>
        )}
      </Container>
    </Container>
  );
}
