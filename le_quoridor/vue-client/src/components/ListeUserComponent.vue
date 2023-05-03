<template>
  
    <div>
      <h2>Liste des joueurs en attentes</h2>
        <div class="spinner-border"></div>
      <ul id="user-list">
        <li v-for="player in players" :key="player.username">{{ player.username }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
    socket: {
      required: true
    },
    roomID: undefined
  },
    data() {
      return {
        players : []
      }
    },
    mounted() {
      // Envoyer une demande de mise à jour de la liste des rooms au serveur
      if(this.roomID){

        this.socket.emit('get users', this.roomID);

        this.socket.on('list users', (player) => {
          // Mettre à jour les données des rooms
          this.players = player;


        });
      }
      
      
    }
}
  </script>
  