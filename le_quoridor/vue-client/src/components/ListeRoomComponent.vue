<!--TODO envoie d'alerte à tous les sockets connectés qu'une personne à quitter la partie window.update  😁-->


<template>
  
    <div>
      <h2>Liste des salons disponibles</h2>
      <ul id="room-list">
        <li v-for="room in rooms" :key="room.id">
            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                <div class="card-header"><button @click="joinRoom(room.id)" class="pointer btn btn-success" >Join</button></div>
                <div class="card-body">
                    <h5 class="card-title">{{room.id}}</h5>
                    <p class="card-text">{{room.info}}</p>
                </div>
            </div>
<!--            <span class="">{{room.id}}</span>-->
<!--            <span class="mt-3 p-5">{{room.info}}</span>-->
<!--            <button @click="joinRoom(room.id)" class="pointer btn btn-success" >Join</button>-->
        </li>
      </ul>
    </div>
  </template>
  
  <script>

  export default {
    props:["socket","player"],
    data() {
      return {
        rooms : [],
          roomId : null
      }
    },
    created() {
      // Envoyer une demande de mise à jour de la liste des rooms au serveur
      this.socket.emit('get rooms',(this.roomId));
      console.log(this.rooms)
      this.socket.on('list rooms', (room) => {
        // Mettre à jour les données des rooms
        this.rooms = room;
      });

    },
      methods:{
          joinRoom(id) {
              this.roomId=id;
              // Permet d'émettre au composant "parent" les information concernant le salon
              console.log("[List] : "+this.roomId);
              this.$emit('event-roomId', { roomId:  this.roomId , state: "waitPlayers"});

          }
      }
}
  </script>
  