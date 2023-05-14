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
          myTurn:null,
          valid:[],
          clickable: true
      }
    },
    mounted() {
        // this.socket.emit('nextplayer',this.roomId);

        this.socket.on("my turn", (turn) => {
            this.myTurn = turn
            console.log("cellule : my turn "+ this.myTurn)
            this.clickable = true
            if(!turn){
                this.layerCell.getChildren().forEach(e => {
                    e.fill("#0B0B0B");
                    e.valid = false;
                })
            }
        })

        this.socket.on("cells checked", (validCells) => {
            this.valid=validCells
            this.layerCell.getChildren().forEach(e => {
                e.fill("#0B0B0B");
                e.valid =false;
            })

            validCells.forEach(c => {
                this.layerCell.find(node => node.attrs.x1 === c.x && node.attrs.y1 === c.y)[0].fill('#333363')

                this.layerCell.draw()
            })


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
                id: "" + i +"" + j ,
                  x1:i,
                  y1:j,
                x: (this.width/this.tailleGrille) * i,
                y: (this.height/this.tailleGrille) * j,
                width: (this.width/this.tailleGrille)-(this.width/this.tailleGrille)/6,
                height: (this.height/this.tailleGrille)-(this.height/this.tailleGrille)/6,
                fill: "#0B0B0B",
                stroke: '#217BFF'


              });
              // console.log(cell);
                cell.on('click', function (evt) {

                    let test =false
                    if(self.valid.find(c => c.x===evt.target.attrs.x1 && c.y===evt.target.attrs.y1)) test =true
                    if (self.myTurn && test && self.clickable) { // si c'est mon tour
                          // if (prevRect) prevRect.fill('blue');
                          // evt.target.fill(mycolor);
                          // prevRect = evt.target;
                        self.clickable = false
                          console.log('event-turn')
                          console.log(evt.target)
                          self.socket.emit('nextplayer',self.roomId);
                          self.socket.emit('coord',self.roomId, {x: evt.target.attrs.x1, y: evt.target.attrs.y1});
                          self.layerCell.getChildren().forEach(e => {
                            e.fill("#0B0B0B");
                            e.valid =false;
                          })
                          // self.$emit('event-turn', {
                          //     myTurn: false,
                          //     coord: {x: evt.target.attrs.x, y: evt.target.attrs.y}
                          // });
                    }
                })
                // cell.on('mouseover', function (evt) {
                //     evt.target.fill('#217BFF')
                //     console.log(evt.target.attrs.id)
                //     layerCell.draw()
                // })
                // cell.on('mouseout', function (evt) {
                //     evt.target.fill('#0B0B0B')
                //     layerCell.draw()
                // })
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