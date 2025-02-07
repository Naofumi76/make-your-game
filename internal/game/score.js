export let score = 0
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

export function getInformations() {
	document.body.textContent = ''
	var infoContainer = document.createElement('div')
	
	var textInfo = document.createElement('p')
	textInfo.textContent = 'Congratulations, you finished the game! Please enter your name to register yourself in the scoreboard.'
	textInfo.id = "textInfo"

    infoContainer.appendChild(textInfo)

	var nameInput = document.createElement('input')
	nameInput.type = 'text'
	nameInput.id = 'nameInput'
	nameInput.required = true

	infoContainer.appendChild(nameInput)

	var submitButton = document.createElement('button')
	submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', function() {
        const name = nameInput.value
        const result = returnInformations(score, name)
        console.log(result)
    })
}

export function returnInformations(score, name) {
	var position = getPosition(score)
	return {
		name: name,
        score: score,
		position: position || -1, 
        date: new Date()
	}
}

export function getPosition(score) {
	// This function should get the position of the user depending on the scoreboard and the player's score.
}