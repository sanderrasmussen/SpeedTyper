class Timer{
    startTime: number = 60;

    time: number = this.startTime;
    active: boolean = false;
    startTimer(){
        if(this.active){
            return;
        }
        this.active = true;
        this.time = this.startTime;
        const interval = setInterval(()=>{
            if (this.active){
                this.time--;
            }
         
            if(this.time === 0  || !this.active){
                this.active = false
                clearInterval(interval);
                return 

            }
            
            console.log(this.time);
        }, 1000);
    }
    stopTimer(){
        this.active = false;
    }
    reset(){
        this.active = false;
        this.time = this.startTime; 
    }
}
export default Timer;