<template>
  <div ref="container"></div>
</template>

<script>
import Konva from 'konva';

export default {
  name: 'PlateauComponent',
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
      const layer = new Konva.Layer();
      stage.add(layer);
      let prevRect = null;
      //// Création des cellules du plateau
      for (let i = 0; i < this.nbSquares; i++) {
        for (let j = 0; j < this.nbSquares; j++) {
          const rect = new Konva.Rect({
            id:  i + j ,
            x: 50 * i,
            y: 50 * j,
            width: 40,
            height: 40,
            fill: 'blue',
            listening: true
          });


          //// Ecouteurs d'évenements
          rect.on('click', function (evt) {
            if (prevRect) prevRect.fill('blue');
            evt.target.fill(mycolor);
            prevRect = evt.target;
            self.$emit('event-turn', {myTurn: false});

            layer.draw();
          });
          layer.add(rect);
        }
      }
      stage.draw();
    },

  }
}
</script>

<style scoped>

</style>