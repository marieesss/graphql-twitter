import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, TextField, Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GET_USERS = gql`
  query GetUsers($userId: ID) {
    getUsers(userId: $userId) {
      users {
        username
        id
        following {
          username
          id
        }
        followers {
          username
          id
        }
      }
    }
  }
`;

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
  following: { id: string; username: string }[];
  followers: { id: string; username: string }[];
}

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

  const { loading, error, data, refetch } = useQuery<{ getUsers: { users: User[] } }>(GET_USERS, {
    variables: { userId },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [createFollow] = useMutation(CREATE_FOLLOW, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error in follow:", error),
  });
  
  const [deleteFollowing] = useMutation(DELETE_FOLLOWING, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error in unfollow:", error),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.getUsers?.users || [];
  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));
  const friends = users.filter((user) => user.following.some((f) => f.id === userId));

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Friends</Typography>
      <TextField
        label="Search users..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
      />
      
      <Typography variant="h5" mt={2}>All Users</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {filteredUsers.map((user) => {
          const alreadyFollowing = user.following.some((f) => f.id === userId);
          return (
            <Card key={user.id} sx={{ width: 250 }}>
              <CardContent>
                <Typography>{user.username}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={alreadyFollowing}
                  onClick={() => {
                    if (!alreadyFollowing) {
                      createFollow({ variables: { following: user.id } });
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

      <Typography variant="h5" mt={4}>Your Friends</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {friends.map((friend) => (
          <Card key={friend.id} sx={{ width: 250 }}>
            <CardContent>
              <Typography>{friend.username}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteFollowing({ variables: { following: friend.id } })}
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