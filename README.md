# Upload Widget Server

Backend server para o projeto Upload Widget, desenvolvido com Fastify, TypeScript e Drizzle ORM. Este serviço é responsável por gerenciar uploads de arquivos, armazenando-os em um bucket (Cloudflare R2/S3) e mantendo registros no banco de dados PostgreSQL.

## 🚀 Tecnologias

- **Node.js** & **TypeScript**
- **Fastify** (Framework Web)
- **Drizzle ORM** (Interação com Banco de Dados)
- **PostgreSQL** (Banco de Dados)
- **Docker** & **Docker Compose**
- **Zod** (Validação de Schemas)
- **AWS SDK** (Integração com Cloudflare R2/S3)
- **Vitest** (Testes)
- **Biome** (Linter/Formatter)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- [Docker](https://www.docker.com/) e Docker Compose

## 🔧 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd upload-widget-server
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto copiando as variáveis necessárias. Exemplo:
   ```env
   NODE_ENV=development
   PORT=3333
   DATABASE_URL="postgresql://docker:docker@localhost:5432/upload"

   # Configurações de Upload (Cloudflare R2 ou compatível com S3)
   CLOUDFLARE_ACCOUNT_ID="seu_account_id"
   CLOUDFLARE_ACCESS_KEY_ID="sua_access_key"
   CLOUDFLARE_SECRET_ACCESS_KEY="sua_secret_key"
   CLOUDFLARE_BUCKET_NAME="nome_do_bucket"
   CLOUDFLARE_PUBLIC_URL="https://pub-xxx.r2.dev"
   ```

4. **Suba o banco de dados via Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco de dados:**
   ```bash
   npm run db:migrate
   ```

## ⚡ Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3333`.

A documentação da API (Swagger) estará disponível em:
**http://localhost:3333/docs**

## 📍 Rotas da API

### Uploads
- **POST** `/uploads`: Realiza o upload de uma imagem (multipart/form-data).
  - Limite: 2MB.

### Listagem e Exportação
- **GET** `/uploads`: Lista os uploads realizados com suporte a filtro e paginação.
  - Query Params: `searchQuery`, `sortBy`, `sortDirection`, `page`, `pageSize`.
- **POST** `/uploads/exports`: Solicita a exportação dos dados de uploads (Gera um CSV).

## 🧪 Testes

Para rodar os testes automatizados:

```bash
npm test
```

## 📝 Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `test`: Roda os testes com Vitest.
- `db:generate`: Gera migrações do Drizzle baseadas no schema.
- `db:migrate`: Aplica as migrações ao banco de dados.
- `db:studio`: Abre o Drizzle Studio para visualizar o banco.