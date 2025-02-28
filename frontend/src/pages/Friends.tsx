import React, { useState, useEffect } from "react";
import { CircularProgress, Button, TextField, Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  useQueryQuery,
  useGetUserFriendsQuery,
  useCreateFollowMutation,
  useDeleteFollowingMutation,
} from "../generated/graphql";

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { loading: loadingUsers, error: errorUsers, data: dataUsers, refetch: refetchUsers } =
    useQueryQuery({
      context: { headers: { Authorization: `Bearer ${token}` } },
    });

  const { loading: loadingFriends, error: errorFriends, data: dataFriends, refetch: refetchFriends } =
    useGetUserFriendsQuery({
      variables: { userId },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });

  const [createFollow] = useCreateFollowMutation({
    context: { headers: { Authorization: `Bearer ${token}` } },
    onCompleted: () => {
      refetchUsers();
      refetchFriends();
    },
  });

  const [deleteFollowing] = useDeleteFollowingMutation({
    context: { headers: { Authorization: `Bearer ${token}` } },
    onCompleted: () => {
      refetchUsers();
      refetchFriends();
    },
  });

  if (loadingUsers || loadingFriends) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorUsers || errorFriends) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Erreur : {errorUsers?.message || errorFriends?.message}</Typography>
      </Box>
    );
  }

  // Gestion des utilisateurs en supprimant les valeurs nulles
  const users = (dataUsers?.getUsers?.users ?? []).filter(user => user !== null);
  const friends = (dataFriends?.getUsers?.users?.[0]?.following ?? []).filter(friend => friend !== null);

  // Filtrer les utilisateurs pour la recherche et éviter les `null`
  const filteredUsers = users.filter(
    (u) => u && u.username.toLowerCase().includes(search.toLowerCase()) && u.id !== userId
  );

  const handleFollowToggle = async (followId: string, isFollowing: boolean) => {
    if (isFollowing) {
      await deleteFollowing({ variables: { follower: followId } });
    } else {
      await createFollow({ variables: { following: followId } });
    }
  };

  return (
    <>
      <Navbar />
      <Box p={10}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Liste des utilisateurs
        </Typography>

        <TextField
          label="Rechercher un utilisateur..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />

        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={2}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              if (!user) return null;
              const isFollowing = friends.some((f) => f?.id === user.id);

              return (
                <Card
                  key={user.id}
                  sx={{
                    width: 280,
                    borderRadius: "12px",
                    boxShadow: 3,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{user.username}</Typography>
                    <Button
                      variant={isFollowing ? "outlined" : "contained"}
                      color={isFollowing ? "secondary" : "primary"}
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche la navigation lors du clic sur le bouton
                        handleFollowToggle(user.id, isFollowing);
                      }}
                      sx={{ mt: 1 }}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography variant="body1">Aucun utilisateur trouvé.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Friends;