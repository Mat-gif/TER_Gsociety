
<template>
  <div>
    <svg ref="mySvg" width="450" height="450">
      <rect v-for="(square, index) in squares"
            :x="square.x" :y="square.y" :width="squareSize - 10" :height="squareSize - 10"
            :fill="square.color" @click="colorClick(index)"/>
    </svg>
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
      //Creation des cellules et sauvagarde
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          this.squares.push({ x: i * this.squareSize, y: j * this.squareSize, color: "blue" });
        }
      }
    },
    //Methode changeant la couleur de la cellule cliquée
    colorClick(index) {
      //Selection de la bonne cellule en fonction de l'index
      var square = this.squares[index];
      if (square) {
        //Coloration de la cellule cliquée
        square.color = "red";
        if (this.lastSquare.pos !== -1) {
          this.squares[this.lastSquare.pos].color = "blue";
        }
        this.lastSquare.pos = index;
        this.lastSquare.color = "red";
      }
    }
  },
};
</script>
