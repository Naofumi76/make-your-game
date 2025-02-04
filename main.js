import { updateBallPosition, ball } from './ball.js';

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
        console.log(paddle.style.left)
    }
    paddleVelocity *= 0.8

    requestAnimationFrame(updatePaddle)
}

function createBricks() {
    const brickWidth = 50
    const brickHeight = 20
    const brickMargin = 0
    const containerWidth = gameContainer.offsetWidth;

    const containerHeight = gameContainer.offsetHeight;

    const columns = Math.floor((containerWidth - brickMargin) / (brickWidth + brickMargin));
    
    // Calculate the maximum number of rows
    const paddleSpaceHeight = 5 * (brickHeight + brickMargin); // Space for 5 bricks above paddle
    const availableHeight = containerHeight - paddleSpaceHeight;
    const maxRows = Math.floor(availableHeight / (brickHeight + brickMargin));
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < columns; j++) {
            const brick = document.createElement('div')
            brick.classList.add('brick')
            brick.style.width = brickWidth + 'px'
            brick.style.height = brickHeight + 'px'
            brick.style.position = 'absolute'
            brick.style.left = (j * (brickWidth + brickMargin) + brickMargin) + 'px'
            brick.style.top = (i * (brickHeight + brickMargin) + brickMargin) + 'px'
            gameContainer.appendChild(brick)
        }
    }
}

// Initialize the game
function initGame() {
    updatePaddle();
    updateBallPosition();
    //createBricks();
}

// Call initGame after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame)