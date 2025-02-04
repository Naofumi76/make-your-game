import { generateLevel } from "./levelGenerator.js"
import { updateBallPosition, collideBallWithBricks, ball } from './ball.js';

// Get the game container element
const gameContainer = document.getElementById('gameContainer')

// Get the paddle element
const paddle = document.getElementById('paddle')

// Create the paddle velocity
let paddleVelocity = 0

// Add event listeners for keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        paddleVelocity -= 5
    } else if (event.key === 'ArrowRight') {
        paddleVelocity += 5
    }
})


// Update the paddle position every frame
function updatePaddle() {
    let newLeft = paddle.offsetLeft + paddleVelocity

    // Get the game container dimensions
    let containerWidth = gameContainer.offsetWidth
    let paddleWidth = paddle.offsetWidth

    // Check if the new position is within the game container boundaries
    if (newLeft >= paddleWidth/2 && newLeft <= containerWidth - paddleWidth/2) {
        paddle.style.left = newLeft + 'px'
        //console.log(paddle.style.left)
    }
    paddleVelocity *= 0.8

    requestAnimationFrame(updatePaddle)
}

// Initialize the game
function initGame() {
    updatePaddle();
    updateBallPosition();
    generateLevel(1)
}

// Call initGame after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame)
