import * as React from 'react';
import { Grid } from '@mui/material';
import { createGlobalStyle } from 'styled-components';

import Sidebar from './components/sideBar';
import ChatApp from './components/chatApp';

const CenteredGrid = () => {
  const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #e5e5e5; 
  }
`;

  const agent = {
    avatar: {
      alt: 'd2c Agent Avatar',
      src: 'https://static.coverwallet.com/logos-catalog/agent-avatar-495987bb-e03e-4344-8add-81093d6f76b4.png',
    },
    name: 'Chris',
    description: 'Your Bot Advisor',
    phone: '(646) 844-9933',
    phoneIcon: true,
    email: false,
    emailIcon: true,
  };

  const user = {
    avatar: {
      alt: '',
      src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F59%2FUser-avatar.svg%2F800px-User-avatar.svg.png&tbnid=QhTI36alBacoyM&vet=12ahUKEwj3jrH3oemCAxXVmScCHY_KDV0QMygAegQIARBz..i&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUser-avatar.svg&docid=jkSSRW6HEZViEM&w=800&h=800&q=user%20avatar&ved=2ahUKEwj3jrH3oemCAxXVmScCHY_KDV0QMygAegQIARBz',
    },
    name: 'User',
    description: false,
    phone: '(646) 854-9933',
    phoneIcon: false,
    email: false,
    emailIcon: false,
  };

  return (
    <>
      <GlobalStyle />
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img src='/images/logo.png' alt='test' loading='lazy' width='120' />
          <Sidebar user={agent} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <ChatApp />
        </Grid>
      </Grid>
    </>
  );
};

export default CenteredGrid;
