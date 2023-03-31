//* 2. Création de la classe joueur chainé
class PlayerLinked {
    constructor(player) {
        this.playerPrev = null;
        this.currentPlayer = player;
        this.playernext = null;
    }
}

module.exports = PlayerLinked;