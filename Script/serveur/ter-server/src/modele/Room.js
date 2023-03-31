const ListePlayerLinked = require('./ListePlayerLinked');
class Room {

    constructor( game ) {
        this.id = Math.random().toString(36).substr(2,9);
        this.info = game;
        this.plateau = this.createZeroMatrix( game.nb_Squares );
        this.players = [] ;
        this.initGame = [];
        this.listePlayerLinked = new ListePlayerLinked(game);
    }




    //this.initGame = [ this.colorPlayer( player.socketId, 1 ) ];



    addPlayer(player){
        this.players.push(player)

        this.plateau =  this.positionPionStart( this.plateau, this.sizePlayers(), player );
        this.initGame.push(this.paramPlayers( player, this.sizePlayers()) );
        if (this.sizePlayers() === this.info.nb_Players) {
            this.listePlayerLinked.addPlayerLinked(this.players)
            console.log(this.listePlayerLinked.listePlayerLinked)
        }

        console.log(`[room] ${ player.username } ajouté a la room : ${ this.id }`);
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

    paramPlayers({socketId,positionStart}, num){
        switch (num) {
            case 1: return {socketId: socketId, positionStart:positionStart, color:"red"};
            case 2: return {socketId: socketId, positionStart:positionStart, color:"green"};
            case 3: return {socketId: socketId, positionStart:positionStart, color:"yellow"};
            case 4: return {socketId: socketId, positionStart:positionStart, color:"purple"};
        }
    }

    removePlayer(player)
    {
        const index = this.players.indexOf(player);
        this.players.splice(index, 1);
    }


}

module.exports = Room;