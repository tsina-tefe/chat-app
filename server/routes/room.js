import express from "express";
import {
  getActiveRooms,
  createNewRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getActiveRooms);

router.post("/new", createNewRoom);

export default router;
