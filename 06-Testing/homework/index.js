const express = require("express");
const app = express();
const { sumaArray, pluck } = require("./utils");

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});

app.get("/test", (req, res) => {
  res.send({
    message: "test",
  });
});

app.post("/sum", (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post("/product", (req, res) => {
  let { a, b } = req.body;
  if (typeof a === "number" && typeof b === "number") {
    res.send({
      result: a * b,
    });
  } else {
    res.sendStatus(400);
  }
});

app.post("/sumArray", (req, res) => {
  let { array, num } = req.body;
  if (!array || (!num && num !== 0)) return res.sendStatus(400);
  return res.json({ result: sumaArray(array, num) });
});

app.post("pluck", (req, res) => {
  const { array, prop } = req.body;
  if (!prop || !Array.isArray(array)) return res.sendStatus(404);
  res.send({ result: pluck(array, prop) });
});

app.post("/numString", (req, res) => {
  let { s } = req.body;
  if (!s) return res.sendStatus(400);
  res.send({ result: s.length });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
