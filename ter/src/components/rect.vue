<template>
  <div>
    <template v-for="lx in range(tailleGrille)">
      <template v-for="ly in range(tailleGrille)" :key="`${lx}-${ly}`">
        <v-rect  
          :config="{
            x: 120 * lx,
            y: 120 * ly,
            width: 100,
            height: 100,
            fill: 'white',
            className:'cellule'
          }"
          :stage="stage"
        />
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props:[
    'stage',
    'tailleGrille'
    ],
  methods: {
    range(n) {
      return Array.from(Array(n).keys())
    },
  },
};
</script>
