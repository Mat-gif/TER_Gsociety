//* 1. Création  de la classe joueur
export class Player {
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
    this.currentPlayer = player;
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
    return this.currentPlayer.Playernext.currentPlayer;
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
