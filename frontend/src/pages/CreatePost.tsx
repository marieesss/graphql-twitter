// src/pages/CreatePost.tsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useCreatePostMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [createPost, { loading }] = useCreatePostMutation({
    onCompleted: (data) => {
      if (data.createPost?.success) {
        navigate('/home', { state: { successMessage: data.createPost.message } });
      } else {
        setErrorMsg(data.createPost?.message || 'Erreur inconnue');
      }
    },
    onError: (error) => setErrorMsg(error.message)
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ variables: { text, image } });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} sx={{ boxShadow: 3, borderRadius: '12px', backgroundColor: '#fff' }}>
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
