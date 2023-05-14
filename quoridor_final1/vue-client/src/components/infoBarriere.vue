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

<style >
.myBar{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0B0B0B;
    /*box-shadow: rgba(255, 0, 0, 0.35) 0px 5px 15px;*/
    /*border: 2px solid #0b5ed7;*/
    color: #0c63e4;
    text-align: center;
    /*margin: auto;*/
    width: 50%;
    height: 500px;
    padding: 10px;
    /*margin-top: 20px;*/
    padding-left: 30px;
    padding-right: 30px;

}

.bar{
    margin:auto;
    width: 100%; /* Make sure .bar takes up the full width of the container */

}
.myBar .progress {

    height: 30px;
    width: 300px;
    /*background: linear-gradient(to right, #FF5733 20%, #FFC300 50%, #33FF57 80%);*/
    background-color: #333363;
    border-radius: 0px;
    transform: rotate(-90deg); /* rotate the progress bar 90 degrees clockwise */
    /*transform-origin: 0 0; !* set the origin of the rotation to the top left corner *!*/
 }

.progress-bar {
    height: 30px;
    background-color: #0d6efd;
}
</style>