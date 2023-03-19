<template>
  <div class="container">
      <div id="plateau"></div>
  </div>
</template>


<script>
import * as d3 from "d3";

export default {
  mounted() {
     //// Initialisation de la scène principale
    const plateau = d3
      .select("#plateau")
      .append("svg")
      .attr("width", "500px")
      .attr("height", "500px")

    //// Création des cellules du plateau
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        plateau
          .append("rect")
          .attr("id", i+"-"+j)
          .attr("x", i * 50)
          .attr("y", j * 50)
          .attr("height", 40)
          .attr("width", 40)
          .style("fill", "blue");
      }
    }

    //// Ecouteurs d'évenements
    plateau.selectAll("rect").on("click", () => {
      d3.selectAll("rect").style("fill", "blue");
      d3.select(event.currentTarget).style("fill", "red");
    });
  },
};
</script>

