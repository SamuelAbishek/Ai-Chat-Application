# Copilot Instructions for AI Chat Application (MERN Stack)

## Project Overview
- **Full-stack AI chat app** using the MERN stack (MongoDB, Express, React, Node.js).
- Users interact with an AI (Groq LLaMA model) via a chat interface.
- Codebase is split into `client/ai-chat-app-front-end` (React) and `server/` (Node/Express, MongoDB, AI integration).

## Architecture & Data Flow
- **Frontend** (`client/ai-chat-app-front-end/src/`):
  - Main entry: `App.tsx`, with chat UI in `components/` (e.g., `ChatLayout.tsx`, `ChatWindow.tsx`, `MessageInput.tsx`).
  - Communicates with backend via REST API.
- **Backend** (`server/`):
  - API routes in `routes/chat.routes.js` handled by controllers in `controllers/chat.controller.js`.
  - AI logic in `services/ai.service.js` (calls Groq API).
  - MongoDB models in `models/Chat.js`.
  - DB config in `config/db.js`.

## Developer Workflows
- **Frontend**:
  - Install: `npm install` in `client/ai-chat-app-front-end/`
  - Start: `npm start`
  - Build: `npm run build`
  - Test: `npm test`
- **Backend**:
  - Install: `npm install` in `server/`
  - Start: `node index.js` (or use `nodemon` for auto-reload)

## Key Conventions & Patterns
- **API endpoints**: Defined in `server/routes/chat.routes.js`, all chat-related logic is routed through `chat.controller.js`.
- **AI integration**: All AI calls are abstracted in `services/ai.service.js`.
- **State management**: Frontend uses React state/hooks, no Redux or context API by default.
- **Styling**: CSS modules (e.g., `App.css`, `chatUI.css`).
- **Testing**: Frontend uses React Testing Library (see `App.test.tsx`).

## Integration Points
- **Groq AI API**: Backend service in `ai.service.js` handles all external AI requests.
- **MongoDB**: Used for chat history, configured in `config/db.js`.
- **Frontend/Backend communication**: RESTful, typically via `/api/chat` endpoints.

## Examples
- To add a new chat feature, update both `ChatWindow.tsx` (frontend) and `chat.controller.js` (backend).
- To change AI provider, update `ai.service.js` only.

## References
- See `README.md` (root and frontend) for more details on setup and scripts.
- Key directories: `client/ai-chat-app-front-end/`, `server/`

---
For questions or unclear patterns, check the referenced files or ask for clarification.
