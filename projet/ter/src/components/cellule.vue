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
  },
  watch: {
    layerCell: {
      immediate: true,
      handler(layerCell) {
        if (layerCell) {
          for (let i = 0; i < this.tailleGrille; i++) {
            for (let j = 0; j < this.tailleGrille; j++) {
              const cell = new Konva.Rect({
                id: "(" + i + ";" + j + ")",
                x: 120 * i,
                y: 120 * j,
                width: 100,
                height: 100,
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