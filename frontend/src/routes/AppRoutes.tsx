import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';

const InitialRedirect = () => {
  const { accessToken, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return accessToken ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InitialRedirect />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<InitialRedirect />} />
    </Routes>
  );
};
