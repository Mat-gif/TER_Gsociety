<template>
  <NewRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <JoinRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <ListeRoomComponent  v-if="!playGame" :socket="socket"/>
  <ListeUserComponent v-if="roomId && !playGame" :roomID="roomId" :socket="socket"/>
  <PlateauComponent v-if="playGame" :color="color" :nbSquares="nbSquares" :myInitGame="myInitGame" :otherInitGame="otherInitGame" />
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
        nbSquares:null,
        myInitGame:null,
        otherInitGame:[],
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
    this.socket.on('start game', ({info, initGame}) => {
      alert("Début du game !")
      this.nbSquares = info.nb_Squares;
      initGame.forEach(element => {
        if( element.socketId === this.socketId)
        {
          this.myInitGame = element
        }
        else
        {
          this.otherInitGame.push(element)
        }
      })
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


