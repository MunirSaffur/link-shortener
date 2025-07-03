import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div>
      <nav style={{ padding: 10, backgroundColor: '#eee', display: 'flex', justifyContent: 'space-between' }}>
        <h3>MyApp Navbar</h3>
        {
          user ?
            <button onClick={handleLogout}>Logout</button>: 
            <button onClick={handleLogin}>Login</button>
        }

      </nav>
      <main>
        {/* Outlet renders the child route element */}
        <Outlet />
      </main>
    </div>
  );
};
