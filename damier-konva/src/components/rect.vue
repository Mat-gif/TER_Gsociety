<template>
      <div>
        <template v-for="lx in [1,2,3,4,5]">
            <template v-for="ly in [1,2,3,4,5]">
                <v-rect  
                  :config="{
                      x: 120 * lx,
                      y: 120 * ly,
                      width: 100,
                      height: 100,
                      fill: 'red',
                    }"   
                    :stage="stage"
                />
            </template>
        </template>
      </div>
</template>
  

<script>

  export default 
  {
    props: ['stage'],
  
  };
</script>