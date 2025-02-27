import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress 
} from '@mui/material';
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
          username
        }
      }
    }
  }
`;

const Home: React.FC = () => {
  const username = localStorage.getItem('username') || 'Utilisateur';
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">Erreur : {error.message}</Typography>;

  // Tri des posts du plus récent au plus ancien selon la date de création
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

        <Typography variant="h5" gutterBottom>
          Derniers posts
        </Typography>

        {posts.map((post: any) => (
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
                {post.user?.username || 'Inconnu'} - {new Date(post.date_create).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                {post.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Home;
