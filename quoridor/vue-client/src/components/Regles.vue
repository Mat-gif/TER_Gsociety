<template>

    <!--mon div container, objet globale-->
    <!-- si bloc modale est égale la valeur de revele, la valeur par defaul est false-->
    <div class="overlay"  v-if="revele">  </div>

    <div class="bloc-modale" v-if="revele">


    <!-- <h1 class="mb-5">Quoridor</h1>-->
   <!-- -->
       <!-- le boutton pour fermer le modale-->
        <button v-on:click="toggleModale" 
        class="btn-closei btn btn-danger">X</button>


        <!-- un bloc  qui contient mes colonnes  -->
    <div class="row">
        <!--la première qui contient le boutton "créer une partie"  -->
        <div class="col">
            <button class="btn btn-primary">
                A
            </button>
        </div>
        <!--la deuxième clonne qui contient le boutton "rejoindre une partie"  -->
        <div class="col">
            <button class="btn btn-info">
              BLABKAS
            </button>
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