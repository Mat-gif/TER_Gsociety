<template>
<!--      <div>-->
<!--        <input type="text" v-model="player.username">-->
<!--        <button @click="createRoom">Créer une nouvelle salle</button>-->
<!--      </div>-->

    <div class="overlay"  v-if="revele">  </div>
    <div class="bloc-modale" v-if="revele">

        <div v-if="!created">
            <div >
                <label for="username">nom :</label>
                <input type="text" id="username" v-model="player.username" />

            </div>
            <div >
                <label for="nbPlayersInput">Number of players:</label>
                <input type="number" id="nbPlayersInput" v-model="game.nb_Players" />

            </div>
            <div >
                <label for="nbSquares">Nombre cellules:</label>
                <input type="number" id="nbSquares" v-model="game.nb_Squares" />

            </div>
            <div>
                <label for="nbWallsInput">Number of walls:</label>
                <input type="number" id="nbWallsInput" v-model="game.nb_Walls" />
            </div>
            <button class="pointer btn btn-success" @click="createRoom" >creer</button>

            <br>
            <div> {{game}}</div><br>
            <div> {{player}}</div>
        </div>
        <button v-on:click="toggleModale" class="btn-closei btn btn-danger">X</button>

            <ListeUserComponent v-if="created" :roomID="player.roomId" :socket="socket" />
    </div>


</template>
  
  <script>
  import {Player} from '@/models/Player';
  import {Game} from '@/models/Game';
  import ListeUserComponent from './ListeUserComponent.vue';
  export default {
      props:['revele','toggleModale','socket'],
    data() {
      return {
        player: new Player(),
        game: new Game(),
          created: false,
      }
    },
      components:{
          ListeUserComponent,
      },
    methods: {
      createRoom() {
          this.created = true;
        // J'initialise les paramètres du joueur Hote de la partie
        this.player.isHost(this.socket.id)

        // J'envoie au serveur le joueur pour l'ajouter au salon
        this.socket.emit('playerData', this.player, this.game );

        // Permet d'émettre au composant "parent" les information concernant le salon
        this.socket.on('room id', (roomId) => {
              this.player.roomId = roomId;
              this.$emit('event-roomId', {roomId: roomId, player: this.player});
            });

        console.log(this.player);
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
    background:white ;

    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    flex-direction: column;

}
/*.overlay{*/
/*    !*background : rgba(0, 0, 0, 0.5);*!*/
/*    position: fixed;*/
/*    display: hidden;*/
/*    top: 0;*/
/*    bottom: 0;*/
/*    left: 0;*/
/*    right: 0;*/

/*}*/
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
    color: white;
    background-color: red;
    /* width: 20%;*/
    top: 10px;

    font-size: large;
    /*border: 3px solid red;*/
}

</style>
  