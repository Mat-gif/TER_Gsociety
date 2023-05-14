<template>

    <!--mon div container, objet globale-->
    <!-- si bloc modale est égale la valeur de revele, la valeur par defaul est false-->
    <div class="overlay"  v-if="revele">  </div>

    <div class="bloc-modale" v-if="revele">


    <!-- <h1 class="mb-5">Quoridor</h1>-->
   <!-- -->
       <!-- le boutton pour fermer le modale-->
        <button v-on:click="toggleModale" 
        class="btn-closei">X</button>

    <div class="regle">
        <h1>Règles du jeu</h1>
        <div class="one">
            <h3>PION</h3>
            <img src="../assets/regle_deplacement.gif">
            <p>cliquez sur une cellule pour déplacer</p>
        </div>
        <div class="two">
            <h3>MUR</h3>
            <img src="../assets/regle_bar.gif">
            <p>cliquez entre les cellules placer</p>

        </div>
        <div class="three">
            <h3>VICTOIRE</h3>
            <img src="../assets/regle_victoire.gif">

            <p>atteignez le côté opposé</p>
        </div>

    </div>
       
   

</div>




</template>

<script>

export default{
    name :'Regles',
    props:['revele','toggleModale']

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
        z-index: 999;

    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* transparent black */
        /*z-index: -10; !* ensure it is above other elements *!*/
        z-index: 998;
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
    .regle {
        margin: 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        width: 100%
    }

    .one {
        margin : auto;
        grid-column: 1/2;
        grid-row: 1;
    }

    .two {
        margin : auto;
        grid-column: 2/3;
        grid-row: 1;
    }

    .three {
        margin : auto;
        grid-column: 3/4;
        grid-row: 1;
    }

    h3{
        margin-bottom: 30px;
        text-align: center;
    }
    p{
        margin-top: 30px;
        text-align: center;
    }
    img{
        display: block;
        margin : auto;
    }
</style>