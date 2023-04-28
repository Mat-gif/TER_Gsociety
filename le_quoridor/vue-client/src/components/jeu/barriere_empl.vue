<template>
  <div>
    <div ref="barEmpl"></div>
  </div>
</template>

<script>

import Konva from 'konva';

export default {
  props: {
    layerBarEmpl: Object,
    tailleGrille: Number,
      width : Number,
      height : Number,
  },
  watch: {
    layerBarEmpl: {
      immediate: true,
      handler(layerBarEmpl) {
        if (layerBarEmpl) {
          for (let i = 0; i < this.tailleGrille-1; i++) {
            for (let j = 0; j < this.tailleGrille; j++) {
              let barV = new Konva.Rect({
                id:i+j,
                x: (this.width/this.tailleGrille) * i + (this.width/this.tailleGrille)*0.875,
                y: (this.height/this.tailleGrille) * j + (this.height/this.tailleGrille)*0.125/3,
                width: (this.width/this.tailleGrille)/12,
                height: (this.height/this.tailleGrille)*0.75,
                fill: '#F45050',
                  name: "verticale"
              });
              layerBarEmpl.add(barV);
            }
          };
          for (let i = 0; i < this.tailleGrille; i++) {
            for (let j = 0; j < this.tailleGrille-1; j++) {
              let barH = new Konva.Rect({
                id: i+j,
                x: (this.width/this.tailleGrille) * i + (this.width/this.tailleGrille)*0.125/3,
                y: (this.height/this.tailleGrille) * j + (this.height/this.tailleGrille)*0.875,
                width: (this.width/this.tailleGrille)*0.75,
                height: (this.height/this.tailleGrille)/12,
                fill: '#F45050',
                  name: "horizontale"
              });
              layerBarEmpl.add(barH);
            }
          };
          console.log(layerBarEmpl)
          layerBarEmpl.draw();
        }
      },
    },
  },
};
</script>