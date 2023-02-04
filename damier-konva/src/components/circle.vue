<template>
        <v-circle 
            :config="{
                x: 410,
                y: 170,
                radius: 50,
                fill: 'blue'
            }"
             :stage="stage"
        />
  </template>
  
  <script>
  export default 
  {
    props: ['stage'],
  };
  </script>