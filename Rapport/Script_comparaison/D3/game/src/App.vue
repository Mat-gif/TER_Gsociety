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

    ////le click dans une cellule
    plateau.selectAll("rect").on("click", () => {
      d3.selectAll("rect").style("fill", "blue");
      d3.select(event.currentTarget).style("fill", "red");
    });
  },
};
</script>

<!-- j'ai laissé le même style css -->
<style scoped>

</style>
