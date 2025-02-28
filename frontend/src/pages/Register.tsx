// src/pages/Register.tsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { useCreateUserMutation } from '../generated/graphql';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [bio, setBio] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [createUser, { loading }] = useCreateUserMutation({
    onCompleted: (data) => {
      if (data.createUser?.success) {
        navigate('/login');
      } else {
        setErrorMsg(data.createUser?.message || 'Erreur inconnue');
      }
    },
    onError: (error) => setErrorMsg(error.message)
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ variables: { username, password, email, name, surname, bio } });
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
          Inscription
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
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Prénom"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Nom"
            variant="outlined"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            margin="normal"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={3}
          />
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              S'inscrire
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Vous avez déjà un compte ?{' '}
            <Link component={RouterLink} to="/login">
              Connectez-vous
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
