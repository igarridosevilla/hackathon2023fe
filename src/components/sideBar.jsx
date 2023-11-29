import React from 'react';
import { Grid, Paper, Avatar, Typography, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Sidebar = ({ user }) => {
  const containerStyle = {
    // height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
  };

  const avatarStyle = {
    width: 100,
    height: 100,
  };

  const iconStyle = {
    fontSize: 30,
    margin: 8,
  };

  return (
    <div style={containerStyle}>
      <Paper style={{ padding: 16, textAlign: 'center' }}>
        {user?.avatar && (
          <Avatar
            alt={user?.avatar.alt}
            src={user?.avatar.src}
            style={avatarStyle}
          />
        )}
        {user?.name && (
          <Typography variant='h6' gutterBottom style={{ marginTop: 16 }}>
            {user?.name}
          </Typography>
        )}
        {user?.description && (
          <Typography
            variant='body2'
            color='textSecondary'
            gutterBottom
            style={{ marginTop: 16 }}
          >
            {user?.description}
          </Typography>
        )}
        {user?.phone && (
          <Typography
            variant='body2'
            color='textSecondary'
            gutterBottom
            style={{ marginTop: 16 }}
          >
            {user?.phone}
          </Typography>
        )}
        {(user?.phoneIcon || user?.emailIcon) && (
          <IconButton>
            {user?.phoneIcon && <PhoneIcon style={iconStyle} />}
            {user?.emailIcon && <EmailIcon style={iconStyle} />}
          </IconButton>
        )}
      </Paper>
    </div>
  );
};

export default Sidebar;
