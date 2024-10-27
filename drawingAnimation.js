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

//connects the DOM to our JS code
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);


let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', 
            perimeter * timeRemaining / duration - perimeter
        );

    },

    onComplete() {
        console.log('Timer is completed.')
    }
});

//'this' referst to the instance of the timer class
//timer.start();