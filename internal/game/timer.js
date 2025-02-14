import { isPaused, gameIsOver } from "../utils/utils.js"
import { gameOver } from "./gameOver.js"

let timer = 60
export const initialTimer = timer
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

export function getTimer() {
	return timer
}

export function timerClock() {
    clearInterval(timerInterval)
    
    timerInterval = setInterval(() => {
        if (timer > 0 && !isPaused) {
            timer -= 1
            timerElement.textContent = `${timer}s`
        } else if (timer === 0 && !gameIsOver) {
            gameOver(); 
        }
    }, 1000)
}

export function resetTimer() {
    timer = initialTimer
    console.log(timer)
    if (timerElement) {
        timerElement.textContent = `${timer}s`;
    }
}
