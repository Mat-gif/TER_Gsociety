<template>

    <div class="overlay"  v-if="revele">  </div>
    <div class="bloc-modale" v-if="revele">


        <button v-on:click="toggleModale" class="btn-closei btn btn-danger" v-if="state!== 'waitPlayers'">X</button>
        <button  v-on:click="toggleModale"  @click="deserter" class="btn-closei btn btn-danger" v-if="state=== 'waitPlayers'" >Quitter</button>

    <div v-if="state=== 'setUsername'" class="user">
        <div >
            <label for="username">nom :</label>
            <input type="text" id="username" v-model="player.username" />
        </div>
        <button @click="validateName" class="pointer btn " >Rejoindre</button>
    </div>
        <ListeRoomComponent  v-if="state=== 'setRoom'"  :socket="socket" :player="player" @event-roomId="setRoomId"/>

        <ListeUserComponent v-if="state=== 'waitPlayers'" :roomID="player.roomId" :socket="socket" />


    </div>
</template>
  
  <script>

  import {Player} from '@/models/Player';
  import ListeRoomComponent from './ListeRoomComponent.vue';
  import ListeUserComponent from './ListeUserComponent.vue';


  export default {
    props: ['revele','toggleModale','socket'],
    data() {
      return {
        player: new Player(),
        state: "setUsername",
          game:null
      }
    },
      components: {
          ListeRoomComponent,
          ListeUserComponent
      },
    methods: {
      validateName(){
          // J'initialise les paramètres du joueur qui rejoint une partie
          this.player.socketId = this.socket.id;

          this.state="setRoom";
      },
        setRoomId(payload) {
            this.player.barLeft = payload.game.nb_Walls
            this.player.roomId = payload.roomId
            this.socket.emit('playerData', this.player);
            this.state=payload.state;
            this.game=payload.game

            this.$emit('event-roomId', { roomId:  payload.roomId, player: this.player, game : this.game});
            console.log("[Join] : "+payload.roomId);
            console.log("[Join] : "+this.player.socketId);
        },
        deserter(){
            console.log('deserter')
            this.socket.emit('deserter', this.player)
            this.state= 'setUsername'
            this.player= new Player();
        }
    }
  }
  </script>

<style scoped>
.bloc-modale{
    position: fixed;
    top:10%;
    bottom: 10%;
    left:10%;
    right: 0;
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0B0B0B;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    flex-direction: column;
    color: #0c63e4;
    text-transform: capitalize;

}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* transparent black */
    /*z-index: -10; !* ensure it is above other elements *!*/
}

.modale{
    padding: 50px;
    position: fixed;
    top: 30%;
}

.btn-closei{
    position: absolute;
    right: 10px;
    background: #0B0B0B;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    color: #0b5ed7;
    /* width: 20%;*/
    top: 10px;

    font-size: large;
    /*border: 3px solid red;*/
}

label{
    font-weight: bold;
    font-size: 22px;
    line-height:2;
}
input{
    color: white;
    height: 50px;
    background: #333363;
    border: 2px solid #0b5ed7;
}
input[type=text] {
    padding-left: 13px;
    font-size: 12px;

}


.pointer{
    display: flex;
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin-left: 25%;
    height: 50px;
    padding-bottom: 2px;
    background: #0B0B0B;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    color: #0b5ed7;
}

.user{
    display: flex;
    flex-direction: column;
    gap: 60px;
    justify-content: center;
}
</style>