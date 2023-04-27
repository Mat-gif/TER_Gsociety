<template>
  <div>
    <template v-for="lx in range(tailleGrille)">
      <template v-for="ly in range(tailleGrille-1)" :key="`${lx}-${ly}`">
        <v-rect  
          :config="{
            x: 120 * lx + 5,
            y: 120 * ly + 105,
            width: 90,
            height: 10,
            fill: '#c6c6c6',
            className:'barriere_empl'
          }"
          :stage="stage"
        />
      </template>
    </template>
    <template v-for="lx in range(tailleGrille-1)">
      <template v-for="ly in range(tailleGrille)" :key="`${lx}-${ly}`">
        <v-rect  
          :config="{
            x: 120 * lx + 105,
            y: 120 * ly + 5,
            width: 10,
            height: 90,
            fill: '#c6c6c6',
          }"
          :stage="stage"
        />
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    stage: Object,
    tailleGrille: Number
  },
  methods: {
    range(n) {
      return Array.from(Array(n).keys())
    },
  },
};
</script>
