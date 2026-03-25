import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  req.io.emit("message", "Greetings from the backend");
  res.status(200).json({ data: "Salut" });
});

export default router;
