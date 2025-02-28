// src/pages/Home.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
  Box,
  Alert,
  TextField,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useCreateCommentMutation,
  useCreateCommentLikeMutation,
  useDeleteCommentLikeMutation
} from '../generated/graphql';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username') || 'Utilisateur';
  const { data, loading, error, refetch } = useGetPostsQuery();

  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [deletePost] = useDeletePostMutation({
    onCompleted: (data) => {
      if (data.deletePost?.success) {
        setSnackbarMessage('Post supprimé avec succès.');
        setSnackbarOpen(true);
        refetch();
      } else {
        setSnackbarMessage(data.deletePost?.message || 'Erreur');
        setSnackbarOpen(true);
      }
      setOpenDialog(false);
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      setOpenDialog(false);
    }
  });

  const [createLike] = useCreateLikeMutation({
    onCompleted: (data) => {
      if (data.createLike?.success) refetch();
      else {
        setSnackbarMessage(data.createLike?.message || 'Erreur');
        setSnackbarOpen(true);
      }
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  });

  const [deleteLike] = useDeleteLikeMutation({
    onCompleted: (data) => {
      if (data.deleteLike?.success) refetch();
      else {
        setSnackbarMessage(data.deleteLike?.message || 'Erreur');
        setSnackbarOpen(true);
      }
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  });

  const [createComment] = useCreateCommentMutation({
    onCompleted: (data) => {
      if (data.createComment?.success) refetch();
      else {
        setSnackbarMessage(data.createComment?.message || 'Erreur');
        setSnackbarOpen(true);
      }
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  });

  const [createCommentLike] = useCreateCommentLikeMutation({
    onCompleted: (data) => {
      if (data.createLike && data.createLike.success) refetch();
      else {
        setSnackbarMessage(data.createLike?.message || 'Erreur');
        setSnackbarOpen(true);
      }
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  });

  const [deleteCommentLike] = useDeleteCommentLikeMutation({
    onCompleted: (data) => {
      if (data.deleteLike && data.deleteLike.success) refetch();
      else {
        setSnackbarMessage(data.deleteLike?.message || 'Erreur');
        setSnackbarOpen(true);
      }
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  });

  const handleDelete = (postId: string) => {
    setPostToDelete(postId);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await deletePost({ variables: { postId: postToDelete } });
    }
  };

  const handleLikeToggle = async (postId: string, liked: boolean) => {
    if (liked) await deleteLike({ variables: { postId } });
    else await createLike({ variables: { postId } });
  };

  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (text && text.trim() !== '') {
      await createComment({ variables: { text, postId } });
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    }
  };

  const handleCommentLikeToggle = async (commentId: string, liked: boolean) => {
    if (liked) await deleteCommentLike({ variables: { commentId } });
    else await createCommentLike({ variables: { commentId } });
  };

  const handleCloseSnackbar = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">Erreur : {error.message}</Typography>;

  const postsArray = data?.getPosts?.post?.slice().sort(
    (a: any, b: any) => new Date(b.date_create).getTime() - new Date(a.date_create).getTime()
  ) || [];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            Bienvenue sur Twitter, {username} !
          </Typography>
          {location.state?.successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {location.state.successMessage}
            </Alert>
          )}
        </Box>
        <Box display="flex" justifyContent="center" mb={4}>
          <Button variant="contained" color="primary" onClick={() => navigate('/create-post')} size="large">
            Créer un post
          </Button>
        </Box>
        <Grid container spacing={3}>
          {postsArray.map((post: any) => {
            const userLiked = post.likes && post.likes.some((like: any) => like.user.username === username);
            return (
              <Grid item xs={12} key={post.id}>
                <Card sx={{ borderRadius: '12px', boxShadow: 3 }}>
                  {post.image && (
                    <CardMedia
                      component="img"
                      height="250"
                      image={post.image}
                      alt="Image du post"
                    />
                  )}
                  <CardContent>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                      <Link
                        to={`/profile/${post.user.id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {post.user?.username || 'Inconnu'}
                      </Link>{' '}
                      - {new Date(post.date_create).toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {post.text}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Button variant="outlined" color="primary" onClick={() => handleLikeToggle(post.id, userLiked)}>
                        {userLiked ? 'Unlike' : 'Like'} ({post.likes ? post.likes.length : 0})
                      </Button>
                      {post.user?.username === username && (
                        <Box>
                          <Button variant="outlined" color="primary" onClick={() => navigate('/edit-post', { state: { post } })} sx={{ mr: 1 }}>
                            Modifier
                          </Button>
                          <Button variant="outlined" color="error" onClick={() => handleDelete(post.id)}>
                            Supprimer
                          </Button>
                        </Box>
                      )}
                    </Box>
                    <Box mt={3}>
                      <Typography variant="subtitle2" gutterBottom>
                        Commentaires :
                      </Typography>
                      {post.comment &&
                        post.comment.map((com: any) => {
                          const commentLiked = com.likes && com.likes.some((like: any) => like.user.username === username);
                          return (
                            <Box key={com.id} sx={{ ml: 2, mt: 1, p: 1, border: '1px solid #ccc', borderRadius: '8px' }}>
                              <Typography variant="caption">
                                {com.user?.username || 'Inconnu'} - {new Date(com.date_create).toLocaleString()}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {com.text}
                              </Typography>
                              <Box mt={1}>
                                <Button variant="outlined" size="small" onClick={() => handleCommentLikeToggle(com.id, commentLiked)}>
                                  {commentLiked ? 'Unlike' : 'Like'} ({com.likes ? com.likes.length : 0})
                                </Button>
                              </Box>
                            </Box>
                          );
                        })}
                      <Box component="form" onSubmit={(e) => handleCommentSubmit(e, post.id)} sx={{ mt: 2 }}>
                        <TextField
                          label="Ajouter un commentaire"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                        />
                        <Box mt={1} display="flex" justifyContent="flex-end">
                          <Button type="submit" variant="contained" color="primary" size="small">
                            Commenter
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Êtes-vous sûr de vouloir supprimer ce post ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default Home;
