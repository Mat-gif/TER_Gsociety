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
    selected: Array,
      roomId :Number,
      socket : Object
  },
  watch: {
    layerBarEmpl: {
      immediate: true,
      handler(layerBarEmpl) {
          const self = this;
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
                name: "V"
              });
                if(j!==this.tailleGrille-1){

                    //ecouteur pour visualiser l'emplacement de la barriere
                    barV.on('click', function (evt) {
                        let bar1 = {
                            name:evt.target.attrs.name,
                            x1:evt.target.attrs.x1,
                            y1:evt.target.attrs.y1
                        }
                        let bar =   layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 && node.attrs.y1 === evt.target.attrs.y1 + 1 && node.attrs.name === "V")[0]
                        let bar2 = {
                            name:bar.attrs.name,
                            x1:bar.attrs.x1,
                            y1:bar.attrs.y1
                        }
                        console.log(bar1)
                        self.socket.emit("testBar", self.roomId,bar1,bar2)

                        self.socket.on("valid Bar",(res)=>{
                            if(res){
                                evt.target.fill('#EDED5E')
                                console.log("[barV] "+evt.target.attrs.id)
                                layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 && node.attrs.y1 === evt.target.attrs.y1 + 1 && node.attrs.name === "V")[0].fill('#EDED5E')
                                layerBarEmpl.draw()
                            }
                        })


                    })
                    // barV.on('mouseout', function (evt) {
                    //     evt.target.fill('#464646')
                    //     layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 && node.attrs.y1 === evt.target.attrs.y1 + 1 && node.attrs.name === "V")[0].fill('#464646')
                    //     layerBarEmpl.draw()
                    // })
                    //
                    // //ecouteur pour placer la barrière
                    // barV.on('click', function (evt) {
                    // })
                    // barV.on('click', function (evt) {
                    // })
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
                name: "H"
              });
                if(i!==this.tailleGrille-1){
                    barH.on('click', function (evt) {
                        let bar1 = {
                            name:evt.target.attrs.name,
                            x1:evt.target.attrs.x1,
                            y1:evt.target.attrs.y1
                        }
                        let bar =   layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1+1 && node.attrs.y1 === evt.target.attrs.y1 && node.attrs.name === "H")[0]
                        console.log(bar.attrs)
                        let bar2 = {
                            name:bar.attrs.name,
                            x1:bar.attrs.x1,
                            y1:bar.attrs.y1
                        }
                        console.log(bar2)
                        self.socket.emit("testBar", self.roomId,bar1,bar2)
                        self.socket.on("valid Bar",(res)=>{
                            if(res){
                                evt.target.fill('#EDED5E')
                                console.log("[barH] "+evt.target.attrs.id)
                                layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 + 1 && node.attrs.y1 === evt.target.attrs.y1 && node.attrs.name === "H")[0].fill('#EDED5E')
                                layerBarEmpl.draw()
                            }
                        })



                    })
                    // barH.on('mouseout', function (evt) {
                    //     evt.target.fill('#464646')
                    //     layerBarEmpl.find(node => node.attrs.x1 === evt.target.attrs.x1 + 1 && node.attrs.y1 === evt.target.attrs.y1 && node.attrs.name === "H")[0].fill('#464646')
                    //     layerBarEmpl.draw()
                    // })
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