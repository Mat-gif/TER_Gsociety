<template>
    <div class="container" >
        <h2>{{username}}</h2>
        <div class="progress">
<!--            <div class="progress-bar" :style="monsterBarStyles(player.nb_Walls_restants,player.nb_Walls)">{{player.nb_Walls_restants}} barriere(s) restante(s)</div>-->
            <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth }" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ new_nb_Walls }} / {{nb_Walls}} Murs </div>


        </div>
    </div>
</template>

<script>

export default {
    name: "infoBarriere",
    props:["username","nb_Walls","new_nb_Walls"],
    data(){
        return{
            myValue: this.new_nb_Walls*100/this.nb_Walls
        }
    },
    computed: {
        progressBarValue() {
            return this.myValue;
        },
        progressBarWidth() {
            return `${this.myValue}%`;
        }
    }
}



</script>

<style scoped>

</style>