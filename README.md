# AI Chat Application

A full-stack AI chat application built with React, Node.js, Express, MongoDB, and Groq. Users can register, sign in, update their password, and have authenticated conversations with an AI assistant.

## Features

- User registration, login, and profile access
- JWT-protected API routes
- Password hashing with bcrypt
- Password update support
- AI chat powered by Groq
- Persistent chat history stored in MongoDB
- Markdown-ready chat interface
- API gateway that routes client requests to independent auth and chat services

## Architecture

```text
React Client
    │
    ▼
API Gateway (port 5000)
    ├── Auth Service (port 5001)
    │   ├── User authentication
    │   ├── JWT generation and validation
    │   └── MongoDB users
    │
    └── Chat Service (port 5002)
        ├── Groq AI integration
        └── MongoDB chat history
```

## Tech Stack

- Frontend: React, React Router, React Markdown, CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens and bcrypt
- AI: Groq Chat Completions API (`openai/gpt-oss-20b`)

## Project Structure

```text
Ai-Chat-Application/
├── client/
│   └── ai-chat-app-front-end/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── services/
│       └── package.json
│
├── backend/
│   ├── api-gateway/
│   │   └── index.js
│   ├── auth-service/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   └── chat-service/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── index.js
│
└── README.md
```

## Prerequisites

- Node.js
- MongoDB instance (local or MongoDB Atlas)
- Groq API key

## Installation

Clone the repository:

```bash
git clone https://github.com/SamuelAbishek/Ai-Chat-Application.git
cd Ai-Chat-Application
```

Install dependencies for every service:

```bash
cd backend/api-gateway
npm install
```

```bash
cd ../auth-service
npm install
```

```bash
cd ../chat-service
npm install
```

```bash
cd ../../client/ai-chat-app-front-end
npm install
```

## Environment Variables

Create a `.env` file in each applicable folder.

### `backend/api-gateway/.env`

```env
PORT=5000
AUTH_SERVICE_URL=http://localhost:5001
CHAT_SERVICE_URL=http://localhost:5002
```

### `backend/auth-service/.env`

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### `backend/chat-service/.env`

```env
PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

### `client/ai-chat-app-front-end/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

Never commit `.env` files or expose API keys.

## Running the Application

Start each service in a separate terminal.

```bash
cd backend/auth-service
npm run dev
```

```bash
cd backend/chat-service
npm run dev
```

```bash
cd backend/api-gateway
npm run dev
```

```bash
cd client/ai-chat-app-front-end
npm start
```

Open `http://localhost:3000` in your browser.

## API Endpoints

All client-facing requests go through the API gateway at `http://localhost:5000`.

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user account | No |
| `POST` | `/api/auth/login` | Sign in and receive a JWT | No |
| `GET` | `/api/auth/me` | Get the authenticated user profile | Yes |
| `POST` | `/api/auth/update-password` | Change the authenticated user’s password | Yes |
| `POST` | `/api/chat` | Send a message to the AI | Yes |
| `GET` | `/api/chat` | Retrieve chat history | Yes |

Protected endpoints require this request header:

```http
Authorization: Bearer <your_jwt_token>
```

## Chat Request Example

```json
{
  "message": "Explain how JWT authentication works.",
  "history": [
    {
      "role": "user",
      "content": "Hello!"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you?"
    }
  ]
}
```

## License

This project is available for learning and personal use.
