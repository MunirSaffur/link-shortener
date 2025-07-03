import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Welcome to MyApp</h2>
      {/* Outlet renders the child route element */}
      <Outlet />
    </div>
  );
};
