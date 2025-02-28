import React, { useState, useEffect } from "react";
import { CircularProgress, Button, TextField, Box, Typography, Card, CardContent, MenuItem, Select, FormControl, InputLabel, Grid } from "@mui/material";
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
  const [filter, setFilter] = useState<string>("all"); 

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

  const users = (dataUsers?.getUsers?.users ?? []).filter(user => user !== null);
  const friends = (dataFriends?.getUsers?.users?.[0]?.following ?? []).filter(friend => friend !== null);

  const filteredUsers = users.filter((u) => {
    if (!u || !u.username.toLowerCase().includes(search.toLowerCase()) || u.id === userId) return false;
    const isFollowing = friends.some((f) => f?.id === u.id);

    if (filter === "followed") return isFollowing;
    if (filter === "notFollowed") return !isFollowing;
    return true;
  });

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
      <Box p={5} maxWidth="1100px" margin="auto">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Liste des utilisateurs
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            label="Rechercher un utilisateur..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "48%" }}
          />

          <FormControl sx={{ width: "48%" }}>
            <InputLabel>Filtrer</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="all">Tous</MenuItem>
              <MenuItem value="followed">Suivis</MenuItem>
              <MenuItem value="notFollowed">Non suivis</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Liste des utilisateurs en grille 4 colonnes */}
        <Grid container spacing={3} justifyContent="center">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              if (!user) return null;
              const isFollowing = friends.some((f) => f?.id === user.id);

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: 3,
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                    }}
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" align="center">
                        {user.username}
                      </Typography>
                      <Button
                        variant={isFollowing ? "outlined" : "contained"}
                        color={isFollowing ? "secondary" : "primary"}
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleFollowToggle(user.id, isFollowing);
                        }}
                        sx={{ mt: 1 }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Typography variant="body1" align="center" mt={2} width="100%">
              Aucun utilisateur trouvé.
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Friends;