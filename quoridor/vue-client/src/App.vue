<!--TODO : modale règle à gerer-->
<!--TODO : gerer les deplacements des pions -->

<template>



    <div class="template">
        <div class="one">
            <NewRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId" v-bind:revele="reveleCreer" v-bind:toggleModale="toggleCreer"/>
            <JoinRoomComponent v-if="!playGame" :socket="socket" @event-roomId="setRoomId" v-bind:revele="reveleRejoindre" v-bind:toggleModale="toggleRejoindre" />
            <regles v-bind:revele="reveleRegles" v-bind:toggleModale="toggleRegles"></regles>



                <div>
                    <img class="img1" src="./assets/quoridor_logo.gif" v-if="!playGame">
                </div>
                <div class="boutons">
                    <div  v-if="!playGame" v-on:click="toggleCreer" class="btn ">   Creer   </div>
                    <div  v-if="!playGame" v-on:click="toggleRejoindre" class="btn "> Rejoindre </div>
                </div>

            <div class="newContainer">
                <!--    alerte tours-->
                <div class="item2">
                    <div>
                        <img src="./assets/quoridor_logo.gif" v-if="playGame" style="width: 65%; margin: auto; margin-bottom: 40px; display: flex" >
                    </div>
                    <div>
                        <div class="popup" v-if="showPopup && this.winner===this.player.socketId">
                            <br>
                            <p>Je suis le super champion</p>
                        </div>
                        <div class="popupLoose" v-if="showPopup && this.winner!==this.player.socketId">
                            <br>
                        <p>Le super champion est :</p>
                            <p>{{this.winner}} </p>
                    </div>
                    </div>
                    <div class="turning">
                        <PlateauComponent :socket="socket" :roomId="roomId" v-if="playGame" @event-turn="changeturn" :myTurn="myTurn"  :color="color" :nbSquares="nbSquares" :nbBarriere="nbBarriere" :myInitGame="myInitGame" :otherInitGame="otherInitGame" :newPosition="newPosition"/>
                    </div>

                    <div  v-if="playGame && myTurn" class="alertmyturn">
                        <strong>A toi de jouer</strong>
                    </div>
                    <div  v-if="playGame && !myTurn" class="alertnotmyturn">
                        <strong>Ce n'est pas ton tour</strong>
                    </div>

                </div>

                <div class="item1">
                    <infoBarriere v-if="playGame" :username="player.username" :nb_-walls="game.nb_Walls" :socket="socket"></infoBarriere>
                </div>

            </div>


            <div class="game_rule">
                <div v-on:click="toggleRegles" class="btn">Regles</div>
            </div>

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
import chat from './components/chat.vue';
import infoBarriere from './components/infoBarriere.vue';


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
            game:null,
            showPopup: false,
            winner:null,
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
        chat,
        infoBarriere

    },
    created() {


        this.socket.on('start game', ({info, initGame}) => {

            // alert("Début du game !")
            this.nbSquares = info.nb_Squares;
            this.nbBarriere = info.nb_Walls;
            this.start =true
            console.log("[starrt game]"+ this.roomId)
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


        this.socket.on('winner',(socketId) => {

            this.winner = socketId

            this.showPopup = true
            setTimeout(() => {
                this.showPopup = false;
                location.reload(true); // ok c'est brutal mais tkt
            }, 10000);

        });


    },
    methods: {
        // Définit la méthode utilisée par le payload pour mettre à jour la propriété data
        setRoomId(payload) {
            this.player = payload.player;
            console.log("[App.vue] : "+this.player)
            this.roomId = payload.roomId
            console.log("[App.vue] : "+this.roomId)
            this.game = payload.game;
        },
        changeturn(payload){

            this.myTurn=payload.myTurn
            // this.socket.emit('nextplayer',this.roomId);
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
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
body{
    background: #0B0B0B;
    font-family: 'Press Start 2P', cursive;
    height: 100%;
}
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

.newContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}

.item1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-column: 1 / 1;
    grid-row: 1;
}

.item3 {
    grid-column: 2 / 1;
}

.item2 {
    grid-column: 3 / 2;
    grid-row: 1;
}


div .img1{
    margin-top: 20%;
    margin-left: 17.5%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /*animation: 1.5s ease-in   scaleMove;*/
}
@keyframes scaleMove {
    0%{
        /*transform: scale(1);*/
        transform: rotate(360deg);
    }
    50%{
        transform: scale(1.2);

    }
    100%{
        transform: scale(1.05);
    }

}
.boutons{
    display: flex;
    margin-top: 3%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    margin-left: 29%;
    gap: 5%;
}
.boutons div{
    width: 200px;
}
/*.boutons div:hover{*/
/*    transform: scale(1.2);*/
/*    transition: 1s;*/
/*    color: white;*/
/*}*/
.boutons div{
    padding-bottom: 2px;
    background: #0B0B0B;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    color: #0b5ed7;
}
.game_rule{
    margin-top: 20%;
}
.game_rule div{

    background: #0B0B0B;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    color: #0b5ed7;
}
.alertmyturn{
    margin : auto;
    text-align: center;
    width: 50%;
    padding: 10px;
    background: #0B0B0B;
    box-shadow: rgba(5, 137, 89, 0.35) 0px 5px 15px;
    border: 2px solid #01D58E;
    color: #01D58E;
    margin-top: 40px;
}
.alertnotmyturn{
    margin : auto;
    text-align: center;
    width: 50%;
    padding: 10px;
    background: #0B0B0B;
    box-shadow: rgba(121, 15, 194, 0.35) 0px 5px 15px;
    border: 2px solid #B85BF1;
    color: #B85BF1;
    margin-top: 40px;
}

.popup {
    height: 100px;
    width: 60%;
    text-align: center;
    position: relative;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1E1E1E;
    box-shadow: rgba(77, 150, 214, 0.8) 0px 5px 15px;
    border: 2px solid #0b5ed7;
    color: #0b5ed7;
}
.popupLoose {
    height: 100px;
    width: 60%;
    text-align: center;
    position: relative;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1E1E1E;
    box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid rgba(255, 0, 0, 0.35);
    color: rgba(255, 0, 0, 0.35);
}
.popup p{
    margin:auto;
}
</style>

