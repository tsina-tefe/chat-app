import bcrypt from "bcrypt";
import db from "../config/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const loginController = (req, res) => {
  const email = req.body?.email?.trim();
  const password = req.body?.password?.trim();

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter both email and password" });
  }

  const getUser = `
        SELECT * FROM users
        WHERE email = ?
    `;

  db.query(getUser, [email], async (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong, try again later" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user.id,
      name: user.name,
      roomId: user.current_room_id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      message: "Login Successful",
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        roomId: user.current_room_id,
      },
    });
  });
};

export default loginController;
