<template>
  <div ref="container"></div>
</template>

<script>
import Konva from 'konva';

export default {
  name: 'PlateauComponent',
  data() {
    this.layer=null
  },
  props: {
    nbSquares: {
      default: 0,
      required: true,
      type: Number
    },
    myInitGame:{
      required: true
    },
    otherInitGame:{
      required: true
    },
    myTurn:{
      required: true
    },
    newPosition:{
      default: null
    }

  }, watch: {
    newPosition: function(newVal, oldVal) {
      // code à exécuter lorsque la prop change
      console.log('La valeur de la prop myProp a changé de', oldVal, 'à', newVal.x);

      let id =`#${newVal.x/50}${newVal.y/50}`
      console.log(id)

      //je n'arrive pas a selectionner l'element

      // var myRect = layer.find('#myRect')[0];
      // myRect.fill('blue');
      // layer.batchDraw();

    }
  },
  mounted() {
    const self = this; // stocker la référence à "this"
    this.createGame(self);
  },
  methods:{
    createGame(self){
      const mycolor = this.myInitGame.color;
      //// Initialisation de la scène principale
      const stage = new Konva.Stage({
        container: this.$refs.container,
        width: 500,
        height: 500
      });
      this.layer = new Konva.Layer();
      stage.add(this.layer);
      let prevRect = null;
      //// Création des cellules du plateau
      for (let i = 0; i < this.nbSquares; i++) {
        for (let j = 0; j < this.nbSquares; j++) {
          let c = "blue";

          if ((i===this.myInitGame.positionStart.x && j===this.myInitGame.positionStart.y)) c =this.myInitGame.color;
          if( (i===this.otherInitGame[0].positionStart.x && j===this.otherInitGame[0].positionStart.y)) c  =this.otherInitGame[0].color;

          const rect = new Konva.Rect({
            id:  i + j ,
            x: 50 * i,
            y: 50 * j,
            width: 40,
            height: 40,
            fill: c,
            listening: true
          });

          if(c===this.myInitGame.color) prevRect=rect;


          //// Ecouteurs d'évenements
          rect.on('click', function (evt) {

            if (self.myTurn) { // si c'est mon tour
              if (prevRect) prevRect.fill('blue');
              evt.target.fill(mycolor);
              prevRect = evt.target;
              console.log('event-turn ')
              console.log(evt.target)
              self.$emit('event-turn', {myTurn: false, coord:{x:evt.target.attrs.x,y:evt.target.attrs.y}});
              this.layer.draw();
            }

          });


          this.layer.add(rect);
        }
      }


      stage.draw();
    },

  }
}
</script>

<style scoped>

</style>