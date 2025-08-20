# 🌿 Selva Rosa TUR

Aplicação web desenvolvida para gerenciamento de turismo ecológico, com **frontend em Next.js + Tailwind CSS** e **backend em Node.js + Express + PostgreSQL**.  
O projeto segue arquitetura separada entre **frontend** e **backend**, garantindo escalabilidade e manutenção simples.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- [Next.js](https://nextjs.org/) (React Framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) para requisições HTTP

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/) (ou outro ORM usado, confirme)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) para autenticação
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hash de senhas

---

## 📂 Estrutura do Projeto

```plaintext

SelvaRosaTUR/
│── backend/ # API REST em Node.js + Express
│ ├── src/
│ └── package.json
│
│── frontend/ # Aplicação Web em Next.js
│ ├── src/
│ └── package.json
│
└── README.md
```

---

### 🔹 Pré-requisitos
- [Node.js >= 18](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/SelvaRosaTUR.git
```

### Acessar o diretório do projeto
```bash
cd frontend
```
```bash
cd backend
```

### Instale as dependências:
```bash
npm install
```

### Execute o projeto:
```bash
npm run start
```

⚠️ Configure o arquivo .env com suas variáveis de ambiente:

```bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/selvarosa
JWT_SECRET=sua_chave_secreta
```
## 🔐 Autenticação
- Login com email e senha

- Geração de token JWT

- Rotas protegidas no backend

## 📌 Funcionalidades (em andamento)
- Autenticação de usuários

- Integração frontend ↔ backend

- Painel de administração

- Gerenciamento de roteiros turísticos

- Reserva de atividades

## 👩🏽‍💻 Contribuição
- Faça um fork do projeto

- Crie uma branch (git checkout -b feature/minha-feature)

- Commit suas alterações (git commit -m 'Adiciona minha feature')

- Push para a branch (git push origin feature/minha-feature)

- Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT.
Sinta-se livre para usar, modificar e contribuir!