import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, TextField, Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Requête GraphQL pour récupérer tous les utilisateurs
const GET_USERS = gql`
  query Users {
    getUsers {
      users {
        email
        id
        name
        surname
        username
        following {
          id
          username
        }
      }
    }
  }
`;

// Requête GraphQL pour récupérer les utilisateurs suivis (amis) de l'utilisateur courant
const GET_USER_FRIENDS = gql`
  query GetUsers($userId: ID) {
    getUsers(userId: $userId) {
      users {
        name
        following {
          id
          username
          name
          surname
        }
      }
    }
  }
`;

// Mutation pour suivre un utilisateur
const CREATE_FOLLOW = gql`
  mutation CreateFollow($following: String!) {
    createFollow(following: $following) {
      code
      follow {
        follower
        following
      }
      message
      success
    }
  }
`;

// Mutation pour unfollow un utilisateur
const DELETE_FOLLOWING = gql`
  mutation DeleteFollowing($following: ID!) {
    deleteFollowing(following: $following) {
      code
      message
      success
    }
  }
`;

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  following: { id: string; username: string }[]; // Liste des utilisateurs suivis
}

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");  // <-- on récupère l'id stocké
  const [search, setSearch] = useState<string>("");

  // Si pas de token → redirection
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Récupération de tous les utilisateurs
  const { loading: loadingUsers, error: errorUsers, data: dataUsers } = useQuery<{ getUsers: { users: User[] } }>(GET_USERS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Récupération des utilisateurs suivis (amis)
  const { loading: loadingFriends, error: errorFriends, data: dataFriends } = useQuery<{ getUsers: { users: User[] } }>(GET_USER_FRIENDS, {
    variables: { userId },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Mutation follow
  const [createFollow] = useMutation(CREATE_FOLLOW, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onError: (error) => console.error("Error in follow:", error),
  });

  // Mutation unfollow
  const [deleteFollowing] = useMutation(DELETE_FOLLOWING, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      // Optionnel : Mettre à jour les données après l'action de suppression si nécessaire
    },
    onError: (error) => console.error("Error in unfollow:", error),
  });

  // Gestion loading / error
  if (loadingUsers || loadingFriends) return <p>Loading...</p>;
  if (errorUsers || errorFriends) return <p>Error: {errorUsers?.message || errorFriends?.message}</p>;

  // Récupérer tous les utilisateurs et leurs informations
  const users = dataUsers?.getUsers?.users || [];

  // Filtrer les utilisateurs pour la recherche
  const filteredUsers = users.filter(
    (u) => u.username.toLowerCase().includes(search.toLowerCase()) && u.id !== userId // Exclure l'utilisateur actuel
  );

  // Récupérer les amis de l'utilisateur courant
  const friends = dataFriends?.getUsers?.users[0]?.following || [];

  // Fonction pour suivre un utilisateur
  const handleFollow = (userId: string) => {
    createFollow({ variables: { following: userId } });
  };

  // Fonction pour supprimer un suivi
  const handleUnfollow = (userId: string) => {
    deleteFollowing({ variables: { following: userId } });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Friends
      </Typography>
      <TextField
        label="Search users..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
      />

      <Typography variant="h5" mt={2}>
        All Users
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {filteredUsers.map((user) => {
          const alreadyFollowing = friends.some((f) => f.id === user.id); // Vérifier si l'utilisateur est déjà suivi
          return (
            <Card key={user.id} sx={{ width: 250 }}>
              <CardContent>
                <Typography>{user.username}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={alreadyFollowing} // Griser le bouton si déjà suivi
                  onClick={() => {
                    if (!alreadyFollowing) {
                      handleFollow(user.id); // Suivre l'utilisateur
                    }
                  }}
                >
                  {alreadyFollowing ? "Already Followed" : "Add Friend"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Typography variant="h5" mt={4}>
        Your Friends
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {friends.map((friend) => (
          <Card key={friend.id} sx={{ width: 250 }}>
            <CardContent>
              <Typography>{friend.username}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleUnfollow(friend.id)} // Supprimer un ami
              >
                Remove Friend
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Friends;