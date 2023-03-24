<template>
  <NewRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <JoinRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <ListeRoomComponent  v-if="!playGame" :socket="socket"/>
  <ListeUserComponent v-if="roomId && !playGame" :roomID="roomId" :socket="socket"/>
  <PlateauComponent v-if="playGame" :color="color" :nbsquares="nb_Squares" />
</template>

<script>
// probleme lors du chargement de <PlateauComponent> !!!:

import io from 'socket.io-client';
import NewRoomComponent from './components/NewRoomComponent.vue';
import JoinRoomComponent from './components/JoinRoomComponent.vue';
import ListeRoomComponent from './components/ListeRoomComponent.vue';
import ListeUserComponent from './components/ListeUserComponent.vue';
import PlateauComponent from './components/PlateauComponent.vue';

export default {
  data() {
      return {
        socket : io(),
        roomId : null,
        socketId : null,
        playGame : false,
        color: null,
        nb_Squares:null,
      }
    },
  components: {
    NewRoomComponent,
    JoinRoomComponent,
    ListeRoomComponent,
    ListeUserComponent,
    PlateauComponent

  },
  created() {
    this.socket.on('start game', (nb_Squares, color) => {
      alert("Début du game !")
      this.nb_Squares = nb_Squares;
      this.color = color;
      this.playGame = true;
    });


  },
  methods: {
        // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
        setRoomId(payload) {
          console.log(payload)
            this.roomId = payload.roomId
            this.socketId = payload.socketId
            console.log("app : "+this.roomId)
        }
    }
};
</script>


