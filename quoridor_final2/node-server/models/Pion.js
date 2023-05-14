class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Barriere {
    // constructor(socket, coord1, coord2, name) {
    //     this.socket = socket;
    //     this.coord1 = coord1;
    //     this.coord2 = coord2;
    //     this.name = name;
    // }
    constructor(coord, socketId) {
        this.coord = coord;
        // this.coord2 = coord2;
        this.socketId = socketId;
    }
}

class Pion {
    constructor(testVict,score, socket, coord) {
        this.testVict = testVict;
        this.score =score;
        this.socket = socket;
        this.coord = coord;
    }
}

module.exports = {Coord, Pion, Barriere}