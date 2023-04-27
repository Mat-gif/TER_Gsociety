<template>
      <div>
        <input type="text" v-model="player.username">
        <button @click="createRoom">Créer une nouvelle salle</button>
      </div>
</template>
  
  <script>
  const {Player} = require('./Player');
  const {Game} = require('./Game');
  export default {
    props: {
    socket: {
      required: true
    }
  },
    data() {
      return {
        player: new Player(),
        game: new Game(),
      }
    },
    methods: {
      createRoom() {
        // J'initialise les paramètres du joueur Hote de la partie
        this.player.isHost(this.socket.id)

        // J'envoie au serveur le joueur pour l'ajouter au salon
        this.socket.emit('playerData', this.player, this.game );

        // Permet d'émettre au composant "parent" les information concernant le salon
        this.socket.on('room id', (roomId) => {
              this.player.roomId = roomId;
              this.$emit('event-roomId', {roomId: roomId});
            });

        console.log(this.player);
      }
    }
  }
  </script>
  