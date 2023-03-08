<template>
  <div>
    <template v-for="lx in range(nbBarriere)" :key="`${lx}`">
      <v-rect  
        :config="{
          x: 1,
          y: 20 * lx + tailleGrille*120,
          width: 90,
          height: 10,
          fill: 'blue',
        }"
        :stage="stage"
      />
    </template>
  </div>
</template>

<script>
export default {
  props:[
    'stage',
    'nbBarriere',
    'tailleGrille'
    ],
  methods: {
    range(n) {
      return Array.from(Array(n).keys())
    },
  },
};
</script>
