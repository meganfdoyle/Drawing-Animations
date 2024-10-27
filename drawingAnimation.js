/*
This program will:
 - Display a timer
    - Number of seconds
    - Play button
    - Pause button
 - Show an animated border around the timer
*/

/*
Determining the value of 'this'
 - Did you define the function with an arrow function?
    - Use console.log(this) on the first valid line above the arrow function. the value of
      'this' in the arrow function will be the same as in the console.log
      
 - Did you call 'bind', 'call', or 'apply' on the function when you invoked it?
    - 'this' is equal to the first argument of 'bind', 'call', or 'apply'
 - All other cases
    - 'this' is equal to whatever is to the left of the '.' in the method call
*/

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
        }
        //listens for a click on the start button
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    };

    //arrow functions are used so that 'this' refers to the class instance
    start = () => {
        if (this.onStart) {
            this.onStart()
        };
        //'this' refers to the buttton
        //console.log(this);
        this.tick();
        //using 'this' allows us to use the variable between methods
        this.interval = setInterval(this.tick, 1000);
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
            this.timeRemaining = this.timeRemaining - 1;
            if (this.onTick) {
                this.onTick();
            }
        };
    };

    get timeRemaining() {
        //changes the value of durationInput (string) into a float value and returns it
        return parseFloat(this.durationInput.value);
    };

    set timeRemaining(time) {
        this.durationInput.value = time;
    };
};

//connects the DOM to our JS code
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log('Timer started');
    },
    
    onTick() {
        console.log('Timer just ticked down.')
    },

    onComplete() {
        console.log('Timer is completed.')
    }
});

//'this' referst to the instance of the timer class
//timer.start();