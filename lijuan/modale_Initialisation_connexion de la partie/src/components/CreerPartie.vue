<template>
  <div class="bloc-modale" v-if="revele">
<!--    <div class="overlay" v-on:click="toggleModale"></div>-->
      <button v-on:click="toggleModale" class="btn-closei btn btn-danger">X</button>
      <div>
        <label for="nbPlayersInput">Number of players:</label>
        <input type="text" id="nbPlayersInput" v-model="game.nb_Players" />
      </div>
      <div>
        <label for="nbWallsInput">Number of walls:</label>
        <input type="text" id="nbWallsInput" v-model="game.nb_Walls" />
      </div>

    <div> {{game}}</div>
  </div>
</template>

<script>

import {Player} from '@/modele/Player';
import {Game} from '@/modele/Game';
export default{
    name :'Creer',
    props:['revele','toggleModale'],
  data() {
    return {
      player: new Player(),
      game: new Game(),
    }
  },
  

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
    .overlay{
      /*background : rgba(0, 0, 0, 0.5);*/
        position: fixed;
        display: hidden;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

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