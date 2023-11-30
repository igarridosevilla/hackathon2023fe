import * as React from "react";
import { Grid } from "@mui/material";
import { createGlobalStyle } from "styled-components";

import Sidebar from "./components/sideBar";
import ChatApp from "./components/chatApp";

const CenteredGrid = () => {
  const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #EEF6F7; 
  }

  ::-webkit-scrollbar {
    display: none;
}
`;

  const agent = {
    avatar: {
      alt: "d2c Agent Avatar",
      src: "https://static.coverwallet.com/logos-catalog/agent-avatar-495987bb-e03e-4344-8add-81093d6f76b4.png",
    },
    name: "Chris",
    description: "Your Bot Advisor",
    phone: "(646) 844-9933",
    phoneIcon: true,
    email: false,
    emailIcon: true,
  };

  const agentRoberto = {
    avatar: {
      alt: "d2c Agent Avatar",
      src: "https://www.intelligentinsurer.com/media/image/roberto-pinto-president-of-digital-client-solutions-at-aon-1.jpg",
    },
    name: "Roberto Pinto",
    description: "Your Boss Advisor",
    phone: "(646) 844-9933",
    phoneIcon: true,
    email: false,
    emailIcon: true,
  };

  const agentBicho = {
    avatar: {
      alt: "d2c Agent Avatar",
      src: "https://images.news18.com/ibnlive/uploads/2022/12/cristiano-ronaldo-ap-8.jpg",
    },
    name: "El bicho",
    description: "Your bicho Advisor",
    phone: "(646) 844-9933",
    phoneIcon: true,
    email: false,
    emailIcon: true,
  };

  const agentMichael = {
    avatar: {
      alt: "d2c Agent Avatar",
      src: "https://www.looper.com/img/gallery/the-office-stars-reveal-the-hilarious-true-story-behind-the-famous-michael-meme/intro-1683470325.jpg",
    },
    name: "Michael Scott",
    description: "Your best boss Advisor",
    phone: "(646) 844-9933",
    phoneIcon: true,
    email: false,
    emailIcon: true,
  };

  return (
    <>
      <GlobalStyle />
      <Grid
        container
        spacing={1}
        sx={{
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src="/images/logo.png" alt="test" loading="lazy" width="120" />
          <div
            style={{
              height: "50%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Sidebar user={agentRoberto} />
          </div>
        </Grid>
        <Grid item xs={12} sm={10}>
          <ChatApp user={agentRoberto} />
        </Grid>
      </Grid>
    </>
  );
};

export default CenteredGrid;
