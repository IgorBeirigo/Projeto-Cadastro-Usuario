# 🎨 Frontend - Integração com Backend Refatorado

## 🔄 Mudanças na Integração

### Antes (Com Autenticação)
```javascript
// Precisava de token
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### Depois (Sem Autenticação)
```javascript
// Headers simples
const headers = {
  'Content-Type': 'application/json'
};
```

## 📡 Exemplo de Chamadas API

### Criar Cliente
```javascript
const criar = async (cliente) => {
  const response = await fetch('http://localhost:3001/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      endereco: cliente.endereco
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return response.json();
};
```

### Listar Clientes
```javascript
const listar = async () => {
  const response = await fetch('http://localhost:3001/api/clientes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return response.json();
};
```

### Atualizar Cliente
```javascript
const atualizar = async (id, cliente) => {
  const response = await fetch(`http://localhost:3001/api/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return response.json();
};
```

### Deletar Cliente
```javascript
const deletar = async (id) => {
  const response = await fetch(`http://localhost:3001/api/clientes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.status === 204) {
    const error = await response.json();
    throw new Error(error.error);
  }
};
```

## 🔧 Refatorar `services/api.js`

### Versão Anterior (Com Autenticação)
```javascript
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Versão Nova (Sem Autenticação)
```javascript
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Sem necessidade de interceptor de autenticação
// Mas você pode adicionar tratamento de erro global:

api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na API:', error.response?.data?.error);
    return Promise.reject(error);
  }
);

export default api;
```

## 📝 Remover de `services/auth.js`

Se tinha algo como:

```javascript
// ❌ REMOVER
const login = async (email, password) => {
  // Lógica de login com token
};

const logout = () => {
  localStorage.removeItem('token');
};
```

## 🔐 Remover de `contexts/AuthContext.js`

Se tinha lógica de autenticação, simplificar para:

```javascript
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Removed token/authentication logic
  // Keeping if needed for future user context

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
```

## 🛣️ Simplificar Routes

### Remover PrivateRoute
Se tem `components/PrivateRoute.js`, pode remover se não mais necessário:

```javascript
// ❌ Não mais necessário para autenticação
// Manter apenas se precisar controlar acesso por outro motivo
```

### Remover Login/Register
Se `components/auth/Login.jsx` e `Register.js` existem apenas para autenticação:

```javascript
// ❌ Opcional remover
// Se manter, apenas como exemplo
```

## 🎯 Exemplo Completo - CRUD Refatorado

```javascript
// services/clienteService.js
import api from './api';

export const clienteService = {
  listar: () => api.get('/clientes'),
  
  buscar: (id) => api.get(`/clientes/${id}`),
  
  criar: (data) => api.post('/clientes', data),
  
  atualizar: (id, data) => api.put(`/clientes/${id}`, data),
  
  deletar: (id) => api.delete(`/clientes/${id}`)
};

export default clienteService;
```

### Usar no Componente
```javascript
import clienteService from './services/clienteService';

function ClienteList() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    clienteService.listar()
      .then(res => setClientes(res.data))
      .catch(err => console.error(err.response.data.error));
  }, []);

  const handleDelete = (id) => {
    clienteService.deletar(id)
      .then(() => {
        setClientes(clientes.filter(c => c.id !== id));
      })
      .catch(err => alert(err.response.data.error));
  };

  return (
    <div>
      {clientes.map(c => (
        <div key={c.id}>
          <p>{c.nome} - {c.email}</p>
          <button onClick={() => handleDelete(c.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}
```

## ✅ Checklist de Atualização Frontend

- [ ] Remover token do localStorage se não mais usado
- [ ] Remover headers Authorization
- [ ] Simplificar AuthContext
- [ ] Remover PrivateRoute (opcional)
- [ ] Testar CRUD sem autenticação
- [ ] Verificar CORS errors
- [ ] Atualizar URL base se necessário
- [ ] Remover componentes de login (se não mais necessário)

## 🐛 Problemas Comuns

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solução**: Verificar `FRONTEND_URL` em `.env` do backend

```env
FRONTEND_URL=http://localhost:3000  # Sua porta frontend
```

### 404 em Endpoints
```
GET http://localhost:3001/api/clientes 404
```

**Solução**: Verificar:
1. Backend está rodando
2. URL base está correta
3. Modelo está sincronizado com banco

### Erro de Validação
```json
{
  "error": "Todos os campos são obrigatórios"
}
```

**Solução**: Enviar todos os campos obrigatórios

```javascript
// ✅ Correto
{
  "nome": "João",
  "email": "joao@example.com",
  "telefone": "11999999999",
  "endereco": "Rua Principal, 123"
}
```

## 📊 Endpoints Disponíveis

```
✅ GET    /api/clientes
✅ GET    /api/clientes/:id
✅ POST   /api/clientes
✅ PUT    /api/clientes/:id
✅ DELETE /api/clientes/:id

✅ GET    /api/produtos
✅ GET    /api/produtos/:id
✅ POST   /api/produtos
✅ PUT    /api/produtos/:id
✅ DELETE /api/produtos/:id

✅ GET    /api/entregas
✅ POST   /api/entregas
✅ PUT    /api/entregas/:id
✅ DELETE /api/entregas/:id

✅ GET    /health
```

## 🚀 Teste Rápido

```bash
# 1. Start backend
cd backend
npm start

# 2. Start frontend (novo terminal)
cd frontend
npm start

# 3. Abrir http://localhost:3000
# 4. Testar criação/listagem de clientes
```

## 📚 Referências

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Axios](https://axios-http.com)
- [React Hooks](https://react.dev)
- [REST API Best Practices](https://restfulapi.net)

---

**Compatível com**: Backend v1.0.0 refatorado
**Atualizado**: Dezembro 2024
