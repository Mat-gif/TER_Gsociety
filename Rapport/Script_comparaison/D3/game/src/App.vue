<template>
  <div class="container">
    <div class="d-flex">
      <div id="plateau"></div>
    </div>
  </div>
</template>

<!-- le script  sans composants et methods  -->
<script>
import "bootstrap/dist/css/bootstrap.css";
import * as d3 from "d3";

export default {
  mounted() {
    const plateau = d3
      .select("#plateau")
      .append("svg")
      .attr("width", "500px")
      .attr("height", "500px")
      .style("text-align", "center")
      .style("justify-content", "center")
      .style("align-items", "center");

    const cellules = 9;
    const colonnes = 9;
    const matrice = [];

    for (let i = 0; i < cellules; i++) {
      for (let j = 0; j < colonnes; j++) {
        matrice.push({
          a: i,
          o: j,
          id: `cellule n°:-${i}-${j}`,
        });
      }
    }

    const m_case = plateau
      .selectAll(".cell")
      .data(matrice)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("id", (d) => d.id)
      .attr("x", (d) => d.a * 50)
      .attr("y", (d) => d.o * 50)
      .attr("height", 40)
      .attr("width", 40)
      .style("fill", "blue");

    ////le click dans une cellule
    m_case.on("click", function (p) {
      /// toutes l
      d3.selectAll(".cell").style("fill", "blue");
      d3.select(this).style("fill", "red");
    });
  },
};
</script>

<!-- j'ai laissé le même style css -->
<style scoped>

</style>
