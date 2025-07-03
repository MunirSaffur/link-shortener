import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from 'antd';

export const GuestContinueButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleContinueAsGuest = () => {
        logout();
        navigate('/home');
    };

    return (
        <Button onClick={() => handleContinueAsGuest()} style={{marginTop: 20}} color="default" block variant="link">
            Continue as Guest
        </Button>
    );
};
