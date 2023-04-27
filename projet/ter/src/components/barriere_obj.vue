<template>
  <div>
    <div ref="barriere"></div>
  </div>
</template>

<script>
export default {
  props: {
    layerBar: Object,
    tailleGrille: Number,
    nbBarriere: Number,
    listeJoueur: Object,
  },
  watch: {
    layerBar: {
      immediate: true,
      handler(layerBar) {
        if (layerBar) {
          for (const num in this.listeJoueur){
            for (let i = 0; i < this.nbBarriere; i++) {
              const barriere = new Konva.Rect({
                id: "(" + i +")",
                owner: this.listeJoueur[num][0],
                x: num*(this.tailleGrille*100/4) + this.tailleGrille*100/4 -10*this.tailleGrille,
                y: 20 * i + this.tailleGrille*120,
                width: 90,
                height: 10,
                fill: this.listeJoueur[num][1],
              });
              layerBar.add(barriere);
            }
          }
          layerBar.draw();
        }
      },
    },
  },
};
</script>

