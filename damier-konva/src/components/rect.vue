<template>
    <div>
      <v-stage ref="stage" :config="stageSize">
        <v-layer >
          <template v-for="lx in [1,2,3,4,5]"  >
            <template v-for="ly in [1,2,3,4,5]"  >
              <v-rect @click="handleClick" :config="{
                x: 120 * lx,
                y: 120 * ly,
                width: 100,
                height: 100,
                fill: 'red',
              }"
            />
            </template>
          </template>
        </v-layer>
      </v-stage>
    </div>
  </template>
  
  <script>
  const width = window.innerWidth;
  const height = window.innerHeight;
  let vm = {};
  export default {
    data() {
      return {
        stageSize: {
          width: width,
          height: height
        }
      };
    },
    methods: {
      handleClick(event) {
        var theClick = this.$refs.stage.getNode().getPointerPosition(); //getNode() : cette méthode retourne le nœud DOM correspondant à l'élément stage

        console.log(theClick.x+" , "+theClick.y)

        this.$refs.stage.getNode().children[0].children.forEach(child => 
        {
          if(child.attrs.fill === "blue") // pour reinitialiser l'ancienne couleur
          {
            child.attrs.fill = "red";
          }
          else if  ( theClick.x>=child.attrs.x && theClick.x<=child.attrs.x + child.attrs.width && theClick.y>=child.attrs.y && theClick.y<=child.attrs.y + child.attrs.height) 
          {
              child.attrs.fill =  child.attrs.fill === "red" ? "blue" : "red";
          }
        })
        this.$refs.stage.getNode().draw();
      }

    }
  };
  </script>