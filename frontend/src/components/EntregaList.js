import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EntregaList = () => {
    const [entregas, setEntregas] = useState([]);

    useEffect(() => {
        loadEntregas();
    }, []);

    const loadEntregas = async () => {
        try {
            const response = await api.get('/entregas');
            setEntregas(response.data);
        } catch (error) {
            console.error('Erro ao carregar entregas:', error);
        }
    };

    const handleNovaEntrega = async (dadosEntrega) => {
        try {
            await api.post('/entregas', dadosEntrega);
            loadEntregas();
        } catch (error) {
            console.error('Erro ao criar entrega:', error);
        }
    };

    // ...resto do componente
};

export default EntregaList;
