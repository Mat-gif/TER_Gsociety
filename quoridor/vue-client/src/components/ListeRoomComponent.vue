<!--TODO envoie d'alerte à tous les sockets connectés qu'une personne à quitter la partie window.update  😁-->


<template>
    <div class="listeRoom">
      <h2>Salons disponibles</h2>
      <ul id="room-list" >
        <li v-for="room in rooms" :key="room.id" class="room row">
            <p><font-awesome-icon :icon="['fas', 'gamepad']" /> {{room.id}} </p>
            <p> <font-awesome-icon :icon="['fas', 'user']" /> {{room.info.nb_Players}}  </p>
            <p> <font-awesome-icon :icon="['fas', 'th-large']" /> {{room.info.nb_Squares}}x{{room.info.nb_Squares}}  </p>
            <p> <font-awesome-icon :icon="['fas', 'hand']" /> {{room.info.nb_Walls}}  </p>
            <button @click="joinRoom(room)" class="pointer btn " >Join</button>
<!--            <button @click="joinRoom(room.id,room.info)" class="pointer btn " >Join</button>-->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faUser,faThLarge, faHand, faGamepad } from '@fortawesome/free-solid-svg-icons'
  import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";



  library.add(faUser,faThLarge,faHand,faGamepad )
  export default {
      components: {FontAwesomeIcon},
    props:["socket","player"],
    data() {
      return {
        rooms : [],
          roomId : null,
          game:null
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
          joinRoom(room) {
              console.log(room.id)
              this.roomId=room.id;
              this.game=room.info ;
              // Permet d'émettre au composant "parent" les information concernant le salon
              console.log("[List] : "+this.roomId);
              this.$emit('event-roomId', { roomId:  this.roomId , state: "waitPlayers", game: room.info});

          }
      }
}
  </script>
<style>
.listeRoom{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.room{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    background: #0B0B0B;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    color: #0c63e4;
    margin-bottom: 5px;
}
.row{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    list-style: none;
}
.pointer{

    text-transform: uppercase;
    font-size: 15px;
    font-weight: 400;
    width: 70%;
    margin-left: 25%;
    height: 30px;
    padding-bottom: 2px;
    background: #333363;
    /*box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;*/
    border: 2px solid #0b5ed7;
    color: #0b5ed7;
}

.room p{
    margin:auto;
}
</style>