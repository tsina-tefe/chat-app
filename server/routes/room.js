import express from "express";
import { getActiveRooms } from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getActiveRooms);

export default router;
