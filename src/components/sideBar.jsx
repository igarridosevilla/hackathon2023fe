import React from "react";
import { Container, Avatar, Typography, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Link from "@mui/material/Link";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const iconStyle = {
  fontSize: 30,
  margin: 8,
};

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px #000000`,
    width: "15%",
    height: "15%",
    borderRadius: "50%",

    "&::after": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

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
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt={user?.avatar.alt}
            sx={{
              m: 0,
              bgcolor: "secondary.main",
              width: 120,
              height: 120,
              border: "3px solid #007585",
            }}
            src={user?.avatar.src}
          />
        </StyledBadge>
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
