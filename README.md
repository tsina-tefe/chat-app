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

## Deploy to Render

This app deploys as two Render services: a Node API and a static React frontend. The database stays on your existing Aiven MySQL instance (`mysql-3a40375e`).

### 1. Prepare Aiven MySQL

1. Open `mysql-3a40375e` in the Aiven console.
2. Create a new database for this app, for example `chat_app`.
3. Run the SQL in `server/schema.sql` against that database.
4. From the Aiven service overview, copy:
   - Host
   - Port
   - Username
   - Password
   - CA certificate

### 2. Push code to GitHub

Render deploys from your GitHub repo: `https://github.com/tsina-tefe/chat-app`

### 3. Create the Render services

**Option A: Blueprint (recommended)**

1. Go to [render.com](https://render.com) → **New** → **Blueprint**.
2. Connect the `chat-app` repo.
3. Render will read `render.yaml` and create both services.
4. Fill in the environment variables when prompted (see below).
5. Deploy the API first. After it is live, set the client `VITE_API_URL` and `VITE_SOCKET_URL` to the API URL, then redeploy the client.

**Option B: Manual**

Create two services:

| Setting | API service | Client service |
|---|---|---|
| Type | Web Service | Static Site |
| Root directory | `server` | `client` |
| Build command | `npm install` | `npm install && npm run build` |
| Start command | `npm start` | — |
| Publish directory | — | `dist` |

### 4. API environment variables (Render)

```bash
NODE_ENV=production
JWT_SECRET=<generate-a-long-random-string>
DB_HOST=<aiven-host>
DB_USER=<aiven-user>
DB_PASSWORD=<aiven-password>
DB_NAME=chat_app
DB_PORT=<aiven-port>
DB_SSL=true
DB_CA_CERT=<paste-aiven-ca-certificate>
ALLOWED_ORIGINS=https://your-client.onrender.com
```

For `DB_CA_CERT`, paste the full CA certificate from Aiven. Render supports multiline values.

### 5. Client environment variables (Render)

```bash
VITE_API_URL=https://your-api.onrender.com
VITE_SOCKET_URL=https://your-api.onrender.com
```

`VITE_*` variables are baked in at build time. After changing them, trigger a new deploy of the client service.

### 6. Verify

1. Open `https://your-api.onrender.com/health` — should return `{"status":"ok"}`.
2. Open the client URL, register a user, create a room, and send a message.

### Render free tier notes

- The API sleeps after inactivity and may take ~30 seconds to wake on the first request.
- WebSockets are supported on Render web services.
- Keep Aiven and Render URLs in sync with `ALLOWED_ORIGINS`.
