import {  pauseMenu } from "../utils/pausemenu.js"
import { isPaused } from "../utils/utils.js"
import { bricks } from "./levelGenerator.js"


// Get the paddle element
 export const paddle = document.getElementById('paddle')

paddle.unbreakable = true;

 bricks.push(paddle)

// Create the paddle velocity
let paddleVelocity = 0


// Add event listeners for keyboard input
document.addEventListener('keydown', function(event) {
    if (!isPaused) {
        if (event.key === 'ArrowLeft') {
            paddleVelocity -= 5
        } else if (event.key === 'ArrowRight') {
            paddleVelocity += 5
        }
    }
})

// Update the paddle position every frame
 export function updatePaddle() {
	let gameContainer = document.getElementById('gameContainer')
	if (!gameContainer){
		return
	}
    let newLeft = paddle.offsetLeft + paddleVelocity

    // Get the game container dimensions
    let containerWidth = gameContainer.offsetWidth
    let paddleWidth = paddle.offsetWidth

    // Check if the new position is within the game container boundaries
    if (newLeft >= paddleWidth/2 && newLeft <= containerWidth - paddleWidth/2) {
        paddle.style.left = newLeft + 'px'
    }
    paddleVelocity *= 0.8

	if (!isPaused) {
		requestAnimationFrame(updatePaddle)
	}
}