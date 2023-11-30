import * as React from "react";
import { Grid } from "@mui/material";
import { createGlobalStyle } from "styled-components";

import Sidebar from "./sideBar";
import ChatApp from "./chatApp";

const CenteredGrid = (agentUser) => {
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
            <Sidebar user={agentUser.agentUser} />
          </div>
        </Grid>
        <Grid item xs={12} sm={10}>
          <ChatApp user={agentUser.agentUser} />
        </Grid>
      </Grid>
    </>
  );
};

export default CenteredGrid;
