import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import register from "./routes/register.js";
import cors from "cors";
import login from "./routes/login.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

app.use(express.json());
app.use(cors());

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

initSocket(io);

app.use("/api/register", register);

app.use("/api/login", login);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error" });
});
