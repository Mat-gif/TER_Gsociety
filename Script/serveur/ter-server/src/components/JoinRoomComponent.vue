<template>
      <div>
        <input type="text" v-model="player.username">
        <input type="text" v-model="player.roomId">
        <button @click="joinRoom">Rejoindre un salon</button>
      </div>
</template>
  
  <script>

  const {Player} = require('./Player');
  export default {
    props: {
    socket: {
      required: true
    }
  },
    data() {
      return {
        player: new Player(),
      }
    },
    methods: {
      joinRoom() {
        // J'initialise les paramètres du joueur qui rejoint une partie
        this.player.socketId = this.socket.id;

        // J'envoie au serveur le joueur pour l'ajouter au salon
        this.socket.emit('playerData', this.player);

        // Permet d'émettre au composant "parent" les information concernant le salon
        this.$emit('event-roomId', { roomId:  this.player.roomId });


        console.log(this.player);
      }
    }
  }
  </script>
  