# 🚀 Backend - Sistema de CRUD

Backend Node.js com Express para gerenciamento de Clientes, Produtos e Entregas usando Sequelize ORM.

## ✨ Características

- ✅ **CRUD Completo** - Operações CREATE, READ, UPDATE, DELETE
- ✅ **Sem Autenticação** - Acesso livre para desenvolvimento
- ✅ **Banco MySQL** - Persistência com Sequelize
- ✅ **CORS Habilitado** - Integração com frontend
- ✅ **Validação de Dados** - Campos obrigatórios e tipos
- ✅ **Tratamento de Erros** - Respostas padronizadas
- ✅ **Health Check** - Endpoint de verificação

## 📋 Pré-requisitos

- Node.js 14+
- MySQL 5.7+
- npm ou yarn

## 🔧 Instalação

```bash
# 1. Clonar repositório
git clone <repo-url>
cd backend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais MySQL
```

## ⚙️ Configuração

Edite `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sistema_entregas
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## ▶️ Executar

```bash
# Modo produção
npm start

# Modo desenvolvimento (com nodemon)
npm run dev

# Testes da API
node test-api.js
```

O servidor estará disponível em `http://localhost:3001`

## 📚 Documentação

Veja [API_DOCS.md](./API_DOCS.md) para documentação completa de endpoints.

### Endpoints Principais

```
GET    /health
GET    /api/clientes
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id

GET    /api/produtos
POST   /api/produtos
PUT    /api/produtos/:id
DELETE /api/produtos/:id

GET    /api/entregas
POST   /api/entregas
PUT    /api/entregas/:id
DELETE /api/entregas/:id
```

## 🗂️ Estrutura de Pastas

```
backend/
├── config/              # Configurações
│   ├── config.js
│   └── database.js
├── controllers/         # Lógica de negócio
│   └── entregaController.js
├── models/             # Modelos Sequelize
│   ├── Cliente.js
│   ├── Produto.js
│   ├── Entrega.js
│   └── index.js
├── routes/             # Rotas Express
│   ├── clienteRoutes.js
│   ├── produtoRoutes.js
│   └── entregaRoutes.js
├── middleware/         # Middlewares
│   └── auth.js (deprecated)
├── database/           # Conexão com DB
│   └── db.js
├── server.js           # Entry point
├── test-api.js         # Script de testes
├── package.json
└── .env.example        # Exemplo de configuração
```

## 🐛 Solução de Problemas

### Erro: "Conexão recusada"
```bash
# Verifique se MySQL está rodando
# Linux/Mac
sudo service mysql start

# Windows
net start MySQL80
```

### Erro: "Database doesn't exist"
```sql
CREATE DATABASE sistema_entregas;
```

### Erro: "Access denied for user"
- Verifique credenciais em `.env`
- Confirme permissões do usuário MySQL

## 📝 Exemplos de Uso

### Criar Cliente
```bash
curl -X POST http://localhost:3001/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua Principal, 123"
  }'
```

### Listar Clientes
```bash
curl http://localhost:3001/api/clientes
```

### Atualizar Cliente
```bash
curl -X PUT http://localhost:3001/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva Atualizado"}'
```

### Deletar Cliente
```bash
curl -X DELETE http://localhost:3001/api/clientes/1
```

## 🔐 Segurança

⚠️ **Aviso**: Este sistema atualmente **não possui autenticação**. Para uso em produção:

1. Implemente autenticação JWT
2. Adicione validação de permissões
3. Use HTTPS/SSL
4. Implemente rate limiting
5. Valide e sanitize todas as entradas
6. Use variáveis de ambiente para senhas

## 📦 Dependências Principais

- **express** - Framework web
- **sequelize** - ORM para SQL
- **mysql2** - Driver MySQL
- **cors** - Habilitador CORS
- **helmet** - Segurança HTTP
- **morgan** - Logger HTTP
- **dotenv** - Gerenciador de variáveis de ambiente

## 👨‍💻 Desenvolvimento

### Adicionar novo modelo
1. Criar arquivo em `models/`
2. Seguir padrão Sequelize
3. Exportar modelo
4. Definir associações em `associate()`

### Adicionar nova rota
1. Criar arquivo em `routes/`
2. Implementar controladores em `controllers/`
3. Registrar em `server.js`: `app.use('/api/novo', novoRoutes)`

## 📖 Referências

- [Sequelize Docs](https://sequelize.org)
- [Express Docs](https://expressjs.com)
- [MySQL Docs](https://dev.mysql.com)

## 📄 Licença

MIT

## 👤 Autor

Igor Beirigo

---

**Última atualização**: Dezembro 2024
