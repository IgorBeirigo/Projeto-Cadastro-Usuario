# 📦 CRUD API - Documentação

## 🚀 Início Rápido

O servidor rodará em `http://localhost:3001`

### Health Check
```
GET /health
```

## 🎯 Endpoints Disponíveis

### Clientes
- **GET** `/api/clientes` - Listar todos os clientes
- **GET** `/api/clientes/:id` - Buscar cliente por ID
- **POST** `/api/clientes` - Criar novo cliente
- **PUT** `/api/clientes/:id` - Atualizar cliente
- **DELETE** `/api/clientes/:id` - Deletar cliente

#### Exemplo POST/PUT Clientes
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua Principal, 123"
}
```

### Produtos
- **GET** `/api/produtos` - Listar todos os produtos
- **GET** `/api/produtos/:id` - Buscar produto por ID
- **POST** `/api/produtos` - Criar novo produto
- **PUT** `/api/produtos/:id` - Atualizar produto
- **DELETE** `/api/produtos/:id` - Deletar produto

#### Exemplo POST/PUT Produtos
```json
{
  "nome": "Café Premium",
  "tipo": "Bebida",
  "validade": "2025-12-31",
  "descricao": "Café arábica importado"
}
```

### Entregas
- **GET** `/api/entregas` - Listar todas as entregas
- **POST** `/api/entregas` - Criar nova entrega
- **PUT** `/api/entregas/:id` - Atualizar entrega
- **DELETE** `/api/entregas/:id` - Deletar entrega

#### Exemplo POST/PUT Entregas
```json
{
  "protocolo": "ENT-2024-001",
  "status": "Em Trânsito",
  "clienteId": 1,
  "produtoId": 1
}
```

## 🛠️ Instalação

```bash
# Backend
cd backend
npm install
node server.js

# Frontend
cd frontend
npm install
npm start
```

## 🔧 Configuração

Copie `.env.example` para `.env` e configure suas credenciais do banco:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sistema_entregas
```

## 📋 Campos Obrigatórios

### Cliente
- nome ✅
- email ✅
- telefone ✅
- endereco ✅

### Produto
- nome ✅
- tipo ✅
- validade ✅
- descricao (opcional)

### Entrega
- protocolo ✅
- status ✅
- clienteId ✅
- produtoId ✅

## ✨ Melhorias Implementadas

✅ Removida autenticação por JWT
✅ CRUD padrão sem middleware de autenticação
✅ Melhor tratamento de erros com mensagens descritivas
✅ Validação de campos obrigatórios
✅ Logging aprimorado
✅ Padronização de respostas HTTP
✅ Health check endpoint
✅ Sincronização automática de modelos

## 🐛 Troubleshooting

**Erro: "Conexão recusada"**
- Verifique se o MySQL está rodando
- Confirme as credenciais em `.env`

**Erro: "Modelo não sincronizado"**
- Verifique se o banco existe
- Execute: `ALTER TABLE clientes ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`

**CORS Error**
- Confirme que FRONTEND_URL está correto em `.env`
