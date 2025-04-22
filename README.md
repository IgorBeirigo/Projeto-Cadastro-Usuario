# Cadastro de Usuários

Este projeto é uma aplicação de um Painel Administrativo de uma emprsa de **CRUD** (Create, Read, Update, Delete), onde é possível cadastrar, listar, editar e excluir informações.

## 🚀 Tecnologias Utilizadas

- **Frontend**:
-   React.js,
-   Bootstrap,
-   Axios,
-   Font Awesome.
- **Backend**:
-   Node.js,
-   Express,
-   Sequelize,
-   MySQL,
-   CORS.
-   **Padrões e Arquitetura**:
-   REST API
-   CRUD

## 📦 Funcionalidades

-**Módulo de Clientes**
-  Visualização de clientes
-  Cadastro de novos clientes (nome, email, telefone, endereço)
-**Módulo de Produtos**
-  Listagem de produtos
-  Cadastro de produtos (nome, tipo, validade, descrição)
-**Módulo de Entregas**
-  Visualização de entregas com dados do cliente e produto
-  Registro de novas entregas (protocolo, status)
  
## 🏗️ Estrutura do Banco

-  Clientes (id, nome, email, telefone, endereco)
-  Produtos (id, nome, tipo, validade, descricao)
-  Entregas (id, protocolo, status, clienteId, produtoId)

## 🎯 Objetivo

O objetivo deste projeto é praticar a integração entre o frontend (React) e uma API REST, utilizando conceitos como:

- Requisições HTTP com Axios
- Manipulação de estado e formulários em React
- Componentização
- Estilização com Bootstrap

## ⚙️ Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cadastro-usuarios.git
cd cadastro-usuarios
2. Instale as dependências do frontend
bash
Copiar
Editar
cd frontend
yarn install
3. Instale as dependências do backend
bash
Copiar
Editar
cd ../backend
yarn install
4. Inicie o backend (JSON Server)
bash
Copiar
Editar
yarn start
# ou
npx json-server --watch db.json --port 3001
5. Inicie o frontend (React)
bash
Copiar
Editar
cd ../frontend
yarn start
Acesse em: http://localhost:3000

O JSON Server ficará rodando em http://localhost:3001

🗃️ Estrutura de Diretórios
pgsql
Copiar
Editar
cadastro-usuarios/
├── backend/
│   ├── db.json
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
🧑‍💻 Autor
Desenvolvido por Igor Beirigo ❤️
