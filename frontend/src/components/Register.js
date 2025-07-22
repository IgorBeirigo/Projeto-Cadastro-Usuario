import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', { username, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao registrar');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registro</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
        </div>
    );
};

export default Register;
