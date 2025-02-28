import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, TextField, Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  surname?: string;
  following?: { id: string; username: string }[];
}

interface UsersResponse {
  getUsers: {
    users: User[];
  };
}

interface FriendsResponse {
  getUsers: {
    users: { following: { id: string; username: string }[] }[];
  };
}

const GET_USERS = gql`
  query Query($userId: ID) {
    getUsers(userId: $userId) {
      users {
        id
        username
      }
    }
  }
`;

const GET_USER_FRIENDS = gql`
  query GetUserFriends($userId: ID) {
    getUsers(userId: $userId) {
      users {
        following {
          id
          username
        }
      }
    }
  }
`;

const CREATE_FOLLOW = gql`
  mutation CreateFollow($following: String!) {
    createFollow(following: $following) {
      code
      message
    }
  }
`;

const DELETE_FOLLOWING = gql`
  mutation DeleteFollowing($follower: String!) {
    deleteFollower(follower: $follower) {
      message
      code
    }
  }
`;

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
    useQuery<UsersResponse>(GET_USERS, {
      context: { headers: { Authorization: `Bearer ${token}` } },
    });

  const { loading: loadingFriends, error: errorFriends, data: dataFriends, refetch: refetchFriends } =
    useQuery<FriendsResponse>(GET_USER_FRIENDS, {
      variables: { userId },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });

  const [createFollow] = useMutation(CREATE_FOLLOW, {
    context: { headers: { Authorization: `Bearer ${token}` } },
    onCompleted: () => {
      refetchUsers();
      refetchFriends();
    },
    onError: (error) => console.error("Error in follow:", error),
  });

  const [deleteFollowing] = useMutation(DELETE_FOLLOWING, {
    context: { headers: { Authorization: `Bearer ${token}` } },
    onCompleted: () => {
      refetchUsers();
      refetchFriends();
    },
    onError: (error) => console.error("Error in unfollow:", error),
  });

  if (loadingUsers || loadingFriends) return <p>Loading...</p>;
  if (errorUsers || errorFriends) return <p>Error: {errorUsers?.message || errorFriends?.message}</p>;

  const users = dataUsers?.getUsers?.users ?? [];
  const friends: { id: string; username: string }[] = dataFriends?.getUsers?.users?.[0]?.following ?? [];

  const filteredUsers = users.filter(
    (u) => u.username.toLowerCase().includes(search.toLowerCase()) && u.id !== userId
  );

  const handleFollow = async (followId: string) => {
    try {
      await createFollow({ variables: { following: followId } });
    } catch (error) {
      console.error("Error while following:", error);
    }
  };

  const handleUnfollow = async (followId: string) => {
    try {
      await deleteFollowing({ variables: { follower: followId } });
    } catch (error) {
      console.error("Error while unfollowing:", error);
    }
  };

  return (
    <>
      <Navbar />
        <Box p={10}>
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
            Utilisateurs
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
            {filteredUsers.map((user) => {
            const alreadyFollowing = friends.some((f) => f.id === user.id);
            return (
                
                <Card key={user.id} sx={{ width: 250 }}>
                <CardContent>
                    <Typography>{user.username}</Typography>
                    <Button
                    variant="contained"
                    color="primary"
                    disabled={alreadyFollowing}
                    onClick={() => handleFollow(user.id)}
                    >
                    {alreadyFollowing ? "Already Followed" : "Add Friend"}
                    </Button>
                </CardContent>
                </Card>
            );
            })}
        </Box>

        <Typography variant="h5" mt={4}>
            Mes amis
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
            {friends.length > 0 ? (
            friends.map((friend) => (
                <Card key={friend.id} sx={{ width: 250 }}>
                <CardContent>
                    <Typography>{friend.username}</Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleUnfollow(friend.id)}>
                    Retirer en amis
                    </Button>
                </CardContent>
                </Card>
            ))
            ) : (
            <Typography>Il n'y a pas d'amis ici.</Typography>
            )}
        </Box>
        </Box>
        </>
    );
};

export default Friends;
