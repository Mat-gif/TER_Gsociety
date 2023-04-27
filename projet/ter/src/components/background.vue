<template>
  <div>
    <div ref="background"></div>
  </div>
</template>

<script>
export default {
  props: {
    layerBackground: Object,
    tailleGrille: Number,
  },
  watch: {
    layerBackground: {
      immediate: true,
      handler(layerBackground) {
        if (layerBackground) {
          const background = new Konva.Rect({
            id: "fond",
            x: 0,
            y: 0,
            width: this.tailleGrille*120-20,
            height: this.tailleGrille*120-20,
            fill: "blue",
          });
          layerBackground.add(background);
          layerBackground.draw();
        }
      },
    },
  },
};
</script>