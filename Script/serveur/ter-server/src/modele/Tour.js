//* 3. Création de la classe tour
class Tour {
    constructor(players) {
        this.players = players;
        this.currentPlayer = players.listePlayerLinked[0];
    }

    joueurSuivant() {
        if(this.currentPlayer.playernext === null){
            return this.players.listePlayerLinked[0];
        }
        return this.currentPlayer.playernext;
    }

    changerJoueurActif() {
        this.currentPlayer = this.joueurSuivant();
    }

    estFini() {
        // Vérifie si l'un des joueurs a atteint le bord opposé du plateau
        // si la position du joueur est supérieur ou égale à 8, le joueur a gagné ou la partie est terminée
        if (this.currentPlayer.positionEnd >= 8) {
            return true;
        }

        // Vérifie si l'un des joueurs n'a plus de murs
        for (let playerLinked of this.players) {
            if (playerLinked.murs === 0) {
                return true;
            }
        }

        // Si aucun des cas ci-dessus n'est vrai, le jeu n'est pas terminé
        return false;
    }
}


module.exports = Tour;
