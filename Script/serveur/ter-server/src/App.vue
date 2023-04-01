<template>
  <h1 v-if="myTurn" style="color: red">{{myTurn}}</h1>
  <NewRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <JoinRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <ListeRoomComponent  v-if="!playGame" :socket="socket"/>
  <ListeUserComponent v-if="roomId && !playGame" :roomID="roomId" :socket="socket"/>
  <PlateauComponent v-if="playGame" @event-turn="changeturn" :myTurn="myTurn"  :color="color" :nbSquares="nbSquares" :myInitGame="myInitGame" :otherInitGame="otherInitGame" />
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
        playGame : false,
        color: null,
        nbSquares:null,
        myInitGame:null,
        otherInitGame:[],
        myTurn:false,
        start:false
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
      this.start =true
      this.socket.emit('game', this.roomId);
      initGame.forEach(element => {
        if( element.socketId === this.socket.id)
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


        this.socket.on("my turn", (turn) => {
          this.myTurn = turn
          console.log("my turn "+ this.myTurn)
        })






  },
  methods: {
        // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
        setRoomId(payload) {
            this.roomId = payload.roomId
            console.log("[App.vue] : "+this.roomId)
        },
        changeturn(payload){

              this.myTurn=payload.myTurn
              this.socket.emit('nextplayer',this.roomId);
              console.log("payload "+ this.myTurn)
        }
    }
};
</script>


