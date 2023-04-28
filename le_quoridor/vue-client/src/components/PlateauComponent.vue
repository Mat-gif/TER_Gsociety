<template>
  <div class="container">
      <div ref="plateau">
          <Background :width="width" :height="height" :layerBackground="layerBackground" :taille-grille="nbSquares"/>
          <Rect :roomId="roomId" :socket="socket" :width="width" :height="height" :layerCell="layerCell" :taille-grille="nbSquares"/>
          <BarrierEmpl :width="width" :height="height" :layerBarEmpl="layerBarEmpl" :taille-grille="nbSquares"/>
<!--          <BarrierObj :width="width" :height="height" :layerBar="layerBar" :listeJoueur="listeJoueur" :nbBarriere="nbBarriere" :taille-grille="nbSquares"/>-->
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
          width : 800,
          height : 800,
          listeJoueur : [],
          layerBackground : null,
          layerCell : null,
          layerBarEmpl : null,
          layerBar : null,
          layerPion : null,
      };
  },
  props: ["nbSquares","myInitGame","otherInitGame","myTurn","newPosition","nbBarriere","roomId","socket"],
  //   watch: {
  //   newPosition: function(newVal, oldVal) {
  //     // code à exécuter lorsque la prop change
  //     console.log('La valeur de la prop myProp a changé de', oldVal, 'à', newVal.x);
  //
  //     // let id =`#${newVal.x/50}${newVal.y/50}`
  //     // console.log(id)
  //
  //     //je n'arrive pas a selectionner l'element
  //
  //     // var myRect = layer.find('#myRect')[0];
  //     // myRect.fill('blue');
  //     // layer.batchDraw();
  //
  //   }
  // },
  components:{
            Background,Rect,Pion,BarrierEmpl,BarrierObj
        },
    computed: {
        stage() {
            return this.$refs.stage;
        }
    },
  // mounted() {
  //   const self = this; // stocker la référence à "this"
  //   this.createGame(self);
  // },
    methods:{
        changeturn(payload){
            this.$emit('event-turn', payload);
            // this.myTurn=payload.myTurn
            // this.socket.emit('nextplayer',this.roomId);
            // this.socket.emit('coord',this.roomId, payload.coord);
            // console.log("payload "+ this.myTurn)
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
  // methods:{
  //   createGame(self){
  //     const mycolor = this.myInitGame.color;
  //     //// Initialisation de la scène principale
  //     const stage = new Konva.Stage({
  //       container: this.$refs.container,
  //       width: 500,
  //       height: 500
  //     });
  //     this.layer = new Konva.Layer();
  //     stage.add(this.layer);
  //     let prevRect = null;
  //     //// Création des cellules du plateau
  //     for (let i = 0; i < this.nbSquares; i++) {
  //       for (let j = 0; j < this.nbSquares; j++) {
  //         let c = "blue";
  //
  //         if ((i===this.myInitGame.positionStart.x && j===this.myInitGame.positionStart.y)) c =this.myInitGame.color;
  //         if( (i===this.otherInitGame[0].positionStart.x && j===this.otherInitGame[0].positionStart.y)) c  =this.otherInitGame[0].color;
  //
  //         const rect = new Konva.Rect({
  //           id:  i + j ,
  //           x: 50 * i,
  //           y: 50 * j,
  //           width: 40,
  //           height: 40,
  //           fill: c,
  //           listening: true
  //         });
  //
  //         if(c===this.myInitGame.color) prevRect=rect;
  //
  //
  //         //// Ecouteurs d'évenements
  //         rect.on('click', function (evt) {
  //
  //           if (self.myTurn) { // si c'est mon tour
  //             if (prevRect) prevRect.fill('blue');
  //             evt.target.fill(mycolor);
  //             prevRect = evt.target;
  //             console.log('event-turn ')
  //             console.log(evt.target)
  //             self.$emit('event-turn', {myTurn: false, coord:{x:evt.target.attrs.x,y:evt.target.attrs.y}});
  //             this.layer.draw();
  //           }
  //
  //         });
  //
  //
  //         this.layer.add(rect);
  //       }
  //     }
  //
  //
  //     stage.draw();
  //   },
  //
  // }
}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>