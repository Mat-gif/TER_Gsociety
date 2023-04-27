/*npm instal express */
/* npm run build */
/* node server.js*/
// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
const port = 3000;
// eslint-disable-next-line no-undef
const http = require("http");
const server = http.createServer(app);
// eslint-disable-next-line no-undef
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Utiliser des fichiers statiques à partir du répertoire 'public'
app.use(express.static("dist"));

let rooms = [];

io.on("connection", (socket) => {
  console.log(`[connection] ${socket.id}`);

  /*reception d'un message #loom */
  socket.on("message", (data) => {
    socket.broadcast.emit("message recu", data);
  });

  /*  connection d'un client */
  socket.on("playerData", (player) => {
    console.log(`[playerData] ${player.username}`);
    let room = null;

    /* creation d'une nouvelle room*/
    if (!player.roomId) {
      room = createdRoom(player);
      console.log(`[create room] - ${room.id} - ${player.username}`);
      io.emit("room id", room.id);
    } else {
      /* j'ajoute le player dans la room */
      room = rooms.find((r) => r.id === player.roomId);
      if (room === undefined) {
        return;
      }
      /*on ajoute le joueur dans la room */
      room.players.push(player);
      room.plateau = positionPionStart(room.plateau, room.players.length);
      console.log(room.plateau);
      io.emit(
        "list rooms",
        rooms.filter((r) => r.players.length < r.players.nb_Players)
      );
    }

    socket.join(room.id);

    /* info quand autre joueurs rejoints le salon uniquement a un socket*/
    io.to(socket.id).emit("join room", room.id);
    /* debut de la partie */
    if (room.players.length === room.players.nb_Players) {
      io.to(room.id).emit("start game", room.players);
    }
  });

  /* récuperation des liste des socket disponibles */
  socket.on("get rooms", () => {
    io.to(socket.id).emit(
      "list rooms",
      rooms.filter((r) => r.players.length < r.players.nb_Players)
    );
  });

  socket.on("get users", (roomID) => {
    io.to(roomID).emit(
      "list users",
      rooms.filter((r) => r.id === roomID)[0].players
    );
  });

  /* Deconnexion : on supprimer la room  */
  socket.on("disconnect", () => {
    console.log(`[disconnect] ${socket.id} `);
    let room = null;

    rooms.forEach((r) => {
      r.players.forEach((p) => {
        if (p.socketId === socket.id) {
          if (p.host) {
            room = r;
            rooms = rooms.filter((r) => r !== room);
          } else {
            const index = r.players.indexOf(p);
            r.players.splice(index, 1);
          }
        }
      });
    });
    io.emit(
      "list rooms",
      rooms.filter((r) => r.players.length < r.players.nb_Players)
    );
  });
});

/* creation de nouvelle room */
function createdRoom(player) {
  const room = {
    id: roomId(),
    plateau: createZeroMatrix(player.nb_Squares),
    players: [],
  };

  room.plateau = positionPionStart(room.plateau, 1);
  console.log(room.plateau);
  player.roomId = room.id;

  room.players.push(player);

  rooms.push(room);

  return room;
}
/* pour generer un id unique pour chaque nouvelle room */
function roomId() {
  return Math.random().toString(36).substr(2, 9);
}

function createZeroMatrix(n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}

function positionPionStart(plateau, num) {
  switch (num) {
    case 1:
      plateau[0][Math.floor(plateau.length / 2)] = num;
      break;
    case 2:
      plateau[plateau.length - 1][Math.floor(plateau.length / 2)] = num;
      break;
    case 3:
      plateau[Math.floor(plateau.length / 2)][0] = num;
      break;
    case 4:
      plateau[Math.floor(plateau.length / 2)][plateau.length - 1] = num;
      break;
  }
  return plateau;
}

// Démarrage du serveur
server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
