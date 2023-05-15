<template>
  <div class="container">
      <div ref="plateau">
          <Background :width="width" :height="height" :layerBackground="layerBackground" :taille-grille="nbSquares"/>
          <Rect :roomId="roomId" :socket="socket" :width="width" :height="height" :layerCell="layerCell" :taille-grille="nbSquares"/>
          <BarrierEmpl :roomId="roomId" :socket="socket" :width="width" :height="height" :layerBarEmpl="layerBarEmpl" :taille-grille="nbSquares"/>
          <Pion :newPosition="newPosition" :myInitGame="myInitGame" :otherInitGame="otherInitGame" :width="width" :height="height" :layerPion="layerPion" :listeJoueur="listeJoueur" :taille-grille="nbSquares"/>
      </div>
  </div>
</template>

<script>
import Konva from 'konva';
import Background from "./jeu/background.vue";
import Rect from "./jeu/cellule.vue";
import Pion from "./jeu/circle.vue";
import BarrierEmpl from "./jeu/barriere_empl.vue";
import BarrierObj from "./jeu/barriere_obj.vue";


export default {
  name: 'PlateauComponent',
  data() {
      return {
          width : this.largeur,
          height :this.largeur,
          listeJoueur : [],
          layerBackground : null,
          layerCell : null,
          layerBarEmpl : null,
          layerBar : null,
          layerPion : null
      };
  },
  props: ["nbSquares","myInitGame","otherInitGame","myTurn","newPosition","nbBarriere","roomId","socket","largeur"],
  components:{
            Background,Rect,Pion,BarrierEmpl,BarrierObj
        },
    computed: {
        stage() {
            return this.$refs.stage;
        }
    },
    methods:{
        changeturn(payload){
            this.$emit('event-turn', payload);
        },
    },

    mounted(){
      this.listeJoueur.push([this.myInitGame.socketId,this.myInitGame.color]);
      this.otherInitGame.forEach(e => this.listeJoueur.push([e.socketId,e.color]));
      console.log("plateau joueurs : "+this.listeJoueur);
        const stage = new Konva.Stage({
            container: this.$refs.plateau,
            width: this.width,
            height: this.height,
        });



        //Création du calque de fond
        const layerBackground = new Konva.Layer({
            fill:"blue",
        });
        stage.add(layerBackground);
        // Stockage de la layerBackground
        this.layerBackground = layerBackground;


        //Création du calque des cellules
        const layerCell = new Konva.Layer({
            fill:"blue",
        });
        stage.add(layerCell);
        // Stockage de la layerCell
        this.layerCell = layerCell;


        //Création du calque des emplacements des barrieres
        const layerBarEmpl = new Konva.Layer({
            fill:"blue",
        });
        stage.add(layerBarEmpl);
        // Stockage de la layerBarEmpl
        this.layerBarEmpl = layerBarEmpl;

        //Création du calque des barrieres
        const layerBar = new Konva.Layer({
            fill:"blue",
        });
        stage.add(layerBar);
        // Stockage de la layerBar
        this.layerBar = layerBar;

        //Création du calque des pions
        const layerPion = new Konva.Layer({
            fill:"blue",
        });
        stage.add(layerPion);
        // Stockage de la layerPion
        this.layerPion = layerPion;

        stage.draw();
    }
}
</script>

<style scoped>
@media (min-width: 1024px){
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

}
</style>