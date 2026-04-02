import express from "express";
import { getRoomInfo } from "../controllers/roomInfoController.js";

const router = express.Router();

router.get("/:roomId", getRoomInfo);

export default router;
