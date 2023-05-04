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
    selected: Array
  },
  watch: {
    layerBarEmpl: {
      immediate: true,
      handler(layerBarEmpl) {
        if (layerBarEmpl) {
          for (let i = 0; i < this.tailleGrille-1; i++) {
            for (let j = 0; j < this.tailleGrille; j++) {
              let barV = new Konva.Rect({
                id: ""+i+""+j,
                x: (this.width/this.tailleGrille) * i + (this.width/this.tailleGrille)*0.875,
                y: (this.height/this.tailleGrille) * j + (this.height/this.tailleGrille)*0.125/3,
                x1:i,
                y1:j,
                width: (this.width/this.tailleGrille)/12,
                height: (this.height/this.tailleGrille)*0.75,
                fill: '#464646',
                name: "verticale"
              });
                if(j!==this.tailleGrille-1){
                    barV.on('mouseover', function (evt) {
                        evt.target.fill('#EDED5E')
                        console.log("[barV] "+evt.target.attrs.id)
                        layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 && node.attrs.y1 === evt.target.attrs.y1 + 1 && node.attrs.name === "verticale")[0].fill('#EDED5E')
                        layerBarEmpl.draw()
                    })
                    barV.on('mouseout', function (evt) {
                        evt.target.fill('#464646')
                        layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 && node.attrs.y1 === evt.target.attrs.y1 + 1 && node.attrs.name === "verticale")[0].fill('#464646')
                        layerBarEmpl.draw()
                    })
                }
              layerBarEmpl.add(barV);
            }
          }
          for (let i = 0; i < this.tailleGrille; i++) {
            for (let j = 0; j < this.tailleGrille-1; j++) {
              let barH = new Konva.Rect({
                id: ""+i+""+j,
                x: (this.width/this.tailleGrille) * i + (this.width/this.tailleGrille)*0.125/3,
                y: (this.height/this.tailleGrille) * j + (this.height/this.tailleGrille)*0.875,
                x1:i,
                y1:j,
                width: (this.width/this.tailleGrille)*0.75,
                height: (this.height/this.tailleGrille)/12,
                fill: '#464646',
                name: "horizontale"
              });
                if(i!==this.tailleGrille-1){
                    barH.on('mouseover', function (evt) {
                        evt.target.fill('#EDED5E')
                        console.log("[barH] "+evt.target.attrs.id)
                        layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 + 1 && node.attrs.y1 === evt.target.attrs.y1 && node.attrs.name === "horizontale")[0].fill('#EDED5E')
                        layerBarEmpl.draw()
                    })
                    barH.on('mouseout', function (evt) {
                        evt.target.fill('#464646')
                        layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 + 1 && node.attrs.y1 === evt.target.attrs.y1 && node.attrs.name === "horizontale")[0].fill('#464646')
                        layerBarEmpl.draw()
                    })
                }
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