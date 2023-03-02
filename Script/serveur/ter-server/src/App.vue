<template>
  <NewRoomComponent :socket="socket" @event-roomId="setRoomId"/>
  <JoinRoomComponent :socket="socket" @event-roomId="setRoomId"/>
  <ListeRoomComponent :socket="socket"/>
  <ListeUserComponent v-if="roomId" :roomID="roomId" :socket="socket"/>
</template>

<script>
import io from 'socket.io-client';
import NewRoomComponent from './components/NewRoomComponent.vue';
import JoinRoomComponent from './components/JoinRoomComponent.vue';
import ListeRoomComponent from './components/ListeRoomComponent.vue';
import ListeUserComponent from './components/ListeUserComponent.vue';
export default {
  data() {
      return {
        socket : io(),
        roomId : null,
      }
    },
  components: {
    NewRoomComponent,
    JoinRoomComponent,
    ListeRoomComponent,
    ListeUserComponent

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


