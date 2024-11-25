const express = require("express");
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5005;

// Servir les fichiers statiques depuis le dossier "public/images/posters"
server.use(
  "/images/posters",
  express.static(path.join(__dirname, "public", "images", "posters"))
);

server.use(middlewares);
server.use(morgan("dev"));

// Middleware pour désactiver CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
});
