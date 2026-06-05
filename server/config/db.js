import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const useSsl = process.env.DB_SSL === "true";
const caCert = process.env.DB_CA_CERT?.replace(/\\n/g, "\n");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ...(useSsl && {
    ssl: {
      ...(caCert && { ca: caCert }),
      rejectUnauthorized: true,
    },
  }),
});

db.getConnection((error, connection) => {
  if (error) {
    console.log("Database connection error: ", error);
  } else {
    console.log("Database connected successfully");
    connection.release();
  }
});

export default db;
