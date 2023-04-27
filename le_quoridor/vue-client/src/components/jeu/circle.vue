<template>
  <div>
    <div ref="pion"></div>
  </div>
</template>

<script>

export default {
  props: {
    layerPion: Object,
    tailleGrille: Number,
    listeJoueur: Object,
      width : Number,
      height : Number,
  },
  watch: {
    layerPion: {
      immediate: true,
      handler(layerPion) {
        if (layerPion) {
          const pionPos = [
            [((this.tailleGrille)/2)*120-10,50],
            [this.tailleGrille*120-70,((this.tailleGrille)/2)*120-10],
            [((this.tailleGrille)/2)*120-10,this.tailleGrille*120-70],
            [50,((this.tailleGrille)/2)*120-10],
          ];
          for (const num in this.listeJoueur){
            const pion = new Konva.Circle({
              owner: this.listeJoueur[num][0],
              x: pionPos[num][0],
              y: pionPos[num][1],
              radius: 40,
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