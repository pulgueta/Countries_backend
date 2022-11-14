const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/create", async (req, res) => {
  const name = req.body.name;
  const country = req.body.country;

  const resp = await db.query(
    `INSERT INTO country (name, country) VALUES (${name}, ${country})`
  );

  res.send("Inserted");
});

app.get("/list", async (_, res) => {
  const countries = await db.query("SELECT * FROM country");

  res.send(countries.rows);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
