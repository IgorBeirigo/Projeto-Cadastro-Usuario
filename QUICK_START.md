# 🚀 Guia Rápido - Como Começar

## ⚡ 5 Minutos para Ter Tudo Rodando

### 1️⃣ Prepare o Banco de Dados

```sql
-- Abra MySQL Workbench ou linha de comando
CREATE DATABASE IF NOT EXISTS sistema_entregas;
USE sistema_entregas;
```

### 2️⃣ Configure o Backend

```bash
cd backend

# Copie o arquivo de configuração
cp .env.example .env

# Edite .env com suas credenciais MySQL:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=sua_senha
# DB_NAME=sistema_entregas

# Instale dependências
npm install

# Inicie o servidor
npm start
# Ou para modo desenvolvimento:
npm run dev
```

✅ Você deve ver:
```
✅ Conexão com banco de dados estabelecida
✅ Modelos sincronizados
🚀 Servidor rodando em http://localhost:3001
```

### 3️⃣ Teste a API (Terminal Novo)

```bash
# Opção 1: Script de teste automático
cd backend
node test-api.js

# Opção 2: Teste manual com curl
curl http://localhost:3001/health

# Opção 3: Postman
# Abra Postman e importe os endpoints
```

### 4️⃣ Inicie o Frontend (Terminal Novo)

```bash
cd frontend

# Instale dependências
npm install

# Inicie o React
npm start
# Ou use webpack:
npm run build
```

✅ Acesse: `http://localhost:3000`

### 5️⃣ Teste o CRUD Completo

#### 1. Criar Cliente
```bash
curl -X POST http://localhost:3001/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua Principal, 123"
  }'

# Resposta esperada:
# {"id": 1, "nome": "João Silva", "email": "joao@example.com", ...}
```

#### 2. Listar Clientes
```bash
curl http://localhost:3001/api/clientes

# Resposta: [{"id": 1, "nome": "João Silva", ...}]
```

#### 3. Atualizar Cliente
```bash
curl -X PUT http://localhost:3001/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva Atualizado"}'

# Resposta: {"id": 1, "nome": "João Silva Atualizado", ...}
```

#### 4. Deletar Cliente
```bash
curl -X DELETE http://localhost:3001/api/clientes/1

# Resposta: (vazio - status 204)
```

## 🎯 Próximas Ações

### Se Tudo Funcionou ✅
1. [ ] Explore a documentação em `API_DOCS.md`
2. [ ] Leia `ARCHITECTURE.md` para entender o sistema
3. [ ] Veja `REFACTORING_SUMMARY.md` para mudanças realizadas
4. [ ] Comece a implementar suas features

### Se Algo Deu Erro ❌
1. [ ] Verifique se MySQL está rodando
   ```bash
   # Windows
   Get-Service | Select Name | Where {$_ -match "MySQL"}
   
   # Linux/Mac
   sudo service mysql status
   ```

2. [ ] Verifique as credenciais em `.env`
   ```bash
   cat .env
   ```

3. [ ] Crie o banco se não existir
   ```sql
   CREATE DATABASE sistema_entregas;
   ```

4. [ ] Verifique se as portas estão livres
   ```bash
   # Backend porta 3001
   netstat -an | grep 3001
   
   # Frontend porta 3000
   netstat -an | grep 3000
   ```

5. [ ] Verifique os logs
   ```bash
   # Backend
   npm start  # Veja mensagens de erro
   
   # Frontend
   npm start  # Veja erros no console
   ```

## 📦 Estrutura de Dados

### Cliente
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua Principal, 123",
  "createdAt": "2024-12-10T10:30:00.000Z",
  "updatedAt": "2024-12-10T10:30:00.000Z"
}
```

### Produto
```json
{
  "id": 1,
  "nome": "Café Premium",
  "tipo": "Bebida",
  "validade": "2025-12-31",
  "descricao": "Café arábica importado",
  "createdAt": "2024-12-10T10:30:00.000Z",
  "updatedAt": "2024-12-10T10:30:00.000Z"
}
```

### Entrega
```json
{
  "id": 1,
  "protocolo": "ENT-2024-001",
  "status": "Pendente",
  "clienteId": 1,
  "produtoId": 1,
  "createdAt": "2024-12-10T10:30:00.000Z",
  "updatedAt": "2024-12-10T10:30:00.000Z",
  "Cliente": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com"
  },
  "Produto": {
    "id": 1,
    "nome": "Café Premium",
    "tipo": "Bebida"
  }
}
```

## 🧪 Teste com Postman

1. **Baixar Postman**: https://www.postman.com/downloads/
2. **Importar Collection**:
   ```
   File → Import → Selecione um arquivo .json
   ```
3. **Ou criar manualmente**:
   - Method: `POST`
   - URL: `http://localhost:3001/api/clientes`
   - Headers: `Content-Type: application/json`
   - Body: `{"nome":"João","email":"joao@example.com","telefone":"11999999999","endereco":"Rua 1"}`
   - Send

