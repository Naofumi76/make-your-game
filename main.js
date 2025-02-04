// Get the game container element
const gameContainer = document.getElementById('gameContainer')

// Get the paddle element
let paddle = document.getElementById('paddle')

// Get the ball element
let ball = document.getElementById('ball')


let cleanupPauseMenu


// Create the paddle velocity
let paddleVelocity = 0

// Pause menu status
let isPaused = false

// Add event listeners for keyboard input
document.addEventListener('keydown', function(event) {
    if (!isPaused) {
        if (event.key === 'ArrowLeft') {
            paddleVelocity -= 5
        } else if (event.key === 'ArrowRight') {
            paddleVelocity += 5
        }
    }
})

// Update the paddle position every frame
function updatePaddle() {
    let newLeft = paddle.offsetLeft + paddleVelocity

    // Get the game container dimensions
    let containerWidth = gameContainer.offsetWidth
    let paddleWidth = paddle.offsetWidth

    // Check if the new position is within the game container boundaries
    if (newLeft >= paddleWidth/2 && newLeft <= containerWidth - paddleWidth/2) {
        paddle.style.left = newLeft + 'px'
    }
    paddleVelocity *= 0.8

    requestAnimationFrame(updatePaddle)
}

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

function pauseMenu() {
    let pauseOverlay
    let menuContainer
    let escapeKeyListener

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
        gameInterval = requestAnimationFrame(update)
    }

    function resumeGame() {
        hidePauseMenu()
    }

    function restartGame() {
        hidePauseMenu()
        gameContainer.innerHTML = ''
        paddleVelocity = 0
        initGame()
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


function createPaddle() {
    var paddle = document.createElement('div')
    paddle.id = 'paddle'
    gameContainer.appendChild(paddle)
}

function createBall() {
    var ball = document.createElement('div')
    ball.id = 'ball'
    gameContainer.appendChild(ball)
}

function update() {    
    gameInterval = requestAnimationFrame(update)
}
// Initialize the game
function initGame() {
    createBall()
    createPaddle()
    createBricks()
    if (cleanupPauseMenu) {
        cleanupPauseMenu() // Remove old pause menu listener if it exists
    }
    cleanupPauseMenu = pauseMenu() // Set up new pause menu and store the cleanup function
    paddle = document.getElementById('paddle')
    ball = document.getElementById('ball')
    updatePaddle()
    gameInterval = requestAnimationFrame(update)
}

// Call initGame after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame)