class Room {

    players = [];
    constructor( player, game ) {
        this.id = Math.random().toString(36).substr(2,9);
        this.info = game;
        this.plateau = this.positionPionStart(
            this.createZeroMatrix( game.nb_Squares ),
            1,
            player
        );
        this.setPlayers(player) ;
        this.initGame = [ this.colorPlayer( player.socketId, 1 ) ];
    }

    setPlayers(player) {
        this.players.push(player)
    }


    addPlayer(player){
        this.setPlayers(player)
        this.plateau =  this.positionPionStart( this.plateau, this.sizePlayers(), player )
        this.initGame.push(this.colorPlayer( player.socketId, this.sizePlayers()) )
        console.log(`--> ${ player.username } ajouté a la room : ${ this.id }`)
    }

    sizePlayers(){return this.players.length}

    isEmpty(){return this.sizePlayers()===0}

    //Pour creer une matrice vide
    createZeroMatrix(n){
        var matrix = [];
        for (var i = 0; i < n; i++)
        {
            var row = [];
            for (var j = 0; j < n; j++)
            {
                row.push(0);
            }
            matrix.push(row);
        }
        return matrix;
    }

    positionPionStart( plateau, num, player ){
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
        return plateau
    }

    colorPlayer(socketId, num){
        let out = null;
        switch (num) {
            case 1:
                out = {socketId: socketId, color:"red"};
                break;
            case 2:
                out ={socketId: socketId, color:"green"};
                break;
            case 3:
                out ={socketId: socketId, color:"yellow"};
                break;
            case 4:
                out ={socketId: socketId, color:"purple"};
                break;
        }
        return out
    }

    removePlayer(player)
    {
        const index = this.players.indexOf(player);
        this.players.splice(index, 1);
    }


}

module.exports = Room;