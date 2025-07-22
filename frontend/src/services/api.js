import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Log de requisições
api.interceptors.request.use(config => {
    console.log('DEBUG - Requisição:', {
        url: `${config.baseURL}${config.url}`,
        method: config.method?.toUpperCase(),
        data: config.data
    });
    return config;
}, error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
});

// Log de respostas
api.interceptors.response.use(
    response => {
        console.log('Resposta recebida:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('Erro na resposta:', {
            status: error.response?.status,
            message: error.response?.data?.error || error.message,
            data: error.response?.data
        });
        throw error;
    }
);

export default api;
