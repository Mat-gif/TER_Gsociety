<template>
    <div id="grille" ></div>
</template>
  

  <script>

  export default 
  {
    props: {
    svg: {
      type: Object,
      required: true
      }
    },
    mounted() {
        const svg = this.svg
        for (let i = 0; i < 9; i++) {
            for(let j=0; j < 8; j++) {
            svg
            .append("rect")
            .attr("x", i*50)
            .attr("y", (j*50)+40)
            .attr("width", 40)
            .attr("height", 10)
            .style("fill", "red")

            svg
            .append("rect")
            .attr("x", 40+(j*50))
            .attr("y", (i*50))
            .attr("width", 10)
            .attr("height", 40)
            .style("fill", "yellow")
        }
       
        
      }
    }
  };
  </script>