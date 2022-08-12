const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/gasoline", (req, res) => {
  const desp = req.query.desp;
  const scope = req.query.scope;
  const col = req.query.col;
  const end = req.query.end;
  const start = req.query.start;
  const db = dbService.getDbServiceInstance();
  const result = db.getGasoline(desp, scope, col, start, end);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log("app is running"));
