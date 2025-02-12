import { loadLevel } from "./internal/entities/levelGenerator.js"
import {addScore, updateScore} from './internal/game/score.js'
import {pauseMenu } from './internal/utils/pausemenu.js'
import {addTimer, timerClock} from './internal/game/timer.js'
import {isPaused, setGameInterval} from './internal/utils/utils.js'
import { scoreboardButton } from "./internal/game/score.js";
import { addLives } from "./internal/entities/lives.js";
import { createDialogueOverlay } from "./internal/game/historyOverlay.js"

// Get the game container element
let gameContainer = document.getElementById('gameContainer')
let cleanupPauseMenu

const dialogues = [
    { text: "Hello, how are you?", speaker: "left" },
    { text: "I'm doing great! What about you?", speaker: "right" },
    { text: "Pretty good. Ready for our adventure?", speaker: "left" },
    { text: "Absolutely! Let's get started.", speaker: "right" }
];

// Export the update function
export function update() {
	setGameInterval(requestAnimationFrame(update));
}

// Initialize the game
async function initGame() {

    createDialogueOverlay("static/images/character1.png",
    "static/images/character2.png",
    dialogues
)

    addScore();
    loadLevel(1);
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