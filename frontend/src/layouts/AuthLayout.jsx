import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export default function AuthLayout() {
    return (
        <div className="auth-container">
            <div className="auth-content">
                <Outlet />
            </div>
        </div>
    );
}
