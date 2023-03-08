<template>
    <div class="container my-5">


    <!--lire la valuer de revele et utiliser la méthode toggleModale-->
    <creer v-bind:revele="reveleCreer" v-bind:toggleModale="toggleCreer"></creer>
    <rejoindre v-bind:revele="reveleRejoindre" v-bind:toggleModale="toggleRejoindre"></rejoindre>

    <!--créer un boutton ouvrir la modale, click le boutton en utilisant la méthode toggleModale-->
    <div v-on:click="toggleCreer" class="btn btn-success">Créer une partie</div>
    <div v-on:click="toggleRejoindre" class="btn btn-success">Rejoindre une partie</div>
    </div>
   
</template>

<script>
    import Creer from './CreerPartie.vue'
    import Rejoindre from './RejoindrePartie.vue'

    export default{
        name: 'Contenu',
        data(){
            return{
                // donner la valeur de revele
                reveleCreer:false,
                reveleRejoindre:false
            }
        },
        components:{
            'creer': Creer,
            'rejoindre': Rejoindre

        },
        methods:{
            // créer la methode toggleModale
            toggleCreer:function(){
                this.reveleCreer = !this.reveleCreer
            },
            toggleRejoindre:function(){
                this.reveleRejoindre = !this.reveleRejoindre
            }
        }
    }
</script>