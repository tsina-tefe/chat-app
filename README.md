# Fluid Chat

Fluid Chat is a real-time chat application with authentication, room-based conversations, typing indicators, and live presence updates. The client is built with React and Vite, and the server exposes REST endpoints plus a Socket.IO websocket for realtime messaging.

## Features

- User registration and login with JWT auth
- Room list browsing and room creation
- Realtime room messaging over Socket.IO
- Typing indicators and join/leave presence notifications
- Room-specific details and message history
- Dark/light theme toggle
- Toast notifications for success and error states

## Tech Stack

- Frontend: React 19, Vite, React Router, Tailwind CSS, Axios, Sonner
- Backend: Node.js, Express, Socket.IO, MySQL, bcrypt, jsonwebtoken

## Project Structure

- client/ - React frontend
- server/ - Express and Socket.IO backend

## Requirements

- Node.js 18 or newer
- npm
- MySQL database

## Setup

Install dependencies in both apps:

```bash
cd client
npm install

cd ../server
npm install
```

Create the environment files below before starting the app.

### Client environment

Create client/.env:

```bash
VITE_API_URL=http://localhost:3500
```

### Server environment

Create server/.env:

```bash
PORT=3500
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

## Running Locally

Start the backend first:

```bash
cd server
node index.js
```

Then start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal, usually http://localhost:5173.

## Available Client Scripts

From client/:

- npm run dev - start the Vite development server
- npm run build - create a production build
- npm run preview - preview the production build locally
- npm run lint - run ESLint

## Notes

- The websocket client currently connects to http://localhost:3500, so keep the backend port aligned with PORT unless you update the client Socket.IO URL.
- The app stores the JWT and user profile in local storage to restore the session on refresh.
- If you change API hosts or ports, update VITE_API_URL in the client environment.
