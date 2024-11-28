require("dotenv").config();
const express = require("express");
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

// Create the JSON server
const server = jsonServer.create();

// Read the database
let db;
try {
  db = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json"), "utf-8"));
} catch (err) {
  console.error("Error reading db.json:", err.message);
  process.exit(1);
}
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// Use environment port or fallback
const PORT = process.env.PORT || 5005;

// Serve static files
server.use(
  "/images/posters",
  express.static(path.join(__dirname, "public", "images", "posters"))
);

// Add middleware
server.use(middlewares);
server.use(morgan("dev"));

// Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use JSON server router
server.use(router);

// Start the server
server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
});
