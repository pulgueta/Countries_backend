import express from "express";
import cors from "cors";
import { Pool } from "pg";

const PORT = 3000;

const db = new Pool({
  host: process.env.AWS_HOST,
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD,
  database: process.env.AWS_DATABASE,
  port: process.env.AWS_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

app.use(cors());
app.listen(PORT);

console.log(`Server on port ${PORT}`);
