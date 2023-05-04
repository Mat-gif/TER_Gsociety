const {Coord} = require("./Pion");

class Arbitre {

    constructor(pions, walls,param) {
        this.param = param
        /*pions = {socketId:Pion(socket,coord(x,y)),...}*/
        this.pions=pions
        /*walls = {type:[],...}*/
        this.walls=walls
    }

    //recup les cells en +-1
    findCells(socketId, myCell){
        let possibleCells = [new Coord(myCell.coord.x-1,myCell.coord.y),
                                        new Coord(myCell.coord.x,myCell.coord.y-1),
                                        new Coord(myCell.coord.x+1,myCell.coord.y),
                                        new Coord(myCell.coord.x,myCell.coord.y+1)]
        return possibleCells;
    }

    //test si cellule valide pour déplacement et retourne liste cells valides
    checkCells(socketId){
        let myCell = this.pions[socketId]
        let checkingCells =this.findCells(socketId,myCell)

        console.log(checkingCells)

        //on retire les coords des cells qui ne sont pas dans le plateau
        checkingCells = checkingCells.filter(c => c.x > -1 && c.y > -1 && c.x < this.param.nb_Squares && c.y < this.param.nb_Squares)

        console.log(checkingCells)

        //on test pour chaque pions s'il est sur une cell possible
        // this.pions.forEach(p => checkingCells = checkingCells.filter(c => c.x !== p.coord.x && c.y !==p.coord.y))

        for (const key of Object.keys(this.pions)) {
            const pion = this.pions[key];
            // Faites quelque chose avec chaque pion
            checkingCells = checkingCells.filter(c => c.x !== pion.coord.x || c.y !==pion.coord.y)

        }

        console.log(checkingCells)


        console.log(this.walls)
        //on test si barriere entre cell actuelle et cells possibles
        if (!this.walls.length) this.validCells = checkingCells; //////////////////
        else{
            checkingCells.forEach((c,index) => {

                if((myCell.coord.y-c.y) === 0 ){// horizontale
                    let wallH = this.walls["H"]
                    if((myCell.coord.x-c.x) < 0 ){ // gauche
                        if(wallH.find(w => w.coord.x-1 === myCell.x && w.coord.y === myCell.y)){// si une barriere est en travers de notre route , sur ma route oui
                            checkingCells.splice(index, 1); // On enlève la barrière
                        }
                    }else { // droite
                        if(wallH.find(w => w.coord.x === myCell.x && w.coord.y === myCell.y)){// si une barriere est en travers de notre route , sur ma route oui
                            checkingCells.splice(index, 1); // On enlève la barrière
                        }
                    }
                }else{ // verticale
                    let wallV = this.walls["V"]
                    if((myCell.coord.y-c.y) < 0 ){ // haut
                        if(wallV.find(w => w.coord.x === myCell.x && w.coord.y-1 === myCell.y)){// si une barriere est en travers de notre route , sur ma route oui
                            checkingCells.splice(index, 1); // On enlève la barrière
                        }
                    }else { // bas
                        if(wallV.find(w => w.coord.x === myCell.x && w.coord.y === myCell.y)){// si une barriere est en travers de notre route , sur ma route oui
                            checkingCells.splice(index, 1); // On enlève la barrière
                        }
                    }
                }
            })
            this.validCells = checkingCells;

            console.log(checkingCells)

        }
    }

}

module.exports = Arbitre;