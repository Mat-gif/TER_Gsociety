<template>

    <div class="container" >
        <div ><p style="text-align: center; color: #0d6efd ">Murs : {{ new_nb_Walls }}/{{nb_Walls}}</p></div>
            <div class="myBar">
                <div class="bar center">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth }"> </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>

export default {
    name: "infoBarriere",
    props:["username","nb_Walls","socket"],
    data(){
        return{
            new_nb_Walls : null,
            myValue: 100
        }
    },mounted() {
        this.new_nb_Walls = this.nb_Walls
        this.socket.on('majBar', () => {
            this.new_nb_Walls--;
            this.myValue = (this.new_nb_Walls/this.nb_Walls)*100;
        })
    },
    computed: {
        progressBarValue() {
            return this.myValue;
        },
        progressBarWidth() {
            return `${this.myValue}%`;
        }
    }
}



</script>

<style scoped >

@media (min-width: 1024px) {
  .container {
    text-align: center;
    color: #0d6efd;
  }

  .myBar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0B0B0B;
    color: #0c63e4;
    width: 50%;
    height: 50vh;
    margin: auto;
  }


  .bar {
    width: 40vh;
  }

  .myBar .progress {
    height: 4vh;
    width: 100%;
    background-color: #333363;
    border-radius: 0;
    transform: rotate(-90deg);
    border: 2px solid #0b5ed7;
  }

  .progress-bar {
    height: 4vh;
    background-color: #0d6efd;
  }
}
</style>