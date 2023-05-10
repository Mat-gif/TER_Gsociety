/*npm install express */
/* npm run build */
/* node index.js*/

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const ListeRoom = require('./models/ListeRoom');
const ConnectionPlayer = require('./models/ConnectionPlayer');
require('./models/Tour');
// Utiliser des fichiers statiques à partir du répertoire 'public'

app.use(express.static('../vue-client/dist'));
// app.use(express.static('./views'));


// Initialisation de la liste de salon
const rooms = new ListeRoom();

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);
    let room = {}; // initialisation du salon vide
    const connection = new ConnectionPlayer(); // Creer une instance pour gerer la connexion

    /*  CONNEXION D'UN JOUEUR  */
    socket.on('playerData', (player, game) => {
        console.log(`[playerData] ${player.roomId}`);

        /*  CREER UNE NOUVELLE ROOM  */
        if (!player.roomId)
        {
            room = connection.createRoom(rooms,player,game)
            io.emit('room id', room.id)

        }
        /*  REJOINDRE UNE ROOM  */
        else
        {
            room = connection.joinRoom(rooms,player)
            io.emit('list rooms', rooms.roomsDispo() );
        }
        /* AJOUTER LE SOCKET DU PLAYER AU SALON */
        socket.join(room.id);
        /* info quand autre joueurs rejoints le salon uniquement a un socket*/
        io.to(room.id).emit('join room', room.id);
        io.to(room.id).emit('list users', room.players);


        /* A FAIRE QUAND IL EXISTE AU MOINS UN SALON DE JEU */
        if (!rooms.isEmpty())
        {     /* DEBUT DE LA PARTIE */
            if (room.sizePlayers() === room.info.nb_Players) {
                // console.log("-----------------------------------")
                // console.log(room.initGame)
                // console.log("-----------------------------------")
                io.to(room.id).emit('start game', room);
            }
        }

    });



    socket.on('game',(roomID) => {
        console.log(`[game] ${socket.id}`);
        const room = rooms.findRoom(roomID);
        if(socket.id === room.tour.currentPlayer.currentPlayer.socketId) {
            room.startTurn(room.tour.currentPlayer.currentPlayer.socketId) // o
            io.to(room.tour.currentPlayer.currentPlayer.socketId).emit('my turn', true);
            io.to(room.tour.currentPlayer.currentPlayer.socketId).emit('cells checked', room.arbitre.validCells);
        }

        socket.on('testBar',(roomID,bar1,bar2) => {
            // console.log(bar1)
            // console.log(bar2)
            const room = rooms.findRoom(roomID);
            let res = room.arbitre.testValidBar(bar1,bar2)
            console.log("VALID BAR ??")
            console.log(res)
            if(res){
                room.addBarriere(socket.id,bar1,bar2)
            }

            io.to(socket.id).emit('valid Bar', res);

        })

        socket.on('nextplayer',(roomID) => {

            // console.log(`[nextplayer] ${socket.id}`);
            // const room = rooms.findRoom(roomID);
            // room.tour.changerJoueurActif()
            //
            // room.startTurn(room.tour.currentPlayer.currentPlayer.socketId) // o
            //
            // io.to(room.tour.currentPlayer.currentPlayer.socketId).emit('my turn', true);
            //
            // io.to(room.tour.currentPlayer.currentPlayer.socketId).emit('cells checked', room.arbitre.validCells);
            //
            // io.to(room.id).except(room.tour.currentPlayer.currentPlayer.socketId).emit('my turn', false);
        })





        socket.on('coord',(roomID,coord) => {
            const room = rooms.findRoom(roomID);
            // console.log(coord)
            let isWin = room.updateCoordPion(socket.id,coord)
            let sendCoord = {id:socket.id, coord:coord}

            // console.log(sendCoord)
            io.to(room.id).emit('change', sendCoord);



            // io.to(room.id).except(socket.id).emit('change', sendCoord);

        //########################################################################

            if(!isWin) {
                console.log(`[nextplayer] ${socket.id}`);
                // const room = rooms.findRoom(roomID);
                room.tour.changerJoueurActif()

                room.startTurn(room.tour.currentPlayer.currentPlayer.socketId) // o

                io.to(room.tour.currentPlayer.currentPlayer.socketId).emit('my turn', true);

                io.to(room.tour.currentPlayer.currentPlayer.socketId).emit('cells checked', room.arbitre.validCells);

                io.to(room.id).except(room.tour.currentPlayer.currentPlayer.socketId).emit('my turn', false);
            }else{
                io.to(room.id).emit('my turn', false);
                io.to(room.id).emit('winner',socket.id);
            }

        })
    })

    socket.on('deserter', ({roomId,host}) => {
        console.log(`[disconnect] ${socket.id} `);
        rooms.disconnection(socket.id)
        // console.log(rooms);
        io.emit('list rooms', rooms.roomsDispo());

        if(!host) {
            const room = rooms.findRoom(roomId);
            io.to(roomId).emit('list users', room.players);
        }
    });

    /* OBTENIR LA LISTE DES JOUEURS DANS UN SALON */
    socket.on('get users', (roomID) => {
        // console.log("-------------------------------")
        // console.log(roomID)
        // console.log("-------------------------------")
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
        // console.log(rooms);
        io.emit('list rooms', rooms.roomsDispo());

    });
    socket.on("message", (data) => {
        socket.broadcast.emit("message recu", data);
    });
    socket.on("typing", (data) => {
        const username = data.username;
        socket.broadcast.emit("typing", { username : data.username }); });


    socket.on("stop typing", () => {
        socket.broadcast.emit("stop typing");
    });
});

// Démarrage du serveur
server.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});

