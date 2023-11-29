import * as React from "react";
import { Grid } from "@mui/material";
import Sidebar from "./components/sideBar";
import ChatApp from "./components/message";

const CenteredGrid = () => {
  const gridStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const agent = {
    avatar: {
      alt: "d2c Agent Avatar",
      src: "https://static.coverwallet.com/logos-catalog/agent-avatar-495987bb-e03e-4344-8add-81093d6f76b4.png",
    },
    name: "Chris",
    description: "Your Personal Advisor",
    phone: "(646) 844-9933",
    phoneIcon: true,
    email: false,
    emailIcon: true,
  };

  const user = {
    avatar: {
      alt: "",
      src: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F59%2FUser-avatar.svg%2F800px-User-avatar.svg.png&tbnid=QhTI36alBacoyM&vet=12ahUKEwj3jrH3oemCAxXVmScCHY_KDV0QMygAegQIARBz..i&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUser-avatar.svg&docid=jkSSRW6HEZViEM&w=800&h=800&q=user%20avatar&ved=2ahUKEwj3jrH3oemCAxXVmScCHY_KDV0QMygAegQIARBz",
    },
    name: "User",
    description: false,
    phone: "(646) 854-9933",
    phoneIcon: false,
    email: false,
    emailIcon: false,
  };

  return (
    <Grid container spacing={2} style={gridStyle}>
      {/* First column 20% */}
      <Grid item xs={12} sm={2}>
        <Sidebar user={agent} />
      </Grid>

      {/* Second column 60% */}
      <Grid item xs={12} sm={8}>
        <ChatApp />
      </Grid>

      {/* Third column 20% */}
      <Grid item xs={12} sm={2}>
        <Sidebar user={user} />
      </Grid>
    </Grid>
  );
};

export default CenteredGrid;
