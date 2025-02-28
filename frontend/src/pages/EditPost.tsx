// src/pages/EditPost.tsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useUpdatePostMutation } from '../generated/graphql';
import { useNavigate, useLocation } from 'react-router-dom';

const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;
  
  if (!post) {
    navigate('/home');
    return null;
  }
  
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState(post.image || '');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [updatePost, { loading }] = useUpdatePostMutation({
    onCompleted: (data) => {
      if (data.updatePost?.success) {
        navigate('/home', { state: { successMessage: data.updatePost.message } });
      } else {
        setErrorMsg(data.updatePost?.message || 'Erreur inconnue');
      }
    },
    onError: (error) => setErrorMsg(error.message)
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost({ variables: { postId: post.id, text, image } });
  };
  
  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} sx={{ boxShadow: 3, borderRadius: '12px', backgroundColor: '#fff' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Modifier le post
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
              Enregistrer les modifications
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditPost;
