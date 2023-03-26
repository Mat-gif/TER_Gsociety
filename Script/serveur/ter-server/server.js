/*npm instal express */
/* npm run build */
/* node server.js*/

const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);

const Room = require('./modele/Room');
const ListeRoom = require('./modele/ListeRoom');

// Utiliser des fichiers statiques à partir du répertoire 'public'
app.use(express.static('dist'));

// Initialisation de la liste de salon
const rooms = new ListeRoom();

io.on('connection', (socket) => {
      console.log(`[connection] ${socket.id}`);
      let room = {}; // initialisation de la variable avec une valeur vide

      /*  connection d'un client */
      socket.on('playerData', (player, game) => {
            console.log(`[playerData] ${player.username}`);

            /* creation d'une nouvelle room*/
            if (!player.roomId) {
                  room = new Room(player, game); // donner une valeur de constructeur de classe
                  rooms.addRoom(room); // ajout de la room a la liste
                  io.emit('room id', room.id)
            } else { /* j'ajoute le player dans la room */
                  room = rooms.findRoom(player.roomId);
                  if (room === undefined) {
                        return;
                  }
                  /*on ajoute le joueur dans la room */
                  room.addPlayer(player)
                  io.emit('list rooms', rooms.roomsDispo() );
            }

            socket.join(room.id);
            /* info quand autre joueurs rejoints le salon uniquement a un socket*/
            io.to(socket.id).emit('join room', room.id);

            if (!rooms.isEmpty())
            {
                  /* debut de la partie */
                  if (room.sizePlayers() === room.info.nb_Players) {
                        console.log(room)
                        io.to(room.id).emit('start game', room);
                  }
            }
      });

    /* récuperation des joueurs sans un salon */
      socket.on('get users', (roomID) => {
            const room = rooms.findRoom(roomID);
            io.to(roomID).emit('list users', room.players);
      });

      /* récuperation des liste des socket disponibles */
      socket.on('get rooms', () => {
            io.to(socket.id).emit('list rooms', rooms.roomsDispo());
      });

      /* Deconnexion : on supprimer la room  */
      socket.on('disconnect', () => {
            console.log(`[disconnect] ${socket.id} `);
            rooms.disconnection(socket.id) // gestion des deconnexion
            io.emit('list rooms', rooms.roomsDispo());
      });
});

// Démarrage du serveur
server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

