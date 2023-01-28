"use strict";

console.log(
  "Bienvenue vous êtes dans la page. Ce message apparaitra dans la console car on va utiliser node.js. Penser à installer node express & all the stuff you may find useful for the project"
);

const { Socket } = require("socket.io");
const express = require("express");
const app = express();
const port = 8889;
/// création du serveur
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
console.log("hello from the server");

/////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

io.on("connection", (socket) => {
  console.log(`un utilisateur est connecté avec ce socket${socke.id}`);
  socket.on("joueur", (joueur) => {
    console.log(`Bonjour  et bienvenue ${joueur.username}`);
  });
});
