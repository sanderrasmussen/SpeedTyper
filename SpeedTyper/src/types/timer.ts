class Timer{
    startTime: number = 20;

    time: number = this.startTime;
    active: boolean = false;
    startTimer(){
        if(this.active){
            return;
        }
        this.active = true;
        this.time = this.startTime;
        const interval = setInterval(()=>{
            if (!this.active){
                clearInterval(interval);
                return 
            }
            this.time--;
            if(this.time === 0){
                this.active = false
                clearInterval(interval);
            }
            
            console.log(this.time);
        }, 1000);
    }
    reset(){
        this.active = false;
        this.time = this.startTime; 
    }
}
export default Timer;