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
    clearInterval(timerInterval)
    
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer -= 1
            timerElement.textContent = `${timer}s`
        } else {
            clearInterval(timerInterval)
            alert("Game Over!")
        }
    }, 1000)
}

export function resetTimer() {
    timer = 500
    if (timerElement) {
        timerElement.textContent = `Score: ${timer}`;
    }
}
