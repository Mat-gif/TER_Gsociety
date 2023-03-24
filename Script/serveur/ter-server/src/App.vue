<template>
  <NewRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <JoinRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId"/>
  <ListeRoomComponent  v-if="!playGame" :socket="socket"/>
  <ListeUserComponent v-if="roomId && !playGame" :roomID="roomId" :socket="socket"/>
  <PlateauComponent v-if="playGame" />
</template>

<script>
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
        playGame : false
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
    this.socket.on('start game', (data) => {
      alert(data);
      this.playGame = true;
    });


  },
  methods: {
        // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
        setRoomId(payload) {
            this.roomId = payload.roomId
            console.log("app : "+this.roomId)
        }
    }
};
</script>


