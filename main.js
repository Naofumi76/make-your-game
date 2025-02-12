import { loadLevel } from "./internal/entities/levelGenerator.js"
import {addScore, updateScore} from './internal/game/score.js'
import {pauseMenu } from './internal/utils/pausemenu.js'
import {addTimer, timerClock} from './internal/game/timer.js'
import {isPaused, setGameInterval} from './internal/utils/utils.js'
import { scoreboardButton } from "./internal/game/score.js";
import { addLives } from "./internal/entities/lives.js";

// Get the game container element
let gameContainer = document.getElementById('gameContainer')
let cleanupPauseMenu

// Export the update function
export function update() {
	setGameInterval(requestAnimationFrame(update));
}

// Initialize the game
async function initGame() {
    addScore();
    loadLevel(3);
    addTimer();
    addLives();
    timerClock();
    if (cleanupPauseMenu) {
        cleanupPauseMenu(); // Remove old pause menu listener if it exists
    }
    cleanupPauseMenu = pauseMenu(); // Set up new pause menu and store the cleanup function

    
    setGameInterval(requestAnimationFrame(update));
}

// Call initGame after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initGame);