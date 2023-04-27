
<template>
  <div>
    <v-stage ref="stage" :config="stageSize" @click="handlerclik">
      <v-layer>
        <v-rect  
          :config="{
            width: tailleGrille*120-20,
            height: tailleGrille*120-20,
            fill: 'gray',
          }"
          :stage="stage"
        />        
        <Rect :stage="stage" :tailleGrille="tailleGrille"  />
        <BarrierEmpl :stage="stage" :tailleGrille="tailleGrille"/>
        <BarrierObj :stage="stage" :nbBarriere="nbBarriere" :tailleGrille="tailleGrille"/>
        <Circ :stage="stage" :listePion="listePion" :tailleGrille="tailleGrille"/>
      </v-layer>
    </v-stage>
  </div>
</template>


<script >
  import Rect from "./components/rect.vue";
  import Circ from "./components/circle.vue";
  import BarrierEmpl from "./components/barriere_empl.vue";
  import BarrierObj from "./components/barriere_obj.vue";
  const width = window.innerWidth;
  const height = window.innerHeight;
   

  export default {
    
    data() 
    {
      return {
        tailleGrille : 5,
        nbBarriere : 3,
        listePion : ["vic","mat","lou","lij"],
        stageSize: {
          width: width,
          height: height,
        },
        elem: null,
        cell: null
      };
    },
    components:
    {
      Rect,Circ,BarrierEmpl,BarrierObj
    },
  computed: {
    stage() {
      return this.$refs.stage;
    }
  },
  methods:{
  }
};
</script>