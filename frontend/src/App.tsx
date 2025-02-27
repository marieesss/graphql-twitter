// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Friends from './pages/Friends';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes protégées */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-post"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-post"
        element={
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        }
      />
      {/* Profil du user connecté */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      {/* Profil d'un autre utilisateur via son id */}
      <Route
        path="/profile/:userId"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <PrivateRoute>
            <Friends />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
