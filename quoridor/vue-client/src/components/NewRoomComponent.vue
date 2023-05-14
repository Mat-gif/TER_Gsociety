


<template>
<!--      <div>-->
<!--        <input type="text" v-model="player.username">-->
<!--        <button @click="createRoom">Créer une nouvelle salle</button>-->
<!--      </div>-->

    <div class="overlay"  v-if="revele">  </div>
    <div class="bloc-modale" v-if="revele">

        <div v-if="state=== 'initGame'" class="container">
            <div class="inputies" >
                <label for="username">Nom :</label>
                <input type="text" id="username" v-model="player.username" placeholder="your username"/>

            </div>
            <div >
                <div class="inputies">
                    <label for="nbPlayersInput">Nombre de joueurs : </label>
                    <div>
                        <div>
                        <input type="radio" v-model="game.nb_Players" id="twoPlayers" name="twoPlayers" :value="parseInt(2)" checked>
                        <label for="twoPlayers"> 2 joueurs </label>
                        </div>
                        <div>
                        <input type="radio" v-model="game.nb_Players" id="fourPlayers" name="fourPlayers" :value="parseInt(4)">
                        <label for="fourPlayers"> 4 joueurs </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="inputies">
                <label for="nbSquares">Nombre cellules : </label>
                <div>
                    <div>
                <input type="radio" v-model="game.nb_Squares" id="septCells" name="septCells" :value="parseInt(7)" >
                <label for="septCells"> 7 cellules </label>
                    </div>
                    <div>
                <input type="radio" v-model="game.nb_Squares" id="nineCells" name="nineCells" :value="parseInt(9)">
                <label for="nineCells"> 9 cellules </label>
                    </div>
                    <div>
                <input type="radio" v-model="game.nb_Squares" id="elevenCells" name="elevenCells" :value="parseInt(11)" >
                <label for="elevenCells"> 11 cellules </label>
                    </div>
                    <div>
                <input type="radio" v-model="game.nb_Squares" id="treizeCells" name="treizeCells" :value="parseInt(13)">
                <label for="treizeCells"> 13 cellules </label>
                    </div>
                </div>
            </div>
            <div class="inputies">
                <label for="nbWallsInput">Nombre de barrières:</label>
                <div>
                    <input v-model.number="game.nb_Walls" type="range" id="nbWalls" name="nbWalls" :min="parseInt(3)" :max="parseInt(10)" class="custom-range" >
                    <p style="text-align: center">{{game.nb_Walls}}</p>
                </div>

<!--                <input v-model.number="game.nb_Walls" type="range" id="nbWalls" name="nbWalls" :min="parseInt(3)" :max="parseInt(10)">-->
            </div>




            <button class="pointer btn" @click="createRoom" >Creer la partie</button>


        </div>
        <button v-on:click="toggleModale" class="btn-closei btn btn-danger"  v-if="state=== 'initGame'">X</button>
        <button   v-on:click="toggleModale"  @click="deserter" class="btn-closei btn btn-danger" v-if="state=== 'wait'" >Quitter</button>


        <ListeUserComponent v-if="state=== 'wait'" :roomID="player.roomId" :socket="socket" />
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
          state: 'initGame'
      }
    },
      components:{
          ListeUserComponent,
      },
      mounted() {
          // Exécute la fonction `showMessage` chaque fois que `isVisible` passe à `true`
          this.$watch("state",  (newValue) => {
              if (newValue === "wait") {
                  this.socket.off("room id");
              }
          })
      },
    methods: {
      createRoom() {
          this.game.new_nb_Walls= this.game.nb_Walls;
          this.player.barLeft= this.game.nb_Walls;
        // J'initialise les paramètres du joueur Hote de la partie
        this.player.isHost(this.socket.id)
        // J'envoie au serveur le joueur pour l'ajouter au salon
        this.socket.emit('playerData', this.player, this.game );

        // Permet d'émettre au composant "parent" les information concernant le salon
        this.socket.on('room id', (roomId) => {
              this.player.roomId = roomId;
              this.state = 'wait';
              this.$emit('event-roomId', {roomId: roomId, player: this.player, game : this.game});

            });

        console.log(this.player);
      },
        deserter(){
          console.log('deserter')
          this.socket.emit('deserter', this.player)
            this.state= 'initGame';
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
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    background: #333363;
    border: 2px solid #0b5ed7;
}
input[type=text] {
  padding-left: 13px;
    font-size: 12px;

}
input[type=radio]{
    font-size: 23px;
    background: red;
}
input{
    outline: none;
}
input::placeholder{
    padding-left: 8px;
    text-align: center;
    font-size: 1rem;
}
.inputies{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.pointer{
    display: flex;
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 200;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin-left: 25%;
    height: 50px;
    padding-bottom: 2px;
    background: #0B0B0B;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    color: #0b5ed7;
}
input[type=range] {
    width: 100%;
    height: 25px;
    border-radius: 5px;
    -webkit-appearance: none;
    background: #333363;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 40px;
    border-radius: 5px;
    background: #0b5ed7;
    cursor: pointer;
    position: relative;
}

</style>
  