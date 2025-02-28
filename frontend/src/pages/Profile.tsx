import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, Box, Button } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGetUserProfileQuery, useGetUserFriendsQuery, useCreateFollowMutation, useDeleteFollowingMutation } from "../generated/graphql";

const Profile: React.FC = () => {
  const { userId: paramUserId } = useParams();
  const loggedInUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const userId = paramUserId || loggedInUserId;

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  const { data, loading, error, refetch } = useGetUserProfileQuery({
    variables: { userId },
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: friendsData, refetch: refetchFriends } = useGetUserFriendsQuery({
    variables: { userId: loggedInUserId },
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const [createFollow] = useCreateFollowMutation({
    context: { headers: { Authorization: `Bearer ${token}` } },
    onCompleted: () => {
      refetch();
      refetchFriends();
    },
  });

  const [deleteFollowing] = useDeleteFollowingMutation({
    context: { headers: { Authorization: `Bearer ${token}` } },
    onCompleted: () => {
      refetch();
      refetchFriends();
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">Erreur : {error.message}</Typography>;

  const users = data?.getUsers?.users ?? [];
  if (!users || users.length === 0) {
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
  if (!user) return <Typography variant="body1">Profil introuvable.</Typography>;

  const friends = friendsData?.getUsers?.users?.[0]?.following?.filter(f => f !== null) ?? [];
  const isFollowing = friends.some((friend) => friend?.id === user.id);

  const handleFollow = async () => {
    if (user?.id) {
      await createFollow({ variables: { following: user.id } });
    }
  };

  const handleUnfollow = async () => {
    if (user?.id) {
      await deleteFollowing({ variables: { follower: user.id } });
    }
  };

  const sortedPosts = user?.posts
    ? user.posts.filter((post): post is NonNullable<typeof post> => post !== null)
        .slice()
        .sort((a, b) => new Date(b?.date_create ?? 0).getTime() - new Date(a?.date_create ?? 0).getTime())
    : [];

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: '12px', backgroundColor: '#fff', mb: 4 }}>
          <Typography variant="h4" gutterBottom>Profil de {user?.username}</Typography>
          <Typography variant="body1">Nom : {user?.name} {user?.surname}</Typography>
          <Typography variant="body1">Email : {user?.email}</Typography>
          {user?.bio && <Typography variant="body1">Bio : {user?.bio}</Typography>}
          {loggedInUserId !== user.id && (
            <Box mt={2}>
              {isFollowing ? (
                <Button variant="contained" color="secondary" onClick={handleUnfollow}>
                  Unfollow
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleFollow}>
                  Add Friend
                </Button>
              )}
            </Box>
          )}
        </Box>
        <Typography variant="h5" gutterBottom>
          Mes posts
        </Typography>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <Card key={post.id} sx={{ mb: 2, borderRadius: '12px' }}>
              {post.image && (
                <CardMedia component="img" height="200" image={post.image} alt="Image du post" />
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
