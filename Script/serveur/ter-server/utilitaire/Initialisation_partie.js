// module.js

const init = {
    createdRoom: function (player,game,rooms){
        const room =
            {
                id: this.roomId(),
                info : game,
                plateau: this.createZeroMatrix(player.nb_Squares),
                players: []
            }
        room.plateau= this.positionPionStart(room.plateau,1);
        console.log(room.plateau);
        player.roomId = room.id;

        room.players.push(player);

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
    positionPionStart : function (plateau,num){
        switch (num) {
            case 1:
                plateau[0][Math.floor(plateau.length/2)] = num;
                break;
            case 2:
                plateau[plateau.length-1][Math.floor(plateau.length/2)] = num;
                break;
            case 3:
                plateau[Math.floor(plateau.length/2)][0] = num;
                break;
            case 4:
                plateau[Math.floor(plateau.length/2)][plateau.length-1] = num;
                break;
        }
        return plateau;
    }

};

export default init;