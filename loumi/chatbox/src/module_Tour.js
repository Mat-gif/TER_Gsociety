

//* 1. Création  de la classe joueur
export   class Player {
  constructor(username, host, socket, roomId, positionStart) {
    this.name = username;
    this.host = host;
    this.socket = socket;
    this.roomId = roomId;
    this.position = positionStart;
  }

  // classe des Joueurs chainé


}
//* 2. Création de la classe joueur chainé
export class PlayerLinked extends Player {
  constructor(username, host, socket, roomId, positionStart, nextPlayer) {
    super(username, host, socket, roomId, positionStart);
    this.nextPlayer = nextPlayer;
  }
}


//* 3. Création de la classe tour
export class Tour {
  constructor(player) {
    this.player = player;
  }

}





  

