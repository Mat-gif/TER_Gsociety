<template>
  <div>
    <canvas ref="myCanvas"></canvas>
  </div>
</template>

<script>
export default {
    data() {
    return {
      squares: [], //Liste des cellules existantes (x,y,color)
      squareSize: 50, //Taille de la cellule
      lastSquare: {"pos":-1,"color":""} //Variable de sauvegarde de la dernière cellule cliquée
    };
  },

  mounted() {
    this.drawBoard();
  },
  methods: {
    drawBoard() {
      var canvas = this.$refs.myCanvas;
      var ctx = canvas.getContext("2d");
      //Taille du Canvas
      canvas.width = this.squareSize*9;
      canvas.height = this.squareSize*9;

      //Creation des cellules et sauvagarde
      for (var i = 0; i <= (canvas.width/this.squareSize); i++) {
        for (var j = 0; j <= (canvas.width/this.squareSize); j++) {
          ctx.fillStyle = "blue";
          ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize-10, this.squareSize-10);
          this.squares.push({ x: i * this.squareSize, y: j * this.squareSize, color: ctx.fillStyle });
          // console.log(i * this.squareSize,"   ",j * this.squareSize,"   ",ctx.fillStyle)
        }
      }
      // console.log(this.squares)
      this.colorClic();
    },

    //Methode changeant la couleur de la cellule cliquée
    colorClic() {
      var canvas = this.$refs.myCanvas;
      var ctx = canvas.getContext("2d");

      canvas.addEventListener("click", event => {
        var x = event.offsetX;
        var y = event.offsetY;
        // console.log(x,y);

        //Selection de la bonne cellule en fonction des coordonnees du clic
        for (var i = 0; i < this.squares.length; i++) {
          if (
            x > this.squares[i].x &&
            x < this.squares[i].x + this.squareSize &&
            y > this.squares[i].y &&
            y < this.squares[i].y + this.squareSize
          ) {
           
            //Coloration de la cellule cliquee
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