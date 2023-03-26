const Room = require("./Room");

class ConnectionPlayer {

    constructor() {
    }

    createRoom(rooms,player,game)
    {
        const room = new Room(player, game); // donner une valeur de constructeur de classe
        rooms.addRoom(room); // ajout de la room a la liste
        return room;
    }

    joinRoom(rooms,player)
    {
        const room = rooms.findRoom(player.roomId);
        if (room === undefined) {
            return ;
        }
        room.addPlayer(player)
        return room;
    }

}

module.exports = ConnectionPlayer;