// src/pages/Profile.tsx
import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, Box } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGetUserProfileQuery } from '../generated/graphql';

const Profile: React.FC = () => {
  const { userId: paramUserId } = useParams();
  const userId = paramUserId || localStorage.getItem('userId');

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  const { data, loading, error } = useGetUserProfileQuery({
    variables: { userId }
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">Erreur : {error.message}</Typography>;

  const users = data?.getUsers?.users ?? [];
  if (users.length === 0) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Typography variant="body1">Aucun profil trouvé.</Typography>
        </Container>
      </>
    );
  }

  const user = users[0];
  const sortedPosts = user?.posts
    ? user.posts.slice().sort(
        (a: any, b: any) => new Date(b.date_create).getTime() - new Date(a.date_create).getTime()
      )
    : [];

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box
          sx={{
            p: 3,
            boxShadow: 3,
            borderRadius: '12px',
            backgroundColor: '#fff',
            mb: 4
          }}
        >
          <Typography variant="h4" gutterBottom>
            Profil de {user?.username}
          </Typography>
          <Typography variant="body1">
            Nom : {user?.name} {user?.surname}
          </Typography>
          <Typography variant="body1">Email : {user?.email}</Typography>
          {user?.bio && <Typography variant="body1">Bio : {user?.bio}</Typography>}
        </Box>
        <Typography variant="h5" gutterBottom>
          Mes posts
        </Typography>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post: any) => (
            <Card key={post.id} sx={{ mb: 2, borderRadius: '12px' }}>
              {post.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt="Image du post"
                />
              )}
              <CardContent>
                <Typography variant="body1">{post.text}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(post.date_create).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">Aucun post à afficher.</Typography>
        )}
      </Container>
    </>
  );
};

export default Profile;
