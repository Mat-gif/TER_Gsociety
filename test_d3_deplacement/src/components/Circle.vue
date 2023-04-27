<template>
  <div id="circle"  ></div>
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
  mounted()
  {
    this.svg
      .append("circle")
      .attr("cx", 220)
      .attr("cy", 420)
      .attr("r", 20)
      .attr("id", "pion")
      .style("fill", "green")
  }
};
</script>


