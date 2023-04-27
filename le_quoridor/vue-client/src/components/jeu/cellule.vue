<template>
  <div>
    <div ref="cell"></div>
  </div>
</template>

<script>
export default {
  props: {
    layerCell: Object,
    tailleGrille: Number,
      width : Number,
      height : Number,
  },
  watch: {
    layerCell: {
      immediate: true,
      handler(layerCell) {
        if (layerCell) {

          for (let i = 0; i < this.tailleGrille; i++) {
            for (let j = 0; j < this.tailleGrille; j++) {
                console.log((this.height/this.tailleGrille)-(this.height/this.tailleGrille)/6)
              const cell = new Konva.Rect({
                id: "(" + i + ";" + j + ")",
                x: (this.width/this.tailleGrille) * i,
                y: (this.height/this.tailleGrille) * j,
                width: (this.width/this.tailleGrille)-(this.width/this.tailleGrille)/6,
                height: (this.height/this.tailleGrille)-(this.height/this.tailleGrille)/6,
                fill: "burlywood",
              });
              // console.log(cell);
              layerCell.add(cell);
            }
          }
          layerCell.draw();
        }
      },
    },
  },
};
</script>