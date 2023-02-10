<template>
  <div>
    <canvas ref="myCanvas"></canvas>
  </div>
</template>

<script>
export default {
    data() {
    return {
      squares: [],
      squareSize: 50,
      lastSquare: {"pos":-1,"color":""}
    };
  },

  mounted() {
    this.drawBoard();
  },
  methods: {
    drawBoard() {
      var canvas = this.$refs.myCanvas;
      var ctx = canvas.getContext("2d");
      canvas.width = 450;
      canvas.height = 450;

      for (var i = 0; i <= (canvas.width/this.squareSize); i++) {
        for (var j = 0; j <= (canvas.width/this.squareSize); j++) {
          // ctx.fillStyle = (i + j) % 2 == 0 ? "green" : "white";
          ctx.fillStyle = "blue";
          ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize-10, this.squareSize-10);
          this.squares.push({ x: i * this.squareSize, y: j * this.squareSize, color: ctx.fillStyle });
          console.log(i * this.squareSize,"   ",j * this.squareSize,"   ",ctx.fillStyle)
        }
      }
      console.log(this.squares)
      this.colorClic();
    },

    colorClic() {
      var canvas = this.$refs.myCanvas;
      var ctx = canvas.getContext("2d");

      canvas.addEventListener("click", event => {
        var x = event.offsetX;
        var y = event.offsetY;
        console.log(x,y);

        for (var i = 0; i < this.squares.length; i++) {
          if (
            x > this.squares[i].x &&
            x < this.squares[i].x + this.squareSize &&
            y > this.squares[i].y &&
            y < this.squares[i].y + this.squareSize
          ) {
           
            ctx.fillStyle = this.lastSquare["color"]
            if (this.lastSquare["pos"] != -1) {
              ctx.fillRect(this.squares[this.lastSquare["pos"]].x,this.squares[this.lastSquare["pos"]].y,this.squareSize-10,this.squareSize-10)
            }
            this.lastSquare["pos"] = i
            this.lastSquare["color"] = this.squares[i].color

            ctx.fillStyle = "red";
            ctx.fillRect(
              this.squares[i].x,
              this.squares[i].y,
              this.squareSize-10,
              this.squareSize-10
            );
          }
        }
      });
    }
  },
}
</script>