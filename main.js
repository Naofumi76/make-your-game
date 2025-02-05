import { generateLevel } from "./internal/entities/levelGenerator.js"
import { updateBallPosition} from './internal/entities/ball.js';
import { paddle, updatePaddle } from "./internal/entities/paddle.js";
import {addScore, updateScore} from './internal/game/score.js'
import {pauseMenu } from './internal/utils/pausemenu.js'
import {addTimer, timerClock} from './internal/game/timer.js'
import {isPaused, setGameInterval} from './internal/utils/utils.js'

// Get the game container element
let gameContainer = document.getElementById('gameContainer')
let cleanupPauseMenu

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
    updatePaddle()
    updateBallPosition();
    generateLevel(1)
    setGameInterval(requestAnimationFrame(update));
}

// Call initGame after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame)
