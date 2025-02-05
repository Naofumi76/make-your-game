import { generateLevel, loadLevel } from "./internal/entities/levelGenerator.js"
import { updateBallPosition, collideBallWithBricks, ball } from './internal/entities/ball.js';
import {addScore, updateScore} from './internal/game/score.js'
import {pauseMenu } from './internal/utils/pausemenu.js'
import {addTimer, timerClock} from './internal/game/timer.js'
import {isPaused, setGameInterval} from './internal/utils/utils.js'

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
	loadLevel(1);
	paddle = document.getElementById('paddle')
	updatePaddle()
	updateBallPosition();
	
	setGameInterval(requestAnimationFrame(update));
}

// Call initGame after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame)
