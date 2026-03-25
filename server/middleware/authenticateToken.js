import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("No token");
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Access Denied" });
  }
};

export default authenticateToken;
