let timer = 500
let timerElement
let timerInterval
export function addTimer() {
    // Create a new div element for the score
    timerElement = document.createElement('div')
    timerElement.id = 'timerDisplay'
    timerElement.textContent = `${timer}s`

    // Get the game container and insert the score element before it
    const gameContainer = document.getElementById('gameContainer')
    gameContainer.parentNode.insertBefore(timerElement, gameContainer)
}

export function timerClock() {
    // Clear any existing interval to prevent multiple timers running
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer -= 1;
            timerElement.textContent = `${timer}s`;
        } else {
            clearInterval(timerInterval); // Stop the timer at 0
            alert("Game Over!"); // Or trigger a game over function
        }
    }, 1000); // Run every second
}

export function resetTimer() {
    timer = 500
    if (timerElement) {
        timerElement.textContent = `Score: ${timer}`;
    }
}
