<template>
  <div>
    <div ref="barEmpl"></div>
  </div>
</template>

<script>
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
              const barEmpl = new Konva.Rect({
                id: "(verti" + i + ";" + j + ")",
                x: (this.width/this.tailleGrille) * i + (this.width/this.tailleGrille)*0.875,
                y: (this.height/this.tailleGrille) * j + (this.height/this.tailleGrille)*0.125/3,
                width: (this.width/this.tailleGrille)/12,
                height: (this.height/this.tailleGrille)*0.75,
                fill: '#c6c6c6',
              });
              layerBarEmpl.add(barEmpl);
            }
          };
          for (let i = 0; i < this.tailleGrille; i++) {
            for (let j = 0; j < this.tailleGrille-1; j++) {
              const barEmpl = new Konva.Rect({
                id: "(hztal" + i + ";" + j + ")",
                x: (this.width/this.tailleGrille) * i + (this.width/this.tailleGrille)*0.125/3,
                y: (this.height/this.tailleGrille) * j + (this.height/this.tailleGrille)*0.875,
                width: (this.width/this.tailleGrille)*0.75,
                height: (this.height/this.tailleGrille)/12,
                fill: '#c6c6c6',
              });
              layerBarEmpl.add(barEmpl);
            }
          };
          layerBarEmpl.draw();
        }
      },
    },
  },
};
</script>