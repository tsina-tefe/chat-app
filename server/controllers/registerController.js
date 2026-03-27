import db from "../config/db.js";
import bcrypt from "bcrypt";
import validator from "validator";

const registerUser = async (req, res) => {
  const name = req.body.name.trim();
  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Invalid Email, Please enter valid Email" });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, and a number",
    });
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({
      message: "Username must contain only letters and numbers",
    });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`;

  const registerUser = `
        INSERT INTO users(full_name, email, avatar, username, password)
    VALUES (?, ?, ?, ?, ?)
    `;

  db.query(
    registerUser,
    [name, email, avatarUrl, username, hashedPass],
    (error) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already in use" });
        }

        return res
          .status(500)
          .json({ message: "Something went wrong, try again later" });
      }

      res.status(201).json({ message: "Account created successfully" });
    },
  );
};

export default registerUser;
