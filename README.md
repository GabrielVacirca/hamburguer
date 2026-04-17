# Hamburguer API

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/license-Academic-informational)

PT-BR | [English](#english-version)

API REST para gerenciamento de uma hamburgueria, construída com Node.js, Express, Sequelize e MySQL.

## Sumário

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar localmente](#como-executar-localmente)
- [Rotas da API](#rotas-da-api)
- [Fluxo de teste recomendado](#fluxo-de-teste-recomendado)
- [Entrega acadêmica](#entrega-acadêmica)
- [Troubleshooting](#troubleshooting)
- [English Version](#english-version)

## Visão geral

Este projeto implementa os principais recursos para uma operação de hamburgueria:

- categorias de produtos
- produtos
- pedidos
- entregas vinculadas a pedidos
- avaliações de pedidos com nota de 1 a 5

Além do CRUD dos recursos, a API aplica **Eager Loading** em pontos-chave:

- consultas de `Pedido` retornam também `entrega` e `avaliacoes`
- consultas de `Categoria` retornam também `produtos`

## Funcionalidades

- CRUD completo de `Categoria`, `Produto`, `Pedido`, `Entrega` e `Avaliacao`
- `Avaliacao` vinculada a `Pedido` via foreign key (`pedido_id`)
- Validação de regra de negócio: `nota` deve ser inteiro entre `1` e `5`
- Estrutura baseada em MVC (`models`, `controllers`, `routes`)
- Migrations para versionamento e evolução de schema

## Tecnologias

- Node.js
- Express
- Sequelize
- sequelize-cli
- MySQL (`mysql2`)
- dotenv

## Estrutura do projeto

```text
.
├── app.js
├── config/
│   └── config.json
├── controllers/
├── migrations/
├── models/
└── routes/
```

## Como executar localmente

### 1) Pré-requisitos

- Node.js 18+
- MySQL rodando localmente
- NPM

### 2) Instalação

```bash
git clone <url-do-repositorio>
cd hamburguer
npm install
```

### 3) Configuração do banco

O projeto atualmente usa duas fontes de configuração:

- `models/Database.js` usa variáveis do `.env` (execução da API)
- `config/config.json` é lido pelo `sequelize-cli` (migrations)

Mantenha os dois **alinhados** para evitar erro de autenticação.

Crie/ajuste o `.env`:

```env
DB_NAME=foodservice
DB_USER=root
DB_PASS=sua_senha_mysql
DB_HOST=localhost
DB_DIALECT=mysql
```

Ajuste `config/config.json`:

```json
{
  "development": {
    "username": "root",
    "password": "sua_senha_mysql",
    "database": "foodservice",
    "host": "localhost",
    "dialect": "mysql"
  }
}
```

Crie o banco se necessário:

```sql
CREATE DATABASE foodservice;
```

### 4) Migrations

```bash
npx sequelize-cli db:migrate
```

Para desfazer a última migration:

```bash
npx sequelize-cli db:migrate:undo
```

### 5) Iniciar API

```bash
node app.js
```

Base URL:

- `http://localhost:3000`

## Rotas da API

### Healthcheck

- `GET /`

### Categoria

- `POST /categoria`
- `GET /categoria`
- `GET /categoria/:id`
- `PUT /categoria/:id`
- `DELETE /categoria/:id`
- `PUT /categoria/restaure/:id`

### Produto

- `POST /produto`
- `GET /produto`
- `GET /produto/:id`
- `PUT /produto/:id`
- `DELETE /produto/:id`

### Pedido

- `POST /pedido`
- `GET /pedido`
- `GET /pedido/:id`
- `PUT /pedido/:id`
- `DELETE /pedido/:id`

### Entrega

- `POST /entrega`
- `GET /entrega`
- `GET /entrega/:id`
- `PUT /entrega/:id`
- `DELETE /entrega/:id`

### Avaliacao

- `POST /avaliacao`
- `GET /avaliacao`
- `GET /avaliacao/:id`
- `PUT /avaliacao/:id`
- `DELETE /avaliacao/:id`

## Fluxo de teste recomendado

1. Criar `categoria`
2. Criar `produto` referenciando `categoriaId`
3. Criar `pedido`
4. Criar `entrega` com `pedido_id`
5. Criar `avaliacao` com `pedido_id` e `nota` entre 1 e 5
6. Listar `pedido` e validar eager loading (`entrega`, `avaliacoes`)
7. Listar `categoria` e validar eager loading (`produtos`)

## Entrega acadêmica

Este repositório foi estruturado para atender critérios comuns de avaliação de API:

- **Versionamento**: histórico de commits com mensagens semânticas
- **Banco de dados**: models + migrations com chave estrangeira correta em `avaliacoes.pedido_id`
- **Roteamento e controllers**: rotas para `Pedido`, `Entrega`, `Produto`, `Avaliacao` e `Categoria`
- **Otimização**: eager loading implementado nas consultas de `Pedido` e `Categoria`

Sugestão para evidência na entrega:

- anexar prints do `git log --oneline`
- anexar print do `npx sequelize-cli db:migrate`
- anexar prints de respostas no Postman (`GET /pedido` e `GET /categoria` com relacionamentos)

## Troubleshooting

### Erro: `Access denied for user 'root'@'localhost'`

Causa comum: credenciais diferentes entre `.env` e `config/config.json`.

Checklist:

- validar acesso manual no MySQL: `mysql -u root -p`
- alinhar `DB_USER`/`DB_PASS` no `.env`
- alinhar `username`/`password` no `config/config.json`
- confirmar se o banco informado existe

### Migration não executa

- confirme se `sequelize-cli` está instalado (`npm install`)
- confira se está rodando na raiz do projeto
- execute novamente: `npx sequelize-cli db:migrate`

## Licença

Projeto disponível para fins acadêmicos e de estudo.

---

## English Version

REST API for a burger shop management system using Node.js, Express, Sequelize, and MySQL.

### Features

- Full CRUD for `Categoria`, `Produto`, `Pedido`, `Entrega`, and `Avaliacao`
- `Avaliacao` linked to `Pedido` through foreign key (`pedido_id`)
- Business rule: `nota` must be an integer from 1 to 5
- Eager loading enabled for:
  - `Pedido` including `entrega` and `avaliacoes`
  - `Categoria` including `produtos`

### Quick Start

```bash
git clone <repository-url>
cd hamburguer
npm install
```

Configure `.env` and `config/config.json` with matching MySQL credentials, then run:

```bash
npx sequelize-cli db:migrate
node app.js
```

Base URL: `http://localhost:3000`

### Main Endpoints

- `GET /`
- `POST/GET/GET:id/PUT/DELETE /categoria`
- `POST/GET/GET:id/PUT/DELETE /produto`
- `POST/GET/GET:id/PUT/DELETE /pedido`
- `POST/GET/GET:id/PUT/DELETE /entrega`
- `POST/GET/GET:id/PUT/DELETE /avaliacao`

### Common issue

If you get `Access denied for user 'root'@'localhost'`, make sure `.env` and `config/config.json` have the same DB credentials.
