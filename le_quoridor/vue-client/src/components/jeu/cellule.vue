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
      roomId :Number,
      socket : Object
  },
    data(){
      return{
          myTurn:null
      }
    },
    mounted() {
        this.socket.on("my turn", (turn) => {
            this.myTurn = turn
            console.log("cellule : my turn "+ this.myTurn)
        })
    },
    watch: {

    layerCell: {
      immediate: true,
      handler(layerCell) {
        const self = this;
        if (layerCell) {

          for (let i = 0; i < this.tailleGrille; i++) {
            for (let j = 0; j < this.tailleGrille; j++) {
                console.log((this.height/this.tailleGrille)-(this.height/this.tailleGrille)/6)
              const cell = new Konva.Rect({
                id: "(" + i + "," + j + ")",
                  x1:i,
                  y1:j,
                x: (this.width/this.tailleGrille) * i,
                y: (this.height/this.tailleGrille) * j,
                width: (this.width/this.tailleGrille)-(this.width/this.tailleGrille)/6,
                height: (this.height/this.tailleGrille)-(this.height/this.tailleGrille)/6,
                fill: "#917FB3",
              });
              // console.log(cell);
                cell.on('click', function (evt) {
                     if (self.myTurn) { // si c'est mon tour
                        // if (prevRect) prevRect.fill('blue');
                        // evt.target.fill(mycolor);
                        // prevRect = evt.target;
                        console.log('event-turn')
                        console.log(evt.target)
                        self.socket.emit('nextplayer',self.roomId);
                        self.socket.emit('coord',self.roomId, {x: evt.target.attrs.x1, y: evt.target.attrs.y1});
                        // self.$emit('event-turn', {
                        //     myTurn: false,
                        //     coord: {x: evt.target.attrs.x, y: evt.target.attrs.y}
                        // });
                     }
                });
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