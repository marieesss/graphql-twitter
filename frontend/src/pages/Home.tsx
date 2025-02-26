import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  const username = localStorage.getItem('username') || 'Utilisateur';

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} textAlign="center">
        <Typography variant="h4" component="h1">
          Bienvenue, {username}!
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
