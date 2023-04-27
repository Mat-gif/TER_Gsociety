<template>
  <div>
    <div ref="plateau">
      <Background :layerBackground="layerBackground" :tailleGrille="tailleGrille"/>
      <Rect :layerCell="layerCell" :tailleGrille="tailleGrille"/>
      <BarrierEmpl :layerBarEmpl="layerBarEmpl" :tailleGrille="tailleGrille"/>
      <BarrierObj :layerBar="layerBar" :listeJoueur="listeJoueur" :nbBarriere="nbBarriere" :tailleGrille="tailleGrille"/>
      <Pion :layerPion="layerPion" :listeJoueur="listeJoueur" :tailleGrille="tailleGrille"/>
    </div>
  </div>
</template>


<script >
  import Background from "./components/background.vue";
  import Rect from "./components/cellule.vue";
  import Pion from "./components/circle.vue";
  import BarrierEmpl from "./components/barriere_empl.vue";
  import BarrierObj from "./components/barriere_obj.vue";

  const width = window.innerWidth; //revoir en fonction de tailleGrille
  const height = window.innerHeight;
   

  export default {    
    data() 
    {
      return {
        tailleGrille : 7,
        nbBarriere : 5,
        listeJoueur : [["vic","purple"],["loum","red"],["mat","yellow"],["lij","green"]],

        layerBackground : null,
        layerCell : null,
        layerBarEmpl : null,
        layerBar : null,
        layerPion : null,
      };
    },
    components:
    {
      Background,Rect,Pion,BarrierEmpl,BarrierObj
    },
    computed: {
      stage() {
        return this.$refs.stage;
      }
    },
    methods:{
    },
    mounted(){
      //Creation de la scene
      const stage = new Konva.Stage({
        container: this.$refs.plateau,
        width: width,
        height: height,
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
  };
</script>