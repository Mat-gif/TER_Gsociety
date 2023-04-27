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
                x: 120 * i + 105,
                y: 120 * j + 5,
                width: 10,
                height: 90,
                fill: '#c6c6c6',
              });
              layerBarEmpl.add(barEmpl);
            }
          };
          for (let i = 0; i < this.tailleGrille; i++) {
            for (let j = 0; j < this.tailleGrille-1; j++) {
              const barEmpl = new Konva.Rect({
                id: "(hztal" + i + ";" + j + ")",
                x: 120 * i + 5,
                y: 120 * j + 105,
                width: 90,
                height: 10,
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