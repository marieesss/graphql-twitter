import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Utilisateur';

  const handleLogout = () => {
    // Supprimer les informations d'authentification
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1DA1F2', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Espace vide pour centrer le contenu */}
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

          {/* Nom d'utilisateur et bouton de déconnexion alignés à droite */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
              {username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Déconnexion
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
