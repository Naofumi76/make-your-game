import { isPaused, setIsPaused } from "../utils/utils.js"

let timer = 5
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
        if (timer > 0 && !isPaused) {
            timer -= 1
            timerElement.textContent = `${timer}s`
        } else if (timer === 0) {
            clearInterval(timerInterval)
            var gameOver = document.createElement('div')
			gameOver.textContent = 'Game Over!'
			gameOver.style.fontSize = '48px'
			gameOver.style.position = 'absolute'
			gameOver.style.top = '50%'
			gameOver.style.left = '50%'
			gameOver.style.transform = 'translate(-50%, -50%)'
			gameOver.style.color = "rgb(248, 0, 0)";
			gameContainer.appendChild(gameOver)
			setIsPaused(true)
        }
    }, 1000)
}

export function resetTimer() {
    timer = 500
    if (timerElement) {
        timerElement.textContent = `Score: ${timer}`;
    }
}
