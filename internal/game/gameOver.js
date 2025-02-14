import { setIsPaused, setGameIsOver, dataLooseWin, getDataImg } from "../utils/utils.js";
import { ball, currentLevel, loadLevel, maxLevel } from "../entities/levelGenerator.js";
import { getInformations, score, preLevelScore, rewriteScore, scoreRequired } from "./score.js";
import { createDialogueOverlay } from "./historyOverlay.js";
export function gameOver() {
    setIsPaused(true); // Pause the game when the game over condition is met
    setGameIsOver(true);

    showGameOverScreen(); // Show the new game over screen
}


function showGameOverScreen() {

    console.log(ball)

    ball.forEach(balls => {
        balls.removeBall()        
    });

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
    gameOverMessage.style.color = 'red';

    
    // Restart button
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart game';
    restartButton.addEventListener('click', restartGame);

    let restartLevelButton = document.createElement('button');
    restartLevelButton.textContent = 'Restart level';
    restartLevelButton.addEventListener('click', () => restartLevel());

    // Append elements
    gameOverContainer.appendChild(gameOverMessage);
    gameOverContainer.appendChild(document.createElement('br'));
    gameOverContainer.appendChild(restartButton);
    gameOverContainer.appendChild(restartLevelButton);

    gameOverOverlay.appendChild(gameOverContainer);
    gameContainer.appendChild(gameOverOverlay);

    if (currentLevel === maxLevel) {
        let nextLvlButton = document.createElement('button');
        nextLvlButton.textContent = 'Scoreboard';
        nextLvlButton.addEventListener('click', getInformations);
        
        gameOverContainer.appendChild(nextLvlButton);

        createDialogueOverlay(getDataImg()[0][0],
            getDataImg()[0][0],
            dataLooseWin[1])

    } else if(score >= scoreRequired[currentLevel]) {
        
        let nextLvlButton = document.createElement('button');
        nextLvlButton.textContent = 'Next Lvl';
        let temp = currentLevel + 1
        nextLvlButton.addEventListener('click',() => loadLevel(temp));
        gameOverContainer.appendChild(nextLvlButton);     
    } else{
        createDialogueOverlay(getDataImg()[0][0],
            getDataImg()[0][0],
            dataLooseWin[0])
        
    }


    gameOverOverlay.style.display = 'block';
}

// Ensure restartGame() properly resets the game
function restartGame() {
    document.body.innerHTML = ''; // Clear everything
    location.reload(); // Reload the page to reset the game
}

export function restartLevel(){
    rewriteScore();
    loadLevel(currentLevel);
}