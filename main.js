import { generateLevel } from "./levelGenerator.js"

// Get the game container element
const gameContainer = document.getElementById('gameContainer')

// Get the paddle element
const paddle = document.getElementById('paddle')

// Get the ball element
const ball = document.getElementById('ball')

// Add event listeners for keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        let newLeft = paddle.offsetLeft - 10

        // Check if the new position is within the game container boundaries
        if (newLeft >= 0) {
            paddle.style.left = newLeft + 'px'
        }

    } else if (event.key === 'ArrowRight') {
        let newLeft = paddle.offsetLeft + 10

        // Get the game container dimensions
        let containerWidth = gameContainer.offsetWidth
        let paddleWidth = paddle.offsetWidth

        // Check if the new position is within the game container boundaries
        if (newLeft <= containerWidth - paddleWidth) {
            paddle.style.left = newLeft + 'px'
        }

    }
})

generateLevel(1)