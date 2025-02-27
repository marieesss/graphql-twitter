// src/pages/CreatePost.tsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($text: String!, $image: String) {
    createPost(text: $text, image: $image) {
      code
      success
      message
      post {
        id
        text
        image
        date_create
        user {
          username
        }
      }
    }
  }
`;

const CreatePost: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: (data) => {
      if (data.createPost.success) {
        // Redirection vers Home en passant un message de réussite dans le state
        navigate('/home', { state: { successMessage: data.createPost.message } });
      } else {
        setErrorMsg(data.createPost.message);
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ variables: { text, image } });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Créer un post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Texte du post"
            variant="outlined"
            fullWidth
            margin="normal"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <TextField
            label="URL de l'image (optionnel)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              Publier
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePost;
