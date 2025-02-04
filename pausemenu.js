import { gameInterval, setGameInterval, update } from './utils.js';
import { resetTimer } from './timer.js';
import { resetScore } from './score.js';

// Pause menu status
export let isPaused = false;

export function pauseMenu() {
    let pauseOverlay;
    let menuContainer;
    let escapeKeyListener;
    let gameContainer = document.getElementById('gameContainer');

    function createPauseMenu() {
        // Create overlay
        pauseOverlay = document.createElement('div')
        pauseOverlay.id = 'pauseOverlay'

        // Create menu container
        menuContainer = document.createElement('div')
        menuContainer.id = 'menuContainer'

        // Create menu options
        const continueButton = document.createElement('button')
        continueButton.textContent = 'Continue'
        continueButton.addEventListener('click', resumeGame)

        const restartButton = document.createElement('button')
        restartButton.textContent = 'Restart'
        restartButton.addEventListener('click', restartGame)

        menuContainer.appendChild(continueButton)
        menuContainer.appendChild(document.createElement('br'))
        menuContainer.appendChild(document.createElement('br'))
        menuContainer.appendChild(restartButton)

        pauseOverlay.appendChild(menuContainer)
        gameContainer.appendChild(pauseOverlay)
    }

    function showPauseMenu() {
        isPaused = true
        pauseOverlay.style.display = 'block'
        gameContainer.classList.add('blurred')
        cancelAnimationFrame(gameInterval)
    }

    function hidePauseMenu() {
        isPaused = false
        pauseOverlay.style.display = 'none'
        gameContainer.classList.remove('blurred')
        setGameInterval(requestAnimationFrame(update));
    }

    function resumeGame() {
        hidePauseMenu()
    }

    function restartGame() {
        hidePauseMenu()
        resetTimer()
        resetScore()
        document.body.innerHTML = ''
        // Remove paddleVelocity as it's not defined in this scope
        // paddleVelocity = 0;
        location.reload(); // This will reload the page, effectively restarting the game
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            if (isPaused) {
                hidePauseMenu()
            } else {
                showPauseMenu()
            }
        }
    }

    createPauseMenu()

    // Remove the old event listener if it exists
    if (escapeKeyListener) {
        document.removeEventListener('keydown', escapeKeyListener)
    }

    // Add the new event listener
    escapeKeyListener = handleEscapeKey
    document.addEventListener('keydown', escapeKeyListener)

    // Return a function to remove the event listener
    return function cleanup() {
        document.removeEventListener('keydown', escapeKeyListener)
    }
}