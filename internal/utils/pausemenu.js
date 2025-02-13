import { gameInterval, setGameInterval, update, setIsPaused, isPaused, gameIsOver } from './utils.js';
import { resetTimer } from '../game/timer.js';
import { resetScore, rewriteScore } from '../game/score.js';
import { loadLevel, currentLevel } from '../entities/levelGenerator.js';

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


		const pauseText = document.createElement('p')
		pauseText.textContent = 'Game is paused!'
		pauseText.id = 'pauseText'
		pauseText.style.fontSize = '24px'

		const pauseExplain = document.createElement('p')
		pauseExplain.textContent = '(Press escape or click the Pause/Continue button to return to the game.)'
		pauseExplain.id = "pauseExplain"
		pauseExplain.style.fontSize = '18px'

        // Create menu options
        const continueButton = document.createElement('button')
        continueButton.textContent = 'Continue'
		continueButton.id = 'continueButton'
        continueButton.addEventListener('click', resumeGame)


		const restartLevelButton = document.createElement('button')
		restartLevelButton.textContent = 'Restart level'
		restartLevelButton.id ='restartLevelButton'
		restartLevelButton.addEventListener('click', restartLevel)

        const restartGameButton = document.createElement('button')
        restartGameButton.textContent = 'Restart game'
		restartGameButton.id ='restartGameButton'
        restartGameButton.addEventListener('click', restartGame)

		menuContainer.appendChild(pauseText)
		menuContainer.appendChild(pauseExplain)
        menuContainer.appendChild(continueButton)
        menuContainer.appendChild(document.createElement('br'))
		menuContainer.appendChild(restartLevelButton)
        menuContainer.appendChild(document.createElement('br'))
        menuContainer.appendChild(restartGameButton)

        pauseOverlay.appendChild(menuContainer)
        document.body.appendChild(pauseOverlay)
    }

	function pauseMenuButton() {
		var pauseButton = document.createElement('button')
		pauseButton.id = 'pauseButton'
		pauseButton.textContent = 'Pause'
		pauseButton.addEventListener('click', handlePauseButton)
		document.body.appendChild(pauseButton)
	}

    function showPauseMenu() {
        setIsPaused(true)
        pauseOverlay.style.display = 'block'
        gameContainer.classList.add('blurred')
        cancelAnimationFrame(gameInterval)
    }

    function hidePauseMenu() {
        setIsPaused(false)
        pauseOverlay.style.display = 'none'
        gameContainer.classList.remove('blurred')
        setGameInterval(requestAnimationFrame(update));
    }

    function resumeGame() {
        hidePauseMenu()
    }

	function restartLevel() {
        hidePauseMenu()
        rewriteScore();
        loadLevel(currentLevel);
	}

    function restartGame() {
        hidePauseMenu()
        resetTimer()
        resetScore()
        document.body.innerHTML = ''
        
        // Change it to use initGame() instead
        location.reload()
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
			if (!gameIsOver) {
				if (isPaused) {
					hidePauseMenu()
				} else {
					showPauseMenu()
				}
			}
        }
    }

	function handlePauseButton() {
		if (!gameIsOver) {
			if (isPaused) {
				hidePauseMenu()
			} else {
				showPauseMenu()
			}
		}
	}

    createPauseMenu()
	pauseMenuButton()

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