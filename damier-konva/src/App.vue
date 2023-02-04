
<template>
  <div>
   <v-stage ref="stage" :config="stageSize" @click="handlerclik">
     <v-layer>
       <Rect :stage="stage"  />
      <Circ :stage="stage"  />
    </v-layer>
   </v-stage>
 </div>
</template>


<script >

  import Rect from "./components/rect.vue";
  import Circ from "./components/circle.vue";
  const width = window.innerWidth;
  const height = window.innerHeight;


  export default {
    
    data() 
    {
      return {
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
      Rect,Circ
    },
  computed: {
    stage() {
      return this.$refs.stage;
    }
  },
  methods:{
    handlerclik(event) {
        var theClick =  this.$refs.stage.getNode().getPointerPosition()

        console.log(theClick.x+" , "+theClick.y)
        const rects = this.$refs.stage.getNode().children[0].children.filter(node => node instanceof Konva.Rect);
        const circles = this.$refs.stage.getNode().children[0].children.filter(node => node instanceof Konva.Circle);

        this.checkConditionsCircle(theClick,circles)
        this.checkConditionsRect(theClick,rects)

        if (this.checkConditionsDeplacement())
        {
          const circle = this.$refs.stage.getNode().findOne('Circle');

          new Konva.Tween(
            {
              node: circle,
              duration: 1, // durée en secondes
              x: this.cell.attrs.x + 50,
              y: this.cell.attrs.y + 50,
              onFinish: () => {
                this.$refs.stage.getNode().draw();
              } 
            } ).play();
          
        }

    },
    checkConditionsDeplacement() {
      if (this.elem  && this.cell )
      {
        return true
      }
      return false
    },
    checkConditionsCircle(theClick,circles){
      circles.forEach(element => {
        if ( theClick.x>=element.attrs.x-element.attrs.radius && theClick.x<=element.attrs.x+element.attrs.radius && theClick.y>=element.attrs.y-element.attrs.radius && theClick.y<=element.attrs.y + element.attrs.radius) 
          {
            this.elem = element; 
          }
      })
    },
    checkConditionsRect(theClick,rects){
      rects.forEach(element => {
        if ( theClick.x>=element.attrs.x && theClick.x<=element.attrs.x + element.attrs.width && theClick.y>=element.attrs.y && theClick.y<=element.attrs.y + element.attrs.height) 
          {
            if (this.elem){
              if ( !(theClick.x>=this.elem.attrs.x-this.elem.attrs.radius && theClick.x<=this.elem.attrs.x+this.elem.attrs.radius && theClick.y>=this.elem.attrs.y-this.elem.attrs.radius && theClick.y<=this.elem.attrs.y + this.elem.attrs.radius)) 
              {
                this.cell = element;
              }
            }
          }
      })
    }

  }
  };

</script>