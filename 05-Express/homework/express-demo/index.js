let express = require("express");
let logger = require("morgan");
let app = express();
let caramelos = 20;
let routes = require("./route.js");

//  Lo vamos a utilizar para definir y establecer middlewares
//  request -> middleware -> next() -> ahora va a buscar la ruta que le corresponde
app.use(`/`, (req, res, next) => {
  console.log(`Hicieron un request a ${req.url}`);
  next();
});

app.use(logger(`dev`));
app.use(express.json());
//  -> request -> middleware -> oh tengo un `/about` -> lo va a buscar al archivo pasado por parametro
app.use(`/about`, routes);

//  req.url === "/" -> content-type, res.end
app.get("/", (req, res, next) => {
  //    status code 200
  //    res.send("Hello")
  //    aca suponganse que guardan informacion en la db y hacen algun analisis
  //   res.send("Hola");
  next();
});

app.get("/", (req, res) => {
  if (caramelos > 10) return res.send("10");
  res.send("Hola");
});

app.get("/home", (req, res) => {
  res.send("Home");
});

//  /welcome/sebastian
//  /welcome/geraldine
//  /welcome/zoe
app.get("/welcome/:name/:lastname", (req, res) => {
  console.log(req.params); // {name: "sebastian", lastname: "peralta" }
  //   let name = req.params.name;
  let { name, lastname } = req.params;
  res.send(`Hola ${name} ${lastname}`);
});

app.get("/nombre", (req, res) => {
  let { name, lastname, age } = req.query;
  if (name && lastname && age) {
    res.send(
      `Hola mi nombre es ${name} ${lastname} y tengo ${age} años de edad`
    );
  } else {
    res.send("Data is missing");
  }
  console.log(req.query);
});

//  /abcd o /acd
//  El elemento que antece al signo de pregunta puede o no pertenecer a la ruta. Por lo tanto si en este caso, accedo a /abcd o /acd en ambos casos voy a estar devolviendo ab?cd
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

// /abcd /abbbbbcd /abbbcd
// el elemento que antecede al signo *, debe aparecer como minimo una vez, y puede aparecer tantas veces como quiera
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});

app.post("/", (req, res) => {
  console.log(req.body);
  let { name, lastname } = req.body;
  console.log(name, lastname);
  res.send("done");
});

app.put("/:id", (req, res) => {
  res.send(req.params.id);
});

// app.post("/:id", (req, res) => {});

app.get("*", (req, res) => {
  res.send("Wrong url");
});

app.listen(3001);
