/*npm instal express */
/* npm run build */
/* node server.js*/

const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const  init = require('./utilitaire/Initialisation_partie');

// Utiliser des fichiers statiques à partir du répertoire 'public'
app.use(express.static('dist'));


let rooms = [];

io.on('connection', (socket) => {
  console.log(`[connection] ${socket.id}`);


  /*  connection d'un client */
  socket.on('playerData', (player, game) => {
    console.log(`[playerData] ${player.username}`);
    let room = null;

    /* creation d'une nouvelle room*/
    if (!player.roomId) {
      room = init.createdRoom(player, game, rooms);
      console.log(`[create room] - ${room.id} - ${player.username}`);
      io.emit('room id', room.id)
    } else { /* j'ajoute le player dans la room */
      room = rooms.find(r => r.id === player.roomId);
      if (room === undefined) {
        return;
      }
      /*on ajoute le joueur dans la room */
      room.players.push({ player });
      init.positionPionStart(room.plateau, room.players.length,player)
      init.colorPlayer(player.socketId, room.players.length,room)
      console.log(room.plateau)
      io.emit('list rooms', rooms.filter(r => r.players.length < r.info.nb_Players));
    }


    socket.join(room.id);

    /* info quand autre joueurs rejoints le salon uniquement a un socket*/
    io.to(socket.id).emit('join room', room.id);
    /* debut de la partie */
    if (room.players.length === room.info.nb_Players) {
      io.to(room.id).emit('start game', room);
    }
  });

  socket.on('get users', (roomID) => {
    const room = rooms.find(r => r.id === roomID);
    io.to(roomID).emit('list users', room.players);
  });

  /* récuperation des liste des socket disponibles */
  socket.on('get rooms', () => {
    io.to(socket.id).emit('list rooms', rooms.filter(r => r.players.length < r.info.nb_Players));
  });






  /* Deconnexion : on supprimer la room  */
  socket.on('disconnect', () => {
    console.log(`[disconnect] ${socket.id} `);
    let room = null;

    rooms.forEach(r => {
      r.players.forEach(p => {
        if (p.socketId === socket.id) {
          if(p.host){
            room = r;
            rooms = rooms.filter(r => r !== room);
          }else {
            const index = r.players.indexOf(p);
            r.players.splice(index, 1);
          }
        }
      });
    });

    io.emit('list rooms', rooms.filter(r => r.players.length < r.info.nb_Players));
  });



});



// Démarrage du serveur
server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

