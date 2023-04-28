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
      otherInitGame : Object,
      myInitGame : Object
  },
  watch: {
    layerPion: {
      immediate: true,
      handler(layerPion) {
        if (layerPion) {
            const pionPos = [
                [
                    (1+this.myInitGame.positionStart.x)*(this.width/this.tailleGrille) - (this.width / this.tailleGrille) / 2 - (this.width / this.tailleGrille) / 12,
                    (1+this.myInitGame.positionStart.y)*(this.height/this.tailleGrille) - (this.height / this.tailleGrille) / 2 - (this.height / this.tailleGrille) / 12
                ]
            ];
            this.otherInitGame.forEach(e => {
                pionPos.push(
                    [
                        (1 + e.positionStart.x) * (this.width / this.tailleGrille) - (this.width / this.tailleGrille) / 2 - (this.width / this.tailleGrille) / 12,
                        (1 + e.positionStart.y) * (this.height / this.tailleGrille) - (this.height / this.tailleGrille) / 2 - (this.height / this.tailleGrille) / 12
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