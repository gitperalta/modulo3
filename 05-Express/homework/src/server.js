// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

//  express().METHOD(URL, (req, res, next) => {})
//  IMPORTANTE! Si vamos a trabajar con req.body, es decir vamos a recibir informacion pr body, NO NOS PODEMOS OLVIDAR DE ACTIVAR EL MIDDLEWARE DE express.json()
const PATH = `/posts`;
let id = 1;
//  params
//  /posts/:author/:title/:contents -> /posts/Sebastian/El Señor de los Anillos/La Comunidad del Anillo
//  query
//  /posts -> /posts/?id=hola&author=Sebastian
//  let {id, author, title} = req.query
//  Tengo o no todos los datos esperados?
//  /search/?q=city
//  let {q} = req.query
//  if(q) res.send(Informacion a la ciudad q);
//  else res.send(Informacion de toda la api)

// TODO: your code to handle requests

server.post(PATH, (req, res) => {
  const { author, title, contents } = req.body;
  //    let author = req.body.author
  //    let title = req.body.title
  //    let contents = req.body.contents
  console.log(author, title, contents);
  if (!author || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  } else {
    const post = {
      author,
      title,
      contents,
      id: id++,
    };
    posts.push(post);
    res.status(200).json(post);
  }
});

server.post(`${PATH}/author/:author`, (req, res) => {
  let { author } = req.params;
  let { title, contents } = req.body;
  if (!author || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  } else {
    let post = {
      author,
      title,
      contents,
      id: id++,
    };
    posts.push(post);
    res.status(200).json(post);
  }
});

server.get(PATH, (req, res) => {
  let { term } = req.query;
  if (term) {
    let termPosts = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    res.json(termPosts);
  } else {
    res.json(posts);
  }
});

server.get(`${PATH}/:author`, (req, res) => {
  let { author } = req.params;
  let postAuthor = posts.filter((p) => p.author === author);
  if (postAuthor.length > 0) {
    res.status(200).json(postAuthor);
  } else {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
  }
});

server.get(`${PATH}/:author/:title`, (req, res) => {
  let { author, title } = req.params;
  let newPost = posts.filter((p) => p.author === author && p.title === title);
  if (newPost.length > 0) {
    res.status(200).json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
});

server.put(`${PATH}`, (req, res) => {
  let { id, title, contents } = req.body;
  if (id && title && contents) {
    let rePost = posts.find((p) => parseInt(p.id) === parseInt(id));
    if (rePost) {
      rePost.title = title;
      rePost.contents = contents;
      res.status(200).json(rePost);
    } else {
      res.status(STATUS_USER_ERROR).json({
        error:
          "No se recibieron los parámetros necesarios para modificar el Post",
      });
    }
  } else {
    res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }
});

server.delete(`${PATH}`, (req, res) => {
  let { id } = req.body;
  let borrar = posts.find((p) => parseInt(p.id) === parseInt(id));
  if (!id || !borrar) {
    res.status(STATUS_USER_ERROR).json({ error: "Mensaje de error" });
  } else {
    posts = posts.filter((p) => parseInt(id) !== parseInt(p.id));
    res.status(200).json({ success: true });
  }
});

server.delete(`/author`, (req, res) => {
  let { author } = req.body;
  let findAuthor = posts.find((p) => p.author === author);
  if (!author || !findAuthor) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });
  } else {
    let deleteAuthors = [];
    // deleteAuthors = posts.filter((p) => p.author === author);
    // posts = posts.filter((p) => p.author !== author);
    posts = posts.filter((p) => {
      if (p.author !== author) {
        return true;
      } else {
        deleteAuthors.push(p);
      }
    });
    res.status(200).json(deleteAuthors);
  }
});

module.exports = { posts, server };
