// module.js

module.exports = {
    createdRoom: function (player,game,rooms){
        const room =
            {
                id: this.roomId(),
                info : game,
                plateau: this.createZeroMatrix(game.nb_Squares),
                players: [],
                colors :  []
            }
        this.positionPionStart(room.plateau,1,player);
        console.log(room.plateau);
        player.roomId = room.id;

        room.players.push(player);
        this.colorPlayer(player.socketId, room.players.length,room)
        rooms.push(room);

        return room;
    },
    roomId : function (){
        return Math.random().toString(36).substr(2,9);
    },
    createZeroMatrix : function (n) {
        var matrix = [];
        for (var i = 0; i < n; i++) {
            var row = [];
            for (var j = 0; j < n; j++) {
                row.push(0);
            }
            matrix.push(row);
        }
        return matrix;
    },
    positionPionStart : function (plateau,num,player){
        switch (num) {
            case 1:
                plateau[0][Math.floor(plateau.length/2)] = num;
                player.positionStart = {x: Math.floor(plateau.length/2), y:0}
                break;
            case 2:
                plateau[plateau.length-1][Math.floor(plateau.length/2)] = num;
                player.positionStart = {x: Math.floor(plateau.length/2), y:plateau.length-1}
                break;
            case 3:
                plateau[Math.floor(plateau.length/2)][0] = num;
                player.positionStart = {x: 0, y:Math.floor(plateau.length/2)}
                break;
            case 4:
                plateau[Math.floor(plateau.length/2)][plateau.length-1] = num;
                player.positionStart = {x: plateau.length-1, y:Math.floor(plateau.length/2)}
                break;
        }
    },
    colorPlayer: function (socketId, num, room){
        switch (num) {
            case 1:
                room.colors.push({socketId: socketId, color:"red"});
                break;
            case 2:
                room.colors.push({socketId: socketId, color:"green"});
                break;
            case 3:
                room.colors.push({socketId: socketId, color:"yellow"});
                break;
            case 4:
                room.colors.push({socketId: socketId, color:"purple"});
                break;
        }
    }

};