## 💻 Arquivos Importantes

| Arquivo | Propósito | Prioridade |
|---------|-----------|-----------|
| `backend/server.js` | Inicia API | ⭐⭐⭐ |
| `backend/.env` | Credenciais BD | ⭐⭐⭐ |
| `backend/models/*` | Estrutura BD | ⭐⭐⭐ |
| `backend/routes/*` | Endpoints | ⭐⭐⭐ |
| `API_DOCS.md` | Documentação | ⭐⭐ |
| `ARCHITECTURE.md` | Entender sistema | ⭐⭐ |
| `REFACTORING_SUMMARY.md` | Mudanças | ⭐ |

## 🔄 Fluxo de Trabalho Recomendado

```
1. Backend (primeiro)
   └─ Instalar
   └─ Configurar .env
   └─ npm install
   └─ npm start
   └─ Testar com curl/Postman

2. Frontend (depois)
   └─ Instalar
   └─ npm install
   └─ npm start
   └─ Testar na interface

3. Integração
   └─ Conectar Frontend ao Backend
   └─ Testar CRUD completo
   └─ Resolver erros

4. Deploy (quando pronto)
   └─ Produção backend
   └─ Produção frontend
   └─ Domínio + HTTPS
```

## 🐛 Erros Comuns

### "Cannot find module 'express'"
```bash
cd backend
npm install
```

### "ECONNREFUSED - MySQL connection"
```bash
# Inicie o MySQL
# Windows: Services → MySQL → Start
# Linux: sudo systemctl start mysql
# Mac: brew services start mysql
```

### "EADDRINUSE - Port already in use"
```bash
# Verifique processos usando a porta
# Windows: netstat -ano | findstr :3001
# Linux: lsof -i :3001
# Mate o processo: kill -9 <PID>
```

### "Email already exists"
```
Erro: "email já está registrado"
Solução: Use um email diferente no teste
```

### "CORS error"
```
Erro: "Access to XMLHttpRequest blocked by CORS"
Solução: Verifique FRONTEND_URL em .env
```

## 📊 Checklist de Configuração

- [ ] MySQL instalado e rodando
- [ ] Banco `sistema_entregas` criado
- [ ] Backend `/backend/.env` configurado
- [ ] `npm install` executado (backend e frontend)
- [ ] `npm start` backend em porta 3001
- [ ] `npm start` frontend em porta 3000
- [ ] Health check: `curl http://localhost:3001/health` retorna OK
- [ ] Teste POST cliente: resposta 201
- [ ] Teste GET clientes: retorna array
- [ ] Frontend carrega sem erros

## 🎓 Próximo Passos

1. **Entender a Arquitetura**
   - Ler `ARCHITECTURE.md`
   - Ver diagrama de fluxo

2. **Entender o CRUD**
   - Ver `API_DOCS.md`
   - Testar cada endpoint

3. **Integração Frontend**
   - Ler `FRONTEND_INTEGRATION.md`
   - Atualizar `services/api.js`

4. **Adicionar Features**
   - Paginação
   - Filtros
   - Validações avançadas

5. **Produção**
   - Implementar autenticação
   - Rate limiting
   - HTTPS
   - Deploy na nuvem

## 📞 Suporte

### Documentação
- `README.md` - Overview geral
- `API_DOCS.md` - Endpoints detalhados
- `ARCHITECTURE.md` - Entender sistema
- `FRONTEND_INTEGRATION.md` - Conectar frontend

### Testes
- `test-api.js` - Script automático
- Postman - Interface gráfica
- curl - Linha de comando

### Código
- Backend: `/backend`
- Frontend: `/frontend`
- Modelos: `/backend/models`
- Rotas: `/backend/routes`

---

**Status**: ✅ Pronto para usar
**Última atualização**: Dezembro 2024
**Versão**: 1.0.0
