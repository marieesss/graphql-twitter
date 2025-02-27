import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
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
  TextField
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      code
      success
      message
      post {
        id
        text
        image
        date_create
        user {
          id
          username
        }
        likes {
          id
          userId
          user {
            username
          }
        }
        comment {
          id
          text
          date_create
          user {
            username
          }
          likes {
            id
            userId
            user {
              username
            }
          }
        }
      }
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      code
      success
      message
    }
  }
`;

const CREATE_LIKE_MUTATION = gql`
  mutation CreateLike($postId: ID!) {
    createLike(postId: $postId) {
      code
      success
      message
      like {
        id
        userId
        postId
        date_create
        user {
          username
        }
      }
    }
  }
`;

const DELETE_LIKE_MUTATION = gql`
  mutation DeleteLike($postId: ID!) {
    deleteLike(postId: $postId) {
      code
      success
      message
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($text: String!, $postId: ID!) {
    createComment(text: $text, postId: $postId) {
      code
      success
      message
      comments {
        id
        text
        date_create
        user {
          username
        }
        likes {
          id
          userId
          user {
            username
          }
        }
      }
    }
  }
`;

const CREATE_COMMENT_LIKE_MUTATION = gql`
  mutation CreateCommentLike($commentId: ID!) {
    createLike(commentId: $commentId) {
      code
      success
      message
      like {
        id
        userId
        commentId
        date_create
        user {
          username
        }
      }
    }
  }
`;

const DELETE_COMMENT_LIKE_MUTATION = gql`
  mutation DeleteCommentLike($commentId: ID!) {
    deleteLike(commentId: $commentId) {
      code
      success
      message
    }
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const username = localStorage.getItem('username') || 'Utilisateur';
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: (data) => {
      if (data.deletePost.success) {
        refetch();
      } else {
        alert(data.deletePost.message);
      }
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const [createLike] = useMutation(CREATE_LIKE_MUTATION, {
    onCompleted: (data) => {
      if (data.createLike.success) {
        refetch();
      } else {
        alert(data.createLike.message);
      }
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const [deleteLike] = useMutation(DELETE_LIKE_MUTATION, {
    onCompleted: (data) => {
      if (data.deleteLike.success) {
        refetch();
      } else {
        alert(data.deleteLike.message);
      }
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    onCompleted: (data) => {
      if (data.createComment.success) {
        refetch();
      } else {
        alert(data.createComment.message);
      }
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const [createCommentLike] = useMutation(CREATE_COMMENT_LIKE_MUTATION, {
    onCompleted: (data) => {
      if (data.createLike.success) {
        refetch();
      } else {
        alert(data.createLike.message);
      }
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const [deleteCommentLike] = useMutation(DELETE_COMMENT_LIKE_MUTATION, {
    onCompleted: (data) => {
      if (data.deleteLike.success) {
        refetch();
      } else {
        alert(data.deleteLike.message);
      }
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const handleDelete = async (postId: string) => {
    await deletePost({ variables: { postId } });
  };

  const handleLikeToggle = async (postId: string, liked: boolean) => {
    if (liked) {
      await deleteLike({ variables: { postId } });
    } else {
      await createLike({ variables: { postId } });
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (text && text.trim() !== '') {
      await createComment({ variables: { text, postId } });
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const handleCommentLikeToggle = async (commentId: string, liked: boolean) => {
    if (liked) {
      await deleteCommentLike({ variables: { commentId } });
    } else {
      await createCommentLike({ variables: { commentId } });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">Erreur : {error.message}</Typography>;

  // Trie des posts du plus récent au plus ancien
  const posts = data.getPosts.post.slice().sort(
    (a: any, b: any) => new Date(b.date_create).getTime() - new Date(a.date_create).getTime()
  );

  return (
    <>
      <Navbar />
      <Container
        maxWidth={false}
        sx={{ marginTop: '80px', padding: '40px 10%', lineHeight: 1.7 }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenue sur Twitter, {username} !
        </Typography>

        {successMessage && (
          <Box mb={2}>
            <Alert severity="success">{successMessage}</Alert>
          </Box>
        )}

        <Box mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/create-post')}
          >
            Créer un post
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom>
          Derniers posts
        </Typography>

        {posts.map((post: any) => {
          const userLiked = post.likes && post.likes.some((like: any) => like.user.username === username);
          return (
            <Card key={post.id} sx={{ marginBottom: '20px' }}>
              {post.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt="Image du post"
                />
              )}
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  <Link
                    to={`/profile/${post.user.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {post.user?.username || 'Inconnu'}
                  </Link> - {new Date(post.date_create).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  {post.text}
                </Typography>

                {/* Boutons Like/Unlike et gestion du post */}
                <Box display="flex" alignItems="center" mt={1} gap={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleLikeToggle(post.id, userLiked)}
                  >
                    {userLiked ? 'Unlike' : 'Like'} ({post.likes ? post.likes.length : 0})
                  </Button>
                  {post.user?.username === username && (
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/edit-post', { state: { post } })}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(post.id)}
                      >
                        Supprimer
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Section Commentaires */}
                <Box mt={2}>
                  <Typography variant="subtitle2">Commentaires :</Typography>
                  {post.comment &&
                    post.comment.map((com: any) => {
                      const commentLiked =
                        com.likes && com.likes.some((like: any) => like.user.username === username);
                      return (
                        <Box key={com.id} ml={2} mt={1} p={1} border="1px solid #ccc" borderRadius="4px">
                          <Typography variant="caption">
                            {com.user?.username || 'Inconnu'} - {new Date(com.date_create).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">{com.text}</Typography>
                          <Box display="flex" alignItems="center" mt={1} gap={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleCommentLikeToggle(com.id, commentLiked)}
                            >
                              {commentLiked ? 'Unlike' : 'Like'} ({com.likes ? com.likes.length : 0})
                            </Button>
                          </Box>
                        </Box>
                      );
                    })}
                  {/* Formulaire pour ajouter un commentaire */}
                  <Box component="form" onSubmit={(e) => handleCommentSubmit(e, post.id)} mt={1}>
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
                    <Box mt={1} textAlign="right">
                      <Button type="submit" variant="contained" color="primary" size="small">
                        Commenter
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default Home;
