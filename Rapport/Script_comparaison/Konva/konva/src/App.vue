<template>
  <div>
    <v-stage ref="stage" :config="stageSize" @click="handlerclik">
     <v-layer>
      <template v-for="x in  Array.from({length: 9}, (_, i) => i + 1)" :key="x">
          <template v-for="y in  Array.from({length: 9}, (_, i) => i + 1)" :key="y">
              <v-rect  
                :config="{
                    x: 50 * x,
                    y: 50 * y,
                    width: 40,
                    height: 40,
                    fill: 'blue',
                  }"   
              />
          </template>
      </template>
    </v-layer>
   </v-stage>
  </div>
</template>



<script>
  export default {
    data() 
    {
      return {
        stageSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      };
    },
  methods:{
    handlerclik() {
        var theClick =  this.$refs.stage.getNode().getPointerPosition()
        this.$refs.stage.getNode().children[0].children.forEach(element => {

          element.attrs.fill= element.attrs.fill === "blue" ? "blue" : "blue";

          if( theClick.x>=element.attrs.x && 
              theClick.x<=element.attrs.x + element.attrs.width && 
              theClick.y>=element.attrs.y && 
              theClick.y<=element.attrs.y + element.attrs.height){
                element.attrs.fill= element.attrs.fill === "red" ? "blue" : "red";
          }
        })
        this.$refs.stage.getNode().draw();
    },
  }
  };


</script>
