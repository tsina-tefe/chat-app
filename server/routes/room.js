import express from "express";

const router = express.Router();

router.post("/enterRoom", joinRoom);

// router.post("/leaveRoom", leaveRoom)

export default router;
