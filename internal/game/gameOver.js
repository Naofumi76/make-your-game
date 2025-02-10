import { setIsPaused, setGameIsOver } from "../utils/utils.js";
import { nextLevel } from "../entities/levelGenerator.js";
export function gameOver() {
    setIsPaused(true); // Pause the game when the game over condition is met
    setGameIsOver(true);

    showGameOverScreen(); // Show the new game over screen
}


function showGameOverScreen() {


    let gameContainer = document.getElementById('gameContainer');

    // Check if the game-over screen already exists
    let existingOverlay = document.getElementById('gameOverOverlay');
    if (existingOverlay) {
        existingOverlay.style.display = 'block';
        return;
    }

    // Create overlay
    let gameOverOverlay = document.createElement('div');
    gameOverOverlay.id = 'gameOverOverlay';

    // Create container for message and buttons
    let gameOverContainer = document.createElement('div');
    gameOverContainer.id = 'gameOverContainer';

    // Game Over message
    let gameOverMessage = document.createElement('h1');
    gameOverMessage.textContent = 'Game Over!';
    gameOverMessage.style.color = 'black';

    let nextLvlButton = document.createElement('button');
    nextLvlButton.textContent = 'Next Lvl';
    //nextLvlButton.addEventListener('click', nextLevel);

    // Restart button
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', restartGame);

    // Append elements
    gameOverContainer.appendChild(gameOverMessage);
    gameOverContainer.appendChild(document.createElement('br'));
    gameOverContainer.appendChild(nextLvlButton);
    gameOverContainer.appendChild(restartButton);

    gameOverOverlay.appendChild(gameOverContainer);
    gameContainer.appendChild(gameOverOverlay);

    gameOverOverlay.style.display = 'block';
}

// Ensure restartGame() properly resets the game
function restartGame() {
    document.body.innerHTML = ''; // Clear everything
    location.reload(); // Reload the page to reset the game
}
