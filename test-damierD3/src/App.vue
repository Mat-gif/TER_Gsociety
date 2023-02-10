<template>
  <div>
    <Rectangle :svg="svg" />
    <Grille :svg="svg" />
    <Circle :svg="svg" />
  </div>
</template>

<script>
import Circle from "./components/Circle.vue";
import Rectangle from "./components/Rectangle.vue";
import Grille from "./components/Grille.vue";
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
      t:8
    }
  },
  components: {
    Circle,Rectangle,Grille
  },
  mounted() {
    d3.selectAll("rect").on("click",  () =>{
      this.cell = d3.select(event.currentTarget)
      this.transitionPion();
    })

    d3.selectAll("rect").on("mouseover",  () =>{
      d3.select(event.currentTarget).transition()
               .duration('50')
               .style("opacity", 0.5);
  
    })
    d3.selectAll("rect").on("mouseout",  () =>{
      d3.select(event.currentTarget).transition()
               .duration('50')
               .style("opacity", 1);
  
    })


    d3.selectAll("circle").on("click",  () => {
      this.pion =d3.select(event.currentTarget) //sélectionner l'élément cible de l'événement

      this.cellulesproche();
    })
  },
  methods: {
    transitionPion() {
    if (this.pion !== null && this.cell !== null && this.test.indexOf(this.cell.node()) !== -1) {
      this.victoire();
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
  },
  victoire(){
      
      var dif = parseInt(this.pion.node().getAttribute("cy"))-parseInt(this.cell.node().getAttribute("y"))
      console.log(dif)
      if(dif > 20 ) {
        this.t = this.t-1
        console.log(this.t)
        if (this.t === 0) {
          console.log (this.t +" = "+ "victoire")
        }
      }else if (dif <20) {
      this.t = this.t+1
      console.log(this.t)
      if (this.t === 0) {
        console.log (this.t +" = "+ "victoire")
      }
      }
      


  }
}
}
</script>

