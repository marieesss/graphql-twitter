// src/pages/EditPost.tsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($postId: ID!, $text: String!, $image: String) {
    updatePost(postId: $postId, text: $text, image: $image) {
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

const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;
  
  // Si aucune donnée de post n'est transmise, rediriger vers Home
  if (!post) {
    navigate('/home');
    return null;
  }
  
  const [text, setText] = useState<string>(post.text);
  const [image, setImage] = useState<string>(post.image || '');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [updatePost, { loading }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: (data) => {
      if (data.updatePost.success) {
        // Redirection vers Home avec message de succès
        navigate('/home', { state: { successMessage: data.updatePost.message } });
      } else {
        setErrorMsg(data.updatePost.message);
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost({ variables: { postId: post.id, text, image } });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3}>
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
