let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send(`Hola estoy en /About/`);
});

router.get(`/Sebastian`, (req, res) => {
  res.send(`Sebastian`);
});

router.get(`/:id`, (req, res) => {
  res.send(req.params.id);
});

module.exports = router;

//  /About/
//  /About/sebastian
//  /About/5
