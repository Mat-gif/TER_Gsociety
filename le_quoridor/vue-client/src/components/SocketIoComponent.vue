<template>
  <div>
    <h1>TEST de socket.io</h1>
    <div>
      <input type="text" v-model="player.username">
      <button @click="createRoom">Créer une nouvelle salle</button>
    </div>
    <div>
      <input type="text" v-model="player.username">
      <input type="text" v-model="player.roomId">
      <button @click="joinRoom">Rejoindre un salon</button>
    </div>
  <div>
    <ul id="room-list">
      <li v-for="room in rooms" :key="room.id">{{ room.id }}</li>
    </ul>
  </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket : io(),
      player: {
        host: false,
        roomId : null,
        username: "",
        socketId : "",
        turn: false,
        win: false
      },
      rooms : []
    }
  },
  created() {
    this.socket.on('list rooms', (rooms) => {
      // Mettre à jour les données des rooms
      this.rooms = rooms;
    });

    // Envoyer une demande de mise à jour de la liste des rooms au serveur
    this.socket.emit('get rooms');
  },
  methods: {
    createRoom() {
      this.player.host = true;
      this.player.turn = true;
      this.player.socketId = this.socket.id;
      console.log(this.player);
      
      this.socket.emit('playerData', this.player);
    },
    joinRoom() {
      this.player.socketId = this.socket.id;
      console.log(this.player);
      this.socket.emit('playerData', this.player);
    }
  }
}
</script>
