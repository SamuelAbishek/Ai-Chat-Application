🤖 AI Chat Application (MERN Stack)
This is a full-stack AI Chat Application built using the MERN stack, where users can interact with an AI through a simple and clean chat interface. The project focuses on integrating frontend, backend, database, and an AI API in a practical way.

🚀 Features
💬 Chat interface for user–AI interaction
🧠 AI responses powered by Groq (LLaMA model)
🎨 Clean and responsive chat UI
🗄️ Chat messages stored in MongoDB
🔐 Secure handling of API keys using .env
⚡ Backend API built with Express.js

🛠️ Tech Stack
Frontend
⚛️ React
🟦 TypeScript
🎨 CSS

Backend
🟢 Node.js
🚂 Express.js
🤖 Groq AI API

Database
🍃 MongoDB (Local)

📁 Project Structure
ai-chat-app/
│
├── client/
│   └── ai-chat-app-front-end
│
├── server/
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── models
│   └── index.js
│
└── .gitignore

🔑 Environment Setup
Create a .env file inside the server folder:
GROQ_API_KEY=your_api_key_here
MONGO_URI=your_mongodb_uri

🔒 The .env file is ignored by Git to keep secrets safe.

▶️ Running the Project
Start Backend
cd server
npm install
npm run dev

Start Frontend
cd client/ai-chat-app-front-end
npm install
npm start

📘 What This Project Demonstrates
MERN stack integration
Frontend–backend communication
AI API usage in a real application
Database storage of chat messages
Secure environment variable usage

👨‍💻 Author
Samuel Abishek R
Computer Science Engineering Student
