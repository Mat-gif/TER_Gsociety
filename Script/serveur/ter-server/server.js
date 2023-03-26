/*npm instal express */
/* npm run build */
/* node server.js*/

const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const ListeRoom = require('./modele/ListeRoom');
const ConnectionPlayer = require('./modele/ConnectionPlayer');

// Utiliser des fichiers statiques à partir du répertoire 'public'
app.use(express.static('dist'));

// Initialisation de la liste de salon
const rooms = new ListeRoom();

io.on('connection', (socket) => {
      console.log(`[connection] ${socket.id}`);
      let room = {}; // initialisation du salon vide
      const connection = new ConnectionPlayer(); // Creer une instance pour gerer la connexion

      /*  CONNEXION D'UN JOUEUR  */
      socket.on('playerData', (player, game) => {
            console.log(`[playerData] ${player.username}`);

            /* CREER UNE NOUVELLE ROOM */
            if (!player.roomId)
            {
                  room = connection.createRoom(rooms,player,game)
                  io.emit('room id', room.id)
            }
            /* REJOINDRE UNE ROOM */
            else
            {
                  room = connection.joinRoom(rooms,player)
                  io.emit('list rooms', rooms.roomsDispo() );
            }

            /* AJOUTER LE SOCKET DU PLAYER AU SALON */
            socket.join(room.id);

            /* info quand autre joueurs rejoints le salon uniquement a un socket*/
            io.to(room.id).emit('join room', room.id);

            /* A FAIRE QUAND IL EXISTE AU MOINS UN SALON DE JEU */
            if (!rooms.isEmpty())
            {
                  /* DEBUT DE LA PARTIE */
                  if (room.sizePlayers() === room.info.nb_Players) {
                        console.log(room)
                        io.to(room.id).emit('start game', room);
                  }
            }
      });

      /* OBTENIR LA LISTE DES JOUEURS DANS UN SALON */
      socket.on('get users', (roomID) => {
            const room = rooms.findRoom(roomID);
            io.to(roomID).emit('list users', room.players);
      });

      /* OBTENIR LA LISTE DES SALONS DISPONIBLE */
      socket.on('get rooms', () => {
            io.to(socket.id).emit('list rooms', rooms.roomsDispo());
      });

      /* GESTION DECONNEXION JOUEUR  */
      socket.on('disconnect', () => {
            console.log(`[disconnect] ${socket.id} `);
            rooms.disconnection(socket.id)
            io.emit('list rooms', rooms.roomsDispo());
      });
});

// Démarrage du serveur
server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

