const PlayerLinked = require('./PlayerLinked');


class ListePlayerLinked {


    constructor({nb_Players}) {
        this.listePlayerLinked = Array(nb_Players);
    }

    addPlayerLinked(player){
        this.listePlayerLinked[this.size()] = new PlayerLinked(player);

        if(this.size() === this.listePlayerLinked.length)
        {
            this. addLink();
        }
    }

    size(){
        let nombreElementsDefinis = 0;
        for (let i = 0; i < this.listePlayerLinked.length; i++) {
            if (this.listePlayerLinked[i] !== undefined) {
                nombreElementsDefinis++;
            }
        }
        return nombreElementsDefinis; // Renvoie 2
    }

    addLink(){
        for (let i = 0; i < this.listePlayerLinked.length; i++)
        {
            if ( i === 0) {
                this.listePlayerLinked[i].Playernext =  this.listePlayerLinked[1];
                this.listePlayerLinked[i].playerPrev  =  this.listePlayerLinked[-1];
            }
            else if (i === this.listePlayerLinked.length-1) {
                this.listePlayerLinked[i].Playernext =  this.listePlayerLinked[0];
                this.listePlayerLinked[i].playerPrev  =  this.listePlayerLinked[i-1];
            }
            else {
                this.listePlayerLinked[i].Playernext =  this.listePlayerLinked[i+1];
                this.listePlayerLinked[i].playerPrev  =  this.listePlayerLinked[i-1];
            }

        }
    }


}

module.exports = ListePlayerLinked;