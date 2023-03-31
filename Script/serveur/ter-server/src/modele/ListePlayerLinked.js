const PlayerLinked = require('./PlayerLinked');

class ListePlayerLinked {
    constructor({nb_Players}) {
        this.tailleMax = nb_Players
        this.listePlayerLinked = null;
    }

    addPlayerLinked(players) {
        const playerLinked1 = new PlayerLinked(players[0]);
        const playerLinked2 = new PlayerLinked(players[1]);

        playerLinked1.playernext = playerLinked2;
        //playerLinked2.playernext = playerLinked1;
        this.listePlayerLinked = [playerLinked1,playerLinked2]

    }



    addLink() {
        for (let i = 0; i <   this.tailleMax ; i++)
        {
            if (i ===   this.tailleMax-1)
            {
                this.listePlayerLinked[i].playernext =  this.listePlayerLinked[0];
            }
            else
            {
                this.listePlayerLinked[i].playernext =  this.listePlayerLinked[i+1];
            }
        }
    }
}

module.exports = ListePlayerLinked;
