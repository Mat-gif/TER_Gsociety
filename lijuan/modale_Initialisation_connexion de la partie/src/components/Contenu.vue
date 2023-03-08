<template>
    <div class="container my-5">


    <!--lire la valuer de revele et utiliser la méthode toggleModale-->
    <creer v-bind:revele="reveleCreer" v-bind:toggleModale="toggleCreer"></creer>
    <rejoindre v-bind:revele="reveleRejoindre" v-bind:toggleModale="toggleRejoindre"></rejoindre>
    <regles v-bind:revele="reveleRegles" v-bind:toggleModale="toggleRegles"></regles>

    <!--créer un boutton ouvrir la modale, click le boutton en utilisant la méthode toggleModale-->
    <div v-on:click="toggleCreer" class="btn btn-success">Créer une partie</div>
    <div v-on:click="toggleRejoindre" class="btn btn-success">Rejoindre une partie</div>
    <div v-on:click="toggleRegles" class="btn btn-success">Regles</div>
    </div>
   
</template>

<script>
    import Creer from './CreerPartie.vue'
    import Rejoindre from './RejoindrePartie.vue'
    import Regles from './Regles.vue'

    export default{
        name: 'Contenu',
        data(){
            return{
                // donner la valeur de revele
                reveleCreer:false,
                reveleRejoindre:false,
                reveleRegles:false
            }
        },
        components:{
            'creer': Creer,
            'rejoindre': Rejoindre,
            'regles' : Regles

        },
        methods:{
            // créer la methode toggleModale
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
    }
</script>