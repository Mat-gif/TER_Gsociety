const ListePlayerLinked = require('./ListePlayerLinked');
const Tour = require("./Tour");
const {Pion,Barriere,Coord} = require("./Pion");
const Arbitre = require("./Arbitre");
class Room {

    constructor( game ) {
        console.log(game)
        this.id = Math.random().toString(36).substr(2,9);
        this.info = game;
        this.players = [] ;
        this.initGame = [];
        this.listePlayerLinked = new ListePlayerLinked(game);
        this.tour = new Tour();
        this.pions= {}
        this.barrieres= {"V":[],"H":[]}

        // this.barrieres["V"].push(new Barriere(new Coord(3, 0, "V")));
        // this.barrieres["H"].push(new Barriere(new Coord(4, 0, "H")));
        // this.barrieres["V"].push(new Barriere(new Coord(3, 7, "V")));
        // // this.walls["V"].push(new Barriere(new Coord(3, 8, "V")));
        // this.barrieres["V"].push(new Barriere(new Coord(4, 7, "V")));
        // this.barrieres["V"].push(new Barriere(new Coord(4, 8, "V")));
        // this.barrieres["H"].push(new Barriere(new Coord(4, 6, "H")));
        // this.barrieres["H"].push(new Barriere(new Coord(3, 6, "H")));
        // this.barrieres["H"].push(new Barriere(new Coord(4, 5, "H")));
    }

    updateCoordPion(socketId,coord){
        // console.log(coord)
        // console.log(this.pions[socketId])

        if(this.pions[socketId].testVict==="y-"){
            if(this.pions[socketId].coord.y - coord.y < 0) this.pions[socketId].score = this.pions[socketId].score-1;
            else if(this.pions[socketId].coord.y - coord.y > 0) this.pions[socketId].score = this.pions[socketId].score+1;
        }else if(this.pions[socketId].testVict==="y+"){
            if(this.pions[socketId].coord.y - coord.y < 0) this.pions[socketId].score = this.pions[socketId].score+1;
            else if(this.pions[socketId].coord.y - coord.y > 0) this.pions[socketId].score = this.pions[socketId].score-1;
        }else if(this.pions[socketId].testVict==="x-"){
            if(this.pions[socketId].coord.x - coord.x < 0) this.pions[socketId].score = this.pions[socketId].score-1;
            else if(this.pions[socketId].coord.x - coord.x > 0) this.pions[socketId].score = this.pions[socketId].score+1;
        }else if(this.pions[socketId].testVict==="x+") {
            if (this.pions[socketId].coord.x - coord.x < 0) this.pions[socketId].score = this.pions[socketId].score + 1;
            else if (this.pions[socketId].coord.x - coord.x > 0) this.pions[socketId].score = this.pions[socketId].score - 1;
        }

        this.pions[socketId].coord.x = coord.x
        this.pions[socketId].coord.y = coord.y

        console.log(`[Score Victoire] ${socketId} : ${this.pions[socketId].score}`)
        if(this.pions[socketId].score===0) return true;
        return false
    }
    startTurn(socketId){
        this.arbitre = null
        this.arbitre = new Arbitre(this.pions, this.barrieres, this.info)
        this.arbitre.checkMoves(socketId)
    }
    addPlayer(player){
        // console.log(player)
        this.players.push(player)

        this.positionPionStart(this.info ,this.sizePlayers(), player)
        // this.plateau =  this.positionPionStart( this.plateau, this.sizePlayers(), player );
        this.initGame.push(this.paramPlayers( player, this.sizePlayers()) );

        if (this.sizePlayers() === this.info.nb_Players) {
            this.listePlayerLinked.addPlayerLinked(this.players)
            this.tour.initTour(this.listePlayerLinked)
            // console.log(this.listePlayerLinked.listePlayerLinked)
        }

        console.log(`[room] ${ player.username } ajouté a la room : ${ this.id }`);
    }

    enoughtBar(socketId){
        let enough = false
        this.players.forEach(p => {
            if(p.socketId===socketId){
                console.log(p.barLeft)
                if(p.barLeft > 0) { enough = true}
            }
        })
        return enough
    }
    addBarriere(socketId,bar1,bar2){
        this.barrieres[bar1.name].push(new Barriere(new Coord(bar1.x1, bar1.y1),socketId));
        this.barrieres[bar2.name].push(new Barriere(new Coord(bar2.x1, bar2.y1),socketId));
        this.players.forEach((p,index) => {
            if(p.socketId===socketId){
                this.players[index].barLeft = this.players[index].barLeft - 1
            }
        })
    }
    sizePlayers(){return this.players.length}

    isEmpty(){return this.sizePlayers()===0}

    positionPionStart(  {nb_Squares, nb_Walls},num, player ){
        // let listeBarrieres = []
        // for (let i=0; i< nb_Walls*2 ; i++){
        //     listeBarrieres.push(new Barriere(player.socketId, new Coord(null,null), null));
        // }

        // this.barrieres[player.socketId] = listeBarrieres;
        switch (num) {
            case 1:
                player.positionStart = {x: Math.floor(nb_Squares/2), y:0}
                this.pions[player.socketId] = new Pion("y-",nb_Squares-1,player.socketId, new Coord(player.positionStart.x,player.positionStart.y))
                break;
            case 2:
                player.positionStart = {x: Math.floor(nb_Squares/2), y:nb_Squares-1}
                this.pions[player.socketId] = new Pion("y+",nb_Squares-1,player.socketId, new Coord(player.positionStart.x,player.positionStart.y))
                break;
            case 3:
                player.positionStart = {x: 0, y:Math.floor(nb_Squares/2)}
                this.pions[player.socketId] = new Pion("x-",nb_Squares-1,player.socketId, new Coord(player.positionStart.x,player.positionStart.y))
                break;
            case 4:
                player.positionStart = {x: nb_Squares-1, y:Math.floor(nb_Squares/2)}
                this.pions[player.socketId] = new Pion("x+",nb_Squares-1,player.socketId, new Coord(player.positionStart.x,player.positionStart.y))
                break;
        }
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