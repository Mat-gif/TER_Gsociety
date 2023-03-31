const PlayerLinked = require('./PlayerLinked');

class ListePlayerLinked {
    constructor({nb_Players}) {
        this.listePlayerLinked = new Array(nb_Players);
    }

    addPlayerLinked(player) {
        this.listePlayerLinked[this.size()] = new PlayerLinked(player);
        if(this.size() === this.listePlayerLinked.length) {
            this.addLink();
        }
    }

    size() {
        let nombreElementsDefinis = 0;
        for (let i = 0; i < this.listePlayerLinked.length; i++) {
            if (this.listePlayerLinked[i] !== undefined) {
                nombreElementsDefinis++;
            }
        }
        return nombreElementsDefinis;
    }

    addLink() {
        const length = this.listePlayerLinked.length;
        let prevPlayer = this.listePlayerLinked[length - 1];
        for (let i = 0; i < length; i++) {
            const currentPlayer = this.listePlayerLinked[i];
            currentPlayer.playerPrev = prevPlayer.currentPlayer;
            prevPlayer.playernext = currentPlayer.currentPlayer;
            prevPlayer = currentPlayer;
        }
        this.listePlayerLinked[0].playerPrev = prevPlayer.currentPlayer;
        prevPlayer.playernext = this.listePlayerLinked[0].currentPlayer;
    }
}

module.exports = ListePlayerLinked;
