

//* 1. Création  de la classe joueur
export   class Player {
  constructor(username, host, socket, roomId, positionStart) {
    this.name = username;
    this.host = host;
    this.socket = socket;
    this.roomId = roomId;
    this.position = positionStart;
  }



}
//* 2. Création de la classe joueur chainé
export class PlayerLinked {
  constructor(player) {
    this.playerPrev = null;
    this.player = player;
    this.Playernext = null;
  }
 
}


//* 3. Création de la classe tour
export class Tour {
  constructor(players, currentPlayer) {
    this.players = players;
    this.currentPlayer = currentPlayer;
  }

  joueurSuivant() {
    const index = this.players.indexOf(this.currentPlayer);
    return this.players[(index + 1) % this.players.length];
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
    for (let player of this.players) {
      if (joueur.murs.length === 0) {
        return true;
      }
    }
  
    // Si aucun des cas ci-dessus n'est vrai, le jeu n'est pas terminé
    return false;
  }
}





  

