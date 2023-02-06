<template>
    <div id="rectangle" ></div>
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
            for(let j=0; j < 9; j++) {
            svg
            .append("rect")
            .attr("x", i*50)
            .attr("y", j*50)
            .attr("width", 40)
            .attr("height", 40)
            .attr("id", "("+i*50+","+j*50+")")
            .style("fill", "blue")
            svg
            .append("text")
            .text("("+i+","+j+")")
            .attr("x", (i*50)+5)
            .attr("y", (j*50)+25)
            .style("fill", "white")
        }
        
      }
    }
  };
  </script>