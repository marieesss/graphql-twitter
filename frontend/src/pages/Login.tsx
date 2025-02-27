import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const SIGNIN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      code
      success
      message
      token
      id
    }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [signIn, { loading }] = useMutation(SIGNIN_MUTATION, {
    onCompleted: (data) => {
      if (data.signIn.success) {
        // Stocke le token, l'userId et le username
        localStorage.setItem('token', data.signIn.token);
        localStorage.setItem('userId', data.signIn.id);       // <-- on stocke l'id
        localStorage.setItem('username', username);
        
        // Redirige vers /home
        navigate('/home');
      } else {
        setErrorMsg(data.signIn.message);
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn({ variables: { username, password } });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3}>
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