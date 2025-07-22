import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);

    const fetchClientes = async () => {
        const response = await api.fetch('/clientes');
        const data = await response.json();
        setClientes(data);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>{cliente.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteList;