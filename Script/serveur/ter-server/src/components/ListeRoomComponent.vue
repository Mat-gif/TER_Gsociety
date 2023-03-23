<template>
  
    <div>
      <h2>Liste des salons disponibles </h2>
      <ul id="room-list">
        <li v-for="room in rooms" :key="room.id">{{ room.id }}</li>
      </ul>
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
        rooms : []
      }
    },
    created() {
      // Envoyer une demande de mise à jour de la liste des rooms au serveur
      this.socket.emit('get rooms',(this.roomID));

      this.socket.on('list rooms', (room) => {
        // Mettre à jour les données des rooms
        this.rooms = room;
      });
  
    
    }
}
  </script>
  