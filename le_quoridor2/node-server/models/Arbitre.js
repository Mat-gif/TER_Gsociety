//TODO : test deplacement si on bloque un pion adverse pour 1 tour (cas du bout du tunnel)

const {Coord, Barriere} = require("./Pion");

class Arbitre {

    validCells = []
    validWalls = []

    constructor(pions, walls,param) {
        this.param = param
        /*pions = {socketId:Pion(socket,coord(x,y)),...}*/
        this.pions=pions
        /*walls = {type:[],...}*/
        this.walls=walls
    }

    checkMoves(socketId){
        let cellPion = this.pions[socketId]
        this.validCells = this.adjacentValidCells(cellPion)
        // this.validWalls = this.validWallsPos()
        console.log(this.validCells)
    }

    //recup les cells en +-1 de la cell ou se trouve le pion du joueur à qui c'est le tour
    findCells(myCell){
        return [new Coord(myCell.coord.x - 1, myCell.coord.y),
            new Coord(myCell.coord.x, myCell.coord.y - 1),
            new Coord(myCell.coord.x + 1, myCell.coord.y),
            new Coord(myCell.coord.x, myCell.coord.y + 1)];
    }

    //test si cellules adjacentes valides pour déplacement et retourne liste cells valides après les test
    adjacentValidCells(cell){
        let myCell = cell
        let checkingCells =this.findCells(myCell)

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
            console.log(checkingCells)
        }
        return checkingCells;
    }

    checkBar(){
        let listePion = this.pions
        let isValid = true

        //On va verifier pour chaque pion qu il ne sera pas bloque par le placement de la barriere
        for (let key in this.pions){  //ici key = socket
            if(!this.testVictoire(p.coord)){
                isValid = false
            }
        }

        return isValid

    }

    testVictoire(p){
        //liste qui contient les cells non testées atteignables par les pions
        let cellsATester = []

        //On récupère les positions à tester qui sont les cellules valides adjacentes à la cellule testée comme non-gagnante
        cellsATester += this.adjacentValidCells(p) //on ajouter à cellsAtester les cellules valides adjacentes à tester
        while(true) ///////
        return true
    }

    validWallsPos() {
        const typeWall = ["H","V"]

        //Pour chaque type de mur (H ou V)
        for (let i = 0; i < types.length; i++) {
            const type = types[i];

            //On copie la liste de mur existant et on ajoute un mur en i, j s'il n'y est pas déjà
            for(let i = 0; i < this.game.nb_Squares-1; i++) {
                for (let j = 0; j < this.game.nb_Squares - 1; j++) {
                    let newWallsList = this.walls[type]
                    if(true){ //TODO si mur pas déjà dans la liste
                        //on ajoute le mur en fonction de H et V car les coord de la 2e partie du mur est différente
                        if (type === "H") {
                            newWallsList += new Barriere(new Coord(i, j), new Coord(i + 1, j), type);
                        } else {
                            newWallsList += new Barriere(new Coord(i, j), new Coord(i, j + 1), type);
                        }
                    }
                    //TODO ensuite, faire liste de mur de 'lautre type + liste de mur de ce type newWallList et TEST VALIDE
                }
            }


        }
        return [];
    }
}

module.exports = Arbitre;