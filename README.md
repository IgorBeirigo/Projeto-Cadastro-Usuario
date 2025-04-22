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

# Instalar dependências
npm install

# Iniciar servidor backend (porta 3001)
npm run server

# Iniciar aplicação frontend (porta 3000)
npm start


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

🧑‍💻 Autor
Desenvolvido por Igor Beirigo ❤️
