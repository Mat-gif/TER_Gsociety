<template>
      <div>
        <input type="text" v-model="player.username">
        <button @click="createRoom">Créer une nouvelle salle</button>
      </div>
</template>
  
  <script>
  
  export default {
    props: {
    socket: {
      required: true
    }
  },
    data() {
      return {
        player: {
          host: false,
          roomId : null,
          username: "",
          socketId : "",
          turn: false,
          color: null,
          positionStart:null,
          win: false
        },
        game : {
          nb_Players: 2,
          nb_Squares: 9,
          nb_Walls: 5
        }
      }
    },
    methods: {
      createRoom() {
        this.player.host = true;
        this.player.turn = true;
        this.player.socketId = this.socket.id;
        this.socket.emit('playerData', this.player, this.game );
        this.socket.on('room id', (roomId) => this.$emit('event-roomId', { roomId: roomId, socketId:this.socket.id}));


        console.log(this.player);
      }
    }
  }
  </script>
  