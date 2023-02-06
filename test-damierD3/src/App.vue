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
      test : []
    }
  },
  components: {
    Circle,Rectangle
  },
  mounted() {
    d3.selectAll("rect").on("click",  () =>{
      this.cell = d3.select(event.currentTarget)
      this.transitionPion();
    })

    d3.selectAll("circle").on("click",  () => {
      this.pion =d3.select(event.currentTarget) //sélectionner l'élément cible de l'événement
      this.cellulesproche();
    })
  },
  methods: {
    transitionPion() {
    if (this.pion !== null && this.cell !== null && this.test.indexOf(this.cell.node()) !== -1) {
      console.log("go")
      const t = d3.transition().duration(1000);
      d3.select(this.pion.node()).transition(t)
        .attr("cx", parseInt(this.cell.node().getAttribute("x"))+parseInt(this.pion.node().getAttribute("r"))) //obtenir l'élément du DOM associé à la sélection d3
        .attr("cy", parseInt(this.cell.node().getAttribute("y"))+parseInt(this.pion.node().getAttribute("r")))
      this.pion = null;
      this.cell = null;
    } else {
      console.error(" vous ne pouvez pas vous deplacer ici")
    }
  },
  cellulesproche(){
    console.log("------- -----------------------------")
    this.test = []
    d3.selectAll("rect").nodes().forEach(element => {
      var x0 = parseInt(this.pion.node().getAttribute("cx"))-parseInt(this.pion.node().getAttribute("r"))
      var y0 = parseInt(this.pion.node().getAttribute("cy"))-parseInt(this.pion.node().getAttribute("r"))
      if( (parseInt(element.getAttribute("x")) === x0-50 && parseInt(element.getAttribute("y")) === y0) ||
          (parseInt(element.getAttribute("x")) == x0+50 && parseInt(element.getAttribute("y")) === y0) ||
          (parseInt(element.getAttribute("x")) === x0 && parseInt(element.getAttribute("y")) === y0-50) ||
          (parseInt(element.getAttribute("x")) === x0 && parseInt(element.getAttribute("y")) === y0+50) ||
          (parseInt(element.getAttribute("x")) === x0-50 && parseInt(element.getAttribute("y")) === y0-50) ||
          (parseInt(element.getAttribute("x")) === x0+50 && parseInt(element.getAttribute("y")) === y0+50) ||
          (parseInt(element.getAttribute("x")) === x0-50 && parseInt(element.getAttribute("y")) === y0+50) ||
          (parseInt(element.getAttribute("x")) === x0+50 && parseInt(element.getAttribute("y")) === y0-50)  ){
            console.log(element)
            this.test.push(element)
      }
    
      })
      console.log("------- -----------------------------")
  }
}
}
</script>

