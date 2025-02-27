import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $username: String!, 
    $password: String!, 
    $email: String!, 
    $name: String!, 
    $surname: String!, 
    $bio: String
  ) {
    createUser(
      username: $username, 
      password: $password, 
      email: $email, 
      name: $name, 
      surname: $surname, 
      bio: $bio
    ) {
      code
      success
      message
      user {
        id
        username
      }
    }
  }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (data) => {
      if (data.createUser.success) {
        // Si inscription réussie, redirige vers la page de connexion
        navigate('/login');
      } else {
        setErrorMsg(data.createUser.message);
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ 
      variables: { username, password, email, name, surname, bio } 
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3}>
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
