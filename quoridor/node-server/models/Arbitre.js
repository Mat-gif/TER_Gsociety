//TODO : test deplacement si on bloque un pion adverse pour 1 tour (cas du bout du tunnel)

const {Coord, Barriere, Pion} = require("./Pion");

class Arbitre {

    validCells = []

    constructor(pions, walls, param) {
        this.param = param
        /*pions = {socketId:Pion(socket,coord(x,y)),...}*/
        this.pions = pions
        /*walls = {type:[],...}*/
        this.walls = walls
    }

    checkMoves(socketId) {
        let cellPion = this.pions[socketId]
        this.validCells = this.adjacentValidCells(cellPion)
        // this.validWalls = this.validWallsPos()
        // console.log(this.validCells)
    }

    //recup les cells en +-1 de la cell ou se trouve le pion du joueur à qui c'est le tour
    findCells(myCell) {
        return [new Coord(myCell.coord.x - 1, myCell.coord.y),
            new Coord(myCell.coord.x, myCell.coord.y - 1),
            new Coord(myCell.coord.x + 1, myCell.coord.y),
            new Coord(myCell.coord.x, myCell.coord.y + 1)];
    }





    //test si cellules adjacentes valides pour déplacement et retourne liste cells valides après les test
    adjacentValidCells(cell) {
        let myCell = cell
        let checkingCells = this.findCells(myCell)

        // console.log(checkingCells)

        //on retire les coords des cells qui ne sont pas dans le plateau
        checkingCells = checkingCells.filter(c => c.x > -1 && c.y > -1 && c.x < this.param.nb_Squares && c.y < this.param.nb_Squares)

        // console.log(checkingCells)

        //on test pour chaque pions s'il est sur une cell possible
        // this.pions.forEach(p => checkingCells = checkingCells.filter(c => c.x !== p.coord.x && c.y !==p.coord.y))

        for (const key of Object.keys(this.pions)) {
            const pion = this.pions[key];
            // Faites quelque chose avec chaque pion
            checkingCells = checkingCells.filter(c => c.x !== pion.coord.x || c.y !== pion.coord.y)

        }
        // console.log(checkingCells)
        // console.log(this.walls)
        //on test si barriere entre cell actuelle et cells possibles


        // console.log(this.walls)

        //Si aucune barrière verticale ni horizontale
        if (this.walls["H"].length ===0 && this.walls["V"]===0) this.validCells = checkingCells; //////////////////
        else {
            // console.log(checkingCells,checkingCells.length)
            // checkingCells.forEach((c, index) => {
            for (let indice = checkingCells.length - 1; indice >= 0; indice--) {
                let c = checkingCells[indice];


                if ((myCell.coord.y - c.y) === 0) {// horizontale
                    let wallV = this.walls["V"]

                    if ((myCell.coord.x - c.x) > 0) { // gauche

                        // console.log("-----gauche")
                        // console.log(wallV.find(w => w.coord.x  === myCell.coord.x- 1 && w.coord.y === myCell.coord.y))
                        if (wallV.find(w => w.coord.x  === myCell.coord.x- 1 && w.coord.y === myCell.coord.y)) {// si une barriere est en travers de notre route , sur ma route oui
                            // console.log("-----gauche splice")
                            checkingCells.splice(indice, 1); // On enlève la barrière
                        }
                    } else { // droite


                        // console.log("-----droite")
                        if (wallV.find(w => w.coord.x === myCell.coord.x && w.coord.y === myCell.coord.y)) {// si une barriere est en travers de notre route , sur ma route oui
                            // console.log("-----droite splice")
                            checkingCells.splice(indice, 1); // On enlève la barrière
                        }
                    }
                }

                if ((myCell.coord.x - c.x) === 0) { // verticale
                    let wallH = this.walls["H"]

                    // console.log(myCell)
                    // console.log(c)
                    if ((myCell.coord.y - c.y) > 0) { // haut


                        // console.log("haut")
                        // console.log(myCell)
                        // console.log(wallH.find(w => w.coord.x === myCell.coord.x && w.coord.y === myCell.coord.y- 1))
                        if (wallH.find(w => w.coord.x ===  myCell.coord.x && w.coord.y ===  myCell.coord.y-1)) {// si une barriere est en travers de notre route , sur ma route oui
                            checkingCells.splice(indice, 1); // On enlève la barrière
                        }
                    } else { // bas


                        // console.log("bas")
                        // console.log(myCell)
                        // console.log(wallH.find(w => w.coord.x === myCell.coord.x && w.coord.y === myCell.coord.y))
                        if (wallH.find(w => w.coord.x === myCell.coord.x && w.coord.y === myCell.coord.y)) {// si une barriere est en travers de notre route , sur ma route oui
                            checkingCells.splice(indice, 1); // On enlève la barrière
                        }
                    }
                }
            }

        }
        return checkingCells;
    }

