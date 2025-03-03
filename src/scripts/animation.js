'use strict';

// Declare variables
const startButton = document.getElementById('animation-btn');
const recordDiv = document.getElementById('vinyl-record');
const armDiv = document.getElementById('tone-arm');

// Declare functions
function startAnimation(){
    startButton.disabled = true; /* Prevent button from being used until the animation is over */
    recordDiv.classList.add('play-animation1');
    armDiv.classList.add('play-animation2');
    setTimeout(() => { /* Reset elements */
        recordDiv.classList.remove('play-animation1');
        armDiv.classList.remove('play-animation2');
        startButton.disabled = false;
    }, 10000);
}

// Event handler
startButton.addEventListener('click', startAnimation);

