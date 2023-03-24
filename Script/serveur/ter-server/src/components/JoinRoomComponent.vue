<template>
      <div>
        <input type="text" v-model="player.username">
        <input type="text" v-model="player.roomId">
        <button @click="joinRoom">Rejoindre un salon</button>
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
          win: false
        },
      }
    },
    methods: {
      joinRoom() {
        this.player.socketId = this.socket.id;
        this.socket.emit('playerData', this.player);

        this.$emit('event-roomId', { roomId: this.player.roomId , socketId:this.socket.id });
        console.log(this.player);
      }
    }
  }
  </script>
  