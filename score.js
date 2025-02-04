let score = 0
let scoreElement
export function addScore() {
    // Create a new div element for the score
    scoreElement = document.createElement('div')
    scoreElement.id = 'scoreDisplay'
    scoreElement.textContent = `Score: ${score}`

    // Get the game container and insert the score element before it
    const gameContainer = document.getElementById('gameContainer')
    gameContainer.parentNode.insertBefore(scoreElement, gameContainer)
}

export function updateScore(points) {
    score += points;
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}

export function resetScore() {
    score = 0;
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}
