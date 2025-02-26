import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const username = localStorage.getItem('username') || 'Utilisateur';

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1DA1F2', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Espace vide pour pousser le contenu vers le centre */}
          <Box sx={{ flex: 1 }} />

          {/* Liens de navigation centrés */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button color="inherit" component={Link} to="/home" sx={{ fontSize: '16px', fontWeight: '500' }}>
              Accueil
            </Button>
            <Button color="inherit" component={Link} to="/profile" sx={{ fontSize: '16px', fontWeight: '500' }}>
              Profil
            </Button>
            <Button color="inherit" component={Link} to="/friends" sx={{ fontSize: '16px', fontWeight: '500' }}>
              Amis
            </Button>
          </Box>

          {/* Nom d'utilisateur aligné totalement à droite */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {username}
            </Typography>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
