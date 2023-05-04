<template>
  <div>
    <div ref="pion"></div>
  </div>
</template>

<script>

import Konva from "konva";

export default {
  props: {
    layerPion: Object,
    tailleGrille: Number,
    listeJoueur: Object,
      width : Number,
      height : Number,
      otherInitGame : Object,
      myInitGame : Object,
      newPosition : Object
  },
    data(){
      return{
          mx: (this.width/this.tailleGrille),
          sx: (-(this.width / this.tailleGrille) / 2 - (this.width / this.tailleGrille) / 12),
      }
    },
  watch: {
          newPosition: function(newVal, oldVal) {
              const self = this;
              // code à exécuter lorsque la prop change
              console.log('La valeur de la prop myProp a changé de', oldVal, 'à', newVal);
              // console.log(this.layerPion.find(newVal.id));
              let lePion = this.layerPion.find(node => node.attrs.owner ===newVal.id )[0];
              const tween = new Konva.Tween({
                  node: lePion, // the shape to animate
                  duration: 0.5, // the duration of the animation in seconds
                  x: (1+newVal.coord.x)*this.mx+this.sx, // the ending X position of the shape
                  y: (1+newVal.coord.y)*this.mx+this.sx, // the ending Y position of the shape
                  opacity: 1, // the ending opacity of the shape
                  onFinish: function() {
                      lePion.setAttrs({
                          x: (1 + newVal.coord.x) * self.mx + self.sx,
                          y: (1 + newVal.coord.y) * self.mx + self.sx
                      });
                  }
              });
              console.log(lePion)
              tween.play()
              // this.layerPion.draw();


          },
    layerPion: {
      immediate: true,
      handler(layerPion) {
        if (layerPion) {
            const pionPos = [
                [
                    (1+this.myInitGame.positionStart.x)*this.mx+this.sx,
                    (1+this.myInitGame.positionStart.y)*this.mx+this.sx
                ]
            ];
            this.otherInitGame.forEach(e => {
                pionPos.push(
                    [
                        (1 + e.positionStart.x)*this.mx+this.sx,
                        (1 + e.positionStart.y)*this.mx+this.sx
                    ]
                )
            });
          // const pionPos = [
            //   [((this.tailleGrille)/2)*120-10,50],
            //   [this.tailleGrille*120-70,((this.tailleGrille)/2)*120-10],
            //   [((this.tailleGrille)/2)*120-10,this.tailleGrille*120-70],
            //   [50,((this.tailleGrille)/2)*120-10],
            // ];
          for (const num in this.listeJoueur){
            const pion = new Konva.Circle({
                // name: this.listeJoueur[num][0],
              owner: this.listeJoueur[num][0],
              x: pionPos[num][0],
              y: pionPos[num][1],
              radius: 0.5*((this.width/this.tailleGrille)-(this.width/this.tailleGrille)/6),
              fill: this.listeJoueur[num][1],
            });
            layerPion.add(pion);
          }
          layerPion.draw();
        }
      },
    },
  },
};
</script>