
export let lives = 0; 

let livesElement;

export function addLives() {
    // Create a new div element for the lives
    livesElement = document.createElement('div')
    livesElement.id = 'livesDisplay'
    livesElement.textContent = `lives: ${lives}`

    // Get the game container and insert the lives element before it
    const gameContainer = document.getElementById('gameContainer')
    gameContainer.parentNode.insertBefore(livesElement, gameContainer)
}

export function updateLives() {
    lives--;

    if (livesElement) {
        livesElement.textContent = `lives: ${lives}`;
    }
}

export function resetLives() {
    lives =3 ;
    if (livesElement) {
        livesElement.textContent = `lives: ${lives}`;
    }
}

