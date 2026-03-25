import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import register from "./routes/register.js";
import cors from "cors";
import testHome from "./routes/testHome.js";

dotenv.config();

const PORT = process.env.PORT;
const ADMIN = "Admin";

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

app.use(express.json());
app.use(cors());

// users state
const UsersState = {
  users: [],
  setUsers: (newUsersArray) => {
    UsersState.users = newUsersArray;
  },
};

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

io.on("connection", (socket) => {
  console.log("User has connected: ", socket.id);
});

app.get("/", testHome);

app.use("/api/register", register);

// app.use("/api/login", login)
// app.use("/api/rooms", auth.requireAuth, rooms);
// app.use("/api/messages", auth.requireAuth, messages);
