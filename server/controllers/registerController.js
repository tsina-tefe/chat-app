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

  if (password.length <= 8) {
    res
      .status(400)
      .json({ message: "Password should be greater than 8 characters." });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const registerUser = `
        INSERT INTO users(full_name, email, username, password)
    VALUES (?, ?, ?, ?)
    `;

  db.query(registerUser, [name, email, username, hashedPass], (error) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already in use" });
      }

      return res
        .status(500)
        .json({ message: "Something went wrong, try again later" });
    }

    res.status(201).json({ message: "Account created successfully" });
  });
};

export default registerUser;
