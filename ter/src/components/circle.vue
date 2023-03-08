<template>
  <div>
    <template v-for="(p,i) in listePion" :key="`${p}`">
    <v-circle 
        :config="{
          x: pionData[i][0],
          y: pionData[i][1],
          radius: 40,
          fill: pionData[i][2]
        }"
        :stage="stage"
      />
    </template>
  </div>
</template>

  
<script>
  export default{
    props: ['stage','listePion','tailleGrille'],
    computed: {
      pionData() {
        const pionData = [
          [((this.tailleGrille)/2)*120-10,50,"green"],
          [this.tailleGrille*120-70,((this.tailleGrille)/2)*120-10,"blue"],
          [((this.tailleGrille)/2)*120-10,this.tailleGrille*120-70,"red"],
          [50,((this.tailleGrille)/2)*120-10,"purple"]
        ];
        return pionData;
      },
    },
  };

</script>