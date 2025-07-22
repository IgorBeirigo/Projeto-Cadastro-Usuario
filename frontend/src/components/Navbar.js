import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/clientes">Clientes</Link></li>
                <li><Link to="/entregas">Entregas</Link></li>
                <li>
                    <span>Olá, {user?.username}</span>
                    <button onClick={handleLogout}>Sair</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
