import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const username = localStorage.getItem('username') || 'Utilisateur';

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
          L'endroit où le monde se connecte et partage en temps réel.
        </Typography>

        <Typography variant="body1" paragraph>
          Twitter est une plateforme sociale conçue pour permettre aux utilisateurs de partager des idées, des actualités et 
          des discussions en temps réel. Que vous soyez ici pour suivre l'actualité, interagir avec des experts ou simplement 
          partager vos pensées, Twitter vous permet de rester informé et connecté avec le monde entier.
        </Typography>

        <Typography variant="body1" paragraph>
          Grâce à un système de publications rapides et concises, Twitter est devenu un acteur majeur dans la communication 
          digitale, utilisé par des millions de personnes, des entreprises et des organisations dans le monde entier.
        </Typography>

        <Typography variant="h5" gutterBottom>
          🌍 Rejoignez la conversation.
        </Typography>

        <Typography variant="body1" paragraph>
          Suivez vos centres d'intérêt, échangez avec d'autres utilisateurs et faites entendre votre voix sur les sujets qui 
          vous passionnent. Twitter est un espace de dialogue où chaque publication peut avoir un impact.
        </Typography>

        <Typography variant="h5" gutterBottom>
          ⚡ Fonctionnalités clés :
        </Typography>

        <Typography variant="body1" paragraph>
          - Publiez et interagissez avec des tweets en temps réel.  
          - Suivez les dernières tendances et découvrez du contenu pertinent.  
          - Personnalisez votre fil d’actualité selon vos préférences.  
          - Connectez-vous avec des millions d'utilisateurs à travers le monde.
        </Typography>

        <Typography variant="h5" gutterBottom>
          🚀 Lancez-vous !
        </Typography>

        <Typography variant="body1">
          Inscrivez-vous, explorez et commencez à partager vos pensées avec la communauté Twitter.
        </Typography>
      </Container>
    </>
  );
};

export default Home;
