import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import register from "./routes/register.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import login from "./routes/login.js";
import { initSocket } from "./socket/socket.js";
import room from "./routes/room.js";
import authenticateToken from "./middleware/authenticateToken.js";
import roomInfo from "./routes/room-info.js";

dotenv.config();

const PORT = process.env.PORT || 3500;
const isProd = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const isLocalDevOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
const isAllowedOrigin = (origin) =>
  allowedOrigins.includes(origin) || (!isProd && isLocalDevOrigin(origin));

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isProd ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const expressServer = app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

const io = new Server(expressServer, {
  cors: {
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error("Socket origin not allowed"));
    },
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

initSocket(io);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/register", authLimiter, register);

app.use("/api/login", authLimiter, login);

app.use("/api/room", authenticateToken, room);

app.use("/api/room-info", authenticateToken, roomInfo);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error" });
});
