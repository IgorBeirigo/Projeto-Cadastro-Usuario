import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('@App:user');
        const storedToken = localStorage.getItem('@App:token');
        
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            console.log('Attempting login with:', { username, password });
            const { data } = await api.post('/login', {
                username,
                password
            });
            console.log('Login response:', data);
            
            if (data.token) {
                localStorage.setItem('@App:token', data.token);
                localStorage.setItem('@App:user', JSON.stringify(data.user));
                setUser(data.user);
            }
            return data;
        } catch (error) {
            console.error('Login error details:', {
                status: error.response?.status,
                data: error.response?.data,
                config: error.config
            });
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
