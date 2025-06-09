# 📚 Sistema de Reserva de Livros (Microsserviços)

Este projeto implementa um sistema de reserva de livros utilizando a arquitetura de **microsserviços** com Node.js e MongoDB. Ele é dividido em dois serviços independentes que se comunicam via **REST API**.

---

## 🔧 Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB (Mongoose)
- Axios (para comunicação entre serviços)
- Nodemon (ambiente de desenvolvimento)

---

## 📦 Estrutura de Microsserviços

### 1️⃣ `book-service`

Gerencia os dados dos livros.

#### Endpoints:

| Método | Rota                         | Descrição                           |
|--------|------------------------------|-------------------------------------|
| POST   | `/books`                     | Cadastrar novo livro                |
| GET    | `/books`                     | Listar todos os livros              |
| GET    | `/books/:id`                | Detalhar um livro por ID            |
| PUT    | `/books/:id`                | Atualizar informações do livro      |
| PATCH  | `/books/:id/status`         | Alterar status (disponível/reservado) |

---

### 2️⃣ `reservation-service`

Gerencia as reservas de livros e se comunica com o `book-service` para verificar e atualizar a disponibilidade.

#### Endpoints:

| Método | Rota                              | Descrição                              |
|--------|-----------------------------------|----------------------------------------|
| POST   | `/reservations`                   | Criar nova reserva (verifica o livro)  |
| GET    | `/reservations/user/:userId`      | Listar reservas de um usuário          |
| DELETE | `/reservations/:id`               | Cancelar uma reserva e liberar o livro |

---

## 🔁 Fluxo de Reserva

1. O cliente envia uma requisição de reserva para o `reservation-service`.
2. O serviço consulta o `book-service` para verificar se o livro está disponível.
3. Se disponível:
   - Cria a reserva
   - Atualiza o status do livro para **"reservado"**
4. Se não estiver disponível:
   - Retorna erro informando que o livro não está disponível.
5. Ao cancelar uma reserva:
   - O status do livro volta para **"disponível"**

---

## 🛠 Como Executar Localmente

### Pré-requisitos:
- Node.js instalado
- MongoDB rodando localmente (porta padrão: 27017)

### 1. Clonar o projeto
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Subir cada microsserviço

#### 📘 Book Service
```bash
cd book-service
npm install
npm run dev
```

#### 📗 Reservation Service
```bash
cd ../reservation-service
npm install
npm run dev
```

---

## ✅ Testes Sugeridos

### Criar livro (`book-service`)
```json
POST /books
{
  "titulo": "Clean Architecture",
  "autor": "Robert Martin"
}
```

### Criar reserva (`reservation-service`)
```json
POST /reservations
{
  "userId": 101,
  "bookId": "ID_DO_LIVRO"
}
```

### Cancelar reserva
```http
DELETE /reservations/ID_DA_RESERVA
```

---