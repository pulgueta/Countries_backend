const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const db = new Pool({
  host: process.env.AWS_HOST || "",
  user: process.env.AWS_USER || "",
  password: process.env.AWS_PASSWORD || "",
  database: process.env.AWS_DATABASE || "",
  port: process.env.AWS_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/create", async (req, res) => {
  const name = req.body.name;
  const country = req.body.country;

  const resp = await db
    .query("INSERT INTO countries (name, country) VALUES ($1, $2)", [
      name,
      country,
    ])
    .then((r) => res.send("Inserted"))
    .catch((e) => console.log(e));
});

app.get("/list", async (req, res) => {
  const countries = await db.query("SELECT * FROM countries");

  res.send(countries.rows);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
