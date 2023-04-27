<template>
<!--      <div>-->
<!--        <input type="text" v-model="player.username">-->
<!--        <input type="text" v-model="player.roomId">-->
<!--        <button @click="joinRoom">Rejoindre un salon</button>-->
<!--      </div>-->

  <!--mon div container, objet globale-->
  <!-- si bloc modale est égale la valeur de revele, la valeur par defaul est false-->
    <div class="overlay"  v-if="revele">  </div>
    <div class="bloc-modale" v-if="revele">


        <!-- <h1 class="mb-5">Quoridor</h1>-->
        <!-- -->

        <!-- le boutton pour fermer le modale-->
        <button v-on:click="toggleModale"
                class="btn-closei btn btn-danger">X</button>

<!--        <div >-->
<!--            <ul>-->
<!--                <li>-->
<!--                    <span>Nom de partie</span>-->
<!--                    <span>X/MAX</span>-->
<!--                    <span>NbBarrier</span>-->
<!--                    <button class="pointer" >rejoindre</button>-->
<!--                </li>-->
<!--            </ul>-->

<!--        </div>-->
    <div v-if="!created">
        <div>
            <label for="username">nom :</label>
            <input type="text" id="username" v-model="player.username" />
        </div>
        <button @click="validateName" class="pointer btn btn-success" >Rejoindre un salon</button>
    </div>
        <ListeRoomComponent  v-if="created" :socket="socket" :player="player" @event-roomId="setRoomId"/>


    </div>
</template>
  
  <script>

  import {Player} from '@/models/Player';
  import ListeRoomComponent from './ListeRoomComponent.vue';
  import NewRoomComponent from "@/components/NewRoomComponent.vue";
  import ListeUserComponent from "@/components/ListeUserComponent.vue";
  import PlateauComponent from "@/components/PlateauComponent.vue";
  import Regles from "@/components/Regles.vue";

  export default {
    props: ['revele','toggleModale','socket'],
    data() {
      return {
        player: new Player(),
        created: false,
      }
    },
      components: {
          ListeRoomComponent,
      },
    methods: {
      validateName(){
          // J'initialise les paramètres du joueur qui rejoint une partie
          this.player.socketId = this.socket.id;

          this.created=true;
      },
        setRoomId(payload) {
            this.player.roomId = payload.roomId
          this.socket.emit('playerData', this.player);

            this.$emit('event-roomId', { roomId:  payload.roomId, player: this.player});
            console.log("[Join] : "+payload.roomId);
            console.log("[Join] : "+this.player.socketId);
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