
<template>
  <!--    <h1>le quori(pompi)dor</h1>-->
    <div class="template">
<div class="one">
    <h1 v-if="myTurn" style="color: red">{{myTurn}}</h1>
    <!--lire la valuer de revele et utiliser la méthode toggleModale-->
    <NewRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId" v-bind:revele="reveleCreer" v-bind:toggleModale="toggleCreer"/>
    <JoinRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId" v-bind:revele="reveleRejoindre" v-bind:toggleModale="toggleRejoindre"/>
<!--    <ListeRoomComponent  v-if="!playGame" :socket="socket"/>-->
<!--    <ListeUserComponent v-if="roomId && !playGame" :roomID="roomId" :socket="socket"/>-->
    <regles v-bind:revele="reveleRegles" v-bind:toggleModale="toggleRegles"></regles>
    <!--  ====================================================================================
    =====================================================================================-->
    <!--créer un boutton ouvrir la modale, click le boutton en utilisant la méthode toggleModale-->

  <div class="boutons">
    <div  v-if="!playGame" v-on:click="toggleCreer" class="btn btn-success">Créer une partie</div>
    <div  v-if="!playGame" v-on:click="toggleRejoindre" class="btn btn-success">Rejoindre une partie</div>
  </div>
    <div class="game_rule">
    <div v-on:click="toggleRegles" class="btn btn-success">Regles</div>
    </div>
    <PlateauComponent v-if="playGame" @event-turn="changeturn" :myTurn="myTurn"  :color="color" :nbSquares="nbSquares" :nbBarriere="nbBarriere" :myInitGame="myInitGame" :otherInitGame="otherInitGame" :newPosition="newPosition"/>
</div>
    <div class="two">
        <chat :socket="socket" v-if="playGame" :username="player.username" :room-id="roomId"></chat>
    </div>
    </div>
</template>

<script>

// probleme lors du chargement de <PlateauComponent> !!!:

import io from 'socket.io-client';
import NewRoomComponent from './components/NewRoomComponent.vue';
import JoinRoomComponent from './components/JoinRoomComponent.vue';
import ListeRoomComponent from './components/ListeRoomComponent.vue';
import ListeUserComponent from './components/ListeUserComponent.vue';
import PlateauComponent from './components/PlateauComponent.vue';
import Regles from './components/Regles.vue';
import chat from './components/chat.vue'


export default {
    data() {
        return {
            player : null,
            socket : io(),
            roomId : null,
            playGame : false,
            color: null,
            nbSquares:null,
            nbBarriere:null,
            myInitGame:null,
            otherInitGame:[],
            myTurn:false,
            start:false,
            newPosition:null,

            // donner la valeur de revele
            reveleCreer:false,
            reveleRejoindre:false,
            reveleRegles:false
        }
    },
    components: {
        NewRoomComponent,
        JoinRoomComponent,
        ListeRoomComponent,
        ListeUserComponent,
        PlateauComponent,
        Regles,
        chat

    },
    created() {

        this.socket.on('start game', ({info, initGame}) => {
            alert("Début du game !")
            this.nbSquares = info.nb_Squares;
            this.nbBarriere = info.nb_Walls;
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



        this.socket.on("change", (coord) => {
            console.log(coord)
            this.newPosition=coord
        })





    },
    methods: {
        // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
        setRoomId(payload) {
            this.player = payload.player;
            console.log("[App.vue] : "+this.player)
            this.roomId = payload.roomId
            console.log("[App.vue] : "+this.roomId)
        },
        changeturn(payload){

            this.myTurn=payload.myTurn
            this.socket.emit('nextplayer',this.roomId);
            this.socket.emit('coord',this.roomId, payload.coord);
            console.log("payload "+ this.myTurn)
        },// créer la methode toggleModale
        toggleCreer:function(){
            this.reveleCreer = !this.reveleCreer
        },
        toggleRejoindre:function(){
            this.reveleRejoindre = !this.reveleRejoindre
        },
        toggleRegles:function(){
            this.reveleRegles = !this.reveleRegles
        }
    }
};
</script>
<style>
.template{
    margin: 20px ;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);

}
.one{
    grid-column: 1/2;
    grid-row: 1;

}
.two{
    grid-column: 2/3;
    grid-row: 1;
}
/*.boutons{*/
/*    display: flex;*/
/*    flex-direction: column;*/
/*    background: #1a1e21;*/
/*}*/
/*.game_rule{*/

/*}*/
</style>

