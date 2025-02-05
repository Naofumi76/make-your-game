import { generateLevel } from "./levelGenerator.js"
import { updateBallPosition, collideBallWithBricks, ball } from './ball.js';
import {addScore, updateScore} from './score.js'
import {pauseMenu } from './pausemenu.js'
import {addTimer, timerClock} from './timer.js'
import {isPaused, setGameInterval} from './utils.js'

// Get the game container element
let gameContainer = document.getElementById('gameContainer')

// Get the paddle element
let paddle = document.getElementById('paddle')

let cleanupPauseMenu


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
function updatePaddle() {
    let newLeft = paddle.offsetLeft + paddleVelocity

    // Get the game container dimensions
    let containerWidth = gameContainer.offsetWidth
    let paddleWidth = paddle.offsetWidth

    // Check if the new position is within the game container boundaries
    if (newLeft >= paddleWidth/2 && newLeft <= containerWidth - paddleWidth/2) {
        paddle.style.left = newLeft + 'px'
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



function createPaddle() {
    var paddle = document.createElement('div')
    paddle.id = 'paddle'
    gameContainer.appendChild(paddle)
}

function createBall() {
    var ball = document.createElement('div')
    ball.id = 'ball'
    gameContainer.appendChild(ball)
}

// Export the update function
export function update() {
    setGameInterval(requestAnimationFrame(update));
}

// Initialize the game
function initGame() {
    addScore()
    addTimer()
    timerClock()
    if (cleanupPauseMenu) {
        cleanupPauseMenu() // Remove old pause menu listener if it exists
    }
    cleanupPauseMenu = pauseMenu() // Set up new pause menu and store the cleanup function
    paddle = document.getElementById('paddle')
    updatePaddle()
    updateBallPosition();
    generateLevel(1)
    setGameInterval(requestAnimationFrame(update));
}

// Call initGame after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame)
