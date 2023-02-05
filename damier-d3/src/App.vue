<template>
  <div>
    <Rectangle :svg="svg" />
    <Circle :svg="svg" />
  </div>
</template>

<script>
import Circle from "./components/Circle.vue";
import Rectangle from "./components/Rectangle.vue";
import * as d3 from "d3";

export default {
  data() {
    return {
      svg: d3.select("#app")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000),
      pion : null,
      cell : null,
    }
  },
  components: {
    Circle,Rectangle
  },
  mounted() {
    d3.selectAll("rect").on("click",  () =>{
      this.cell = d3.select(event.currentTarget)
      console.log(parseInt(this.cell.node().getAttribute("x")))
      console.log(parseInt(this.cell.node().getAttribute("y")))
      this.transitionPion();
    })

    d3.selectAll("circle").on("click",  () => {
      this.pion =d3.select(event.currentTarget) //sélectionner l'élément cible de l'événement
      console.log( parseInt(this.pion.node().getAttribute("cx"))) //obtenir l'élément du DOM associé à la sélection d3
      console.log( parseInt(this.pion.node().getAttribute("cy")))
      this.transitionPion();
    })
  },
  methods: {
    transitionPion() {
    if (this.pion !== null && this.cell !== null) {
      const t = d3.transition().duration(1000);
      d3.select(this.pion.node()).transition(t)
        .attr("cx", parseInt(this.cell.node().getAttribute("x"))+parseInt(this.pion.node().getAttribute("r")))
        .attr("cy", parseInt(this.cell.node().getAttribute("y"))+parseInt(this.pion.node().getAttribute("r")))
      //this.pion = null;
      this.cell = null;
    }
  }
  }
}
</script>

