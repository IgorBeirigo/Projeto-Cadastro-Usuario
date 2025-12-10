# 📦 Sistema CRUD - Gerenciamento de Clientes, Produtos e Entregas

> **Refatorado para remover autenticação e melhorar funcionalidades CRUD padrão**

Sistema full-stack com React frontend e Node.js/Express backend para gerenciar clientes, produtos e entregas.

## ✨ Visão Geral

Aplicação de Painel Administrativo com operações **CRUD** (Create, Read, Update, Delete) completas para:
- 👥 **Clientes** - Cadastro com nome, email, telefone, endereço
- 📦 **Produtos** - Gerenciamento com tipo e data de validade  
- 🚚 **Entregas** - Rastreamento com relacionamento Cliente/Produto

## 🚀 Início Rápido (5 minutos)

```bash
# 1. Backend
cd backend
cp .env.example .env  # Configure com suas credenciais MySQL
npm install
npm start             # Porta 3001

# 2. Frontend (novo terminal)
cd frontend
npm install
npm start             # Porta 3000

# 3. Teste
curl http://localhost:3001/health
```

✅ Acesse http://localhost:3000

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [QUICK_START.md](./QUICK_START.md) | 👈 **Comece aqui!** |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitetura e diagramas |
| [API_DOCS.md](./backend/API_DOCS.md) | Endpoints da API |
| [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) | Integração Frontend |
| [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) | Mudanças realizadas |
| [INDEX.md](./INDEX.md) | Índice completo |

## 🎯 Endpoints da API

```bash
# CLIENTES
GET    /api/clientes
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id

# PRODUTOS
GET    /api/produtos
POST   /api/produtos
PUT    /api/produtos/:id
DELETE /api/produtos/:id

# ENTREGAS
GET    /api/entregas
POST   /api/entregas
PUT    /api/entregas/:id
DELETE /api/entregas/:id

# HEALTH
GET    /health
```

## ✅ Mudanças Principais

### Autenticação Removida ✅
- JWT tokens desativados
- Middleware de autenticação removido
- Acesso livre para desenvolvimento

### Melhorias ✅
- Validação de campos obrigatórios
- Tratamento de erros padronizado
- Logs detalhados
- 8 documentos novos
- Script de testes automático

## 🛠️ Stack Tecnológico

**Backend**: Node.js • Express • Sequelize • MySQL • CORS • Helmet
**Frontend**: React.js • Axios • React Router • Bootstrap

## 🗂️ Estrutura

```
projeto-cadastro/
├── backend/              # API REST
│   ├── models/          # Sequelize models
│   ├── routes/          # Express routes
│   ├── controllers/     # Lógica de negócio
│   ├── server.js        # Entry point
│   └── test-api.js      # Testes
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # React components
│   │   └── services/    # Chamadas API
│   └── package.json
└── docs/               # Documentação
```

## 📋 Requisitos

- Node.js 14+
- MySQL 5.7+
- npm ou yarn

## 🧪 Testar

### Script Automático
```bash
cd backend
node test-api.js
```

### Teste Manual
```bash
curl -X POST http://localhost:3001/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@example.com","telefone":"11999","endereco":"Rua 1"}'
```

## 🐛 Troubleshooting

**MySQL não conecta?**
```bash
# Inicie o MySQL
# Windows: Services → MySQL
# Linux: sudo systemctl start mysql
# Mac: brew services start mysql
```

**Porta em uso?**
```bash
# Verifique processos
# Windows: netstat -ano | findstr :3001
# Linux: lsof -i :3001
```

**Mais ajuda?** Veja [QUICK_START.md - Erros Comuns](./QUICK_START.md)

## 📊 Status

| Aspecto | Status |
|---------|--------|
| CRUD Funcional | ✅ |
| Documentação | ✅ |
| Testes | ✅ |
| Sem Autenticação | ✅ |
| Pronto Produção | ⚠️ |

## 🚀 Próximos Passos

- [ ] Testar todos endpoints
- [ ] Ler ARCHITECTURE.md
- [ ] Implementar autenticação (produção)
- [ ] Adicionar paginação
- [ ] Testes unitários

## ⚠️ Notas Importantes

**Segurança**: Este projeto **não possui autenticação**. Para produção:
- Implemente JWT
- Adicione autorização
- Use HTTPS
- Valide todas as entradas
- Rate limiting

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

🧑‍💻 Autor
Desenvolvido por Igor Beirigo ❤️
