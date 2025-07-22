import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function Login() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            console.log('Tentando login com:', { username, password });
            
            const response = await api.post('/login', { username, password });

            console.log('Resposta do servidor:', response.data);

            if (response.data.token) {
                login(response.data.token);
                navigate('/');
            } else {
                setError('Resposta do servidor não contém token');
            }
        } catch (err) {
            console.error('Erro detalhado:', err);
            setError(`Erro: ${err.response?.data?.error || 'Servidor não está respondendo'}`);
        }
    };

    return (
        <div className="login-container">
            <Collapse in={!!error}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            </Collapse>

            <div className="login-info">
                <h3>Credenciais de Teste:</h3>
                <p>Usuário: admin</p>
                <p>Senha: admin123</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Usuário</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary mt-3" type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}
