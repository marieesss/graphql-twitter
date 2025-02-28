// src/pages/Login.tsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { useSignInMutation } from '../generated/graphql';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [signIn, { loading }] = useSignInMutation({
    onCompleted: (data) => {
      if (data.signIn?.success) {
        localStorage.setItem('token', data.signIn.token || '');
        localStorage.setItem('userId', data.signIn.id || '');
        localStorage.setItem('username', username);
        navigate('/home');
      } else {
        setErrorMsg(data.signIn?.message || 'Erreur inconnue');
      }
    },
    onError: (error) => setErrorMsg(error.message)
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn({ variables: { username, password } });
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={8}
        p={4}
        sx={{
          boxShadow: 3,
          borderRadius: '12px',
          backgroundColor: '#fff'
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom d'utilisateur"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              Se connecter
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Vous n'avez pas de compte ?{' '}
            <Link component={RouterLink} to="/register">
              Inscrivez-vous
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