    testValidBar(bar1, bar2, socket) {
        let placementOk = true
        const murs = this.walls

        let part1 = new Barriere(new Coord(bar1.x1, bar1.y1),socket)
        let part2 = new Barriere(new Coord(bar2.x1, bar2.y1),socket)

        for(let i = 0;i<murs[bar1.name].length;i++){


            if((part1.coord.x === murs[bar1.name][i].coord.x && part1.coord.y === murs[bar1.name][i].coord.y) || (part2.coord.x === murs[bar1.name][i].coord.x && part2.coord.y === murs[bar1.name][i].coord.y)) {
                placementOk = false
                console.log("déjà un mur)")
                return placementOk
            }
        }

        murs[bar1.name].push(part1);
        murs[bar2.name].push(part2);

        console.log(murs)

        //si la barrière que l'on veut placer entre en collision avec une autre barrière





        // console.log(this.walls)


        // const murs = Object.assign({}, this.walls);
        // murs["V"] = [...murs["V"], new Barriere(new Coord(3, 7, "V"))];
        // murs["V"] = [...murs["V"], new Barriere(new Coord(3, 8, "V"))];
        // murs["H"] = [...murs["H"], new Barriere(new Coord(4, 6, "H"))];
        // murs["H"] = [...murs["H"], new Barriere(new Coord(5, 6, "H"))];
        //
        // murs[bar1.name] = [...murs[bar1.name], new Barriere(new Coord(bar1.x1, bar1.y1, bar1.name))];
        // murs[bar2.name] = [...murs[bar2.name], new Barriere(new Coord(bar2.x1, bar2.y1, bar2.name))];
        // console.log(murs);
        for (const key of Object.keys(this.pions)) {
            // console.log(this.pions[key])
            // const pion = this.pions[key];
            const pion = new Pion(this.pions[key].testVict,this.pions[key].score,this.pions[key].socket,new Coord(this.pions[key].coord.x,this.pions[key].coord.y))
            // console.log(pion)
            let pionBlocked = true
            let cellsATester = this.adjacentValidCells(pion)
            let cellsTestee =[]
            // cellsATester.push(this.adjacentValidCells(pion))
            while (cellsATester.length!==0){
                if(pion.testVict==="y-"){
                    // console.log(cellsATester[0].y)
                    if(cellsATester[0].y===this.param.nb_Squares-1){
                        pionBlocked = false
                        cellsATester = []
                        break
                    }
                    else{
                        // console.log("else y-")
                        cellsTestee.push(cellsATester[0])
                        // console.log(cellsATester[0])
                        pion.coord.x = cellsATester[0].x
                        pion.coord.y = cellsATester[0].y
                        this.adjacentValidCells(pion).forEach(c=>{
                            if(!cellsTestee.includes(c)){ /////////////////////////////////:
                                cellsATester.push(c)
                            }
                        })
                        cellsATester.shift()
                    }
                }
                else if(pion.testVict==="y+"){
                    // console.log(cellsATester[0].y)
                    if(cellsATester[0].y===0){
                        pionBlocked = false
                        cellsATester = []
                        break
                    }
                    else{
                        // console.log("else y+")
                        cellsTestee.push(cellsATester[0])
                        pion.coord.x = cellsATester[0].x
                        pion.coord.y = cellsATester[0].y
                        this.adjacentValidCells(pion).forEach(c=>{
                            if(!cellsTestee.includes(c)){
                                cellsATester.push(c)
                            }
                        })
                        cellsATester.shift()
                    }
                }
                else if(pion.testVict==="x-"){
                    if(cellsATester[0].x===this.param.nb_Squares-1){
                        pionBlocked = false
                        cellsATester = []
                        break
                    }
                    else{
                        cellsTestee.push(cellsATester[0])
                        pion.coord.x = cellsATester[0].x
                        pion.coord.y = cellsATester[0].y
                        this.adjacentValidCells(pion).forEach(c=>{
                            if(!cellsTestee.includes(c)){
                                cellsATester.push(c)
                            }
                        })
                        cellsATester.shift()
                    }
                }
                else if(pion.testVict==="x+"){
                    if(cellsATester[0].x===0){
                        pionBlocked = false
                        cellsATester = []
                        break
                    }
                    else{
                        cellsTestee.push(cellsATester[0])
                        pion.coord.x = cellsATester[0].x
                        pion.coord.y = cellsATester[0].y
                        this.adjacentValidCells(pion).forEach(c=>{
                            if(!cellsTestee.includes(c)){
                                cellsATester.push(c)
                            }
                        })
                        cellsATester.shift()
                    }
                }

            }
            if(pionBlocked){placementOk=false;break}
        }

        const index1 = murs[bar1.name].indexOf(bar1);
        murs[bar1.name].splice(index1, 1);
        const index2 = murs[bar2.name].indexOf(bar2);
        murs[bar2.name].splice(index2, 1);

        // console.log(murs)
        return placementOk
    }
}

module.exports = Arbitre;