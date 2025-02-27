// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
