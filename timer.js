class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        //makes callbacks optional arguments
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        };

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    };

    //arrow functions are used so that 'this' refers to the class instance
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining)
        };
        //'this' refers to the buttton
        //console.log(this);
        this.tick();
        //using 'this' allows us to use the variable between methods
        this.interval = setInterval(this.tick, 20);
    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - 0.02;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        };
    };

    get timeRemaining() {
        //changes the value of durationInput (string) into a float value and returns it
        return parseFloat(this.durationInput.value);
    };

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    };
};