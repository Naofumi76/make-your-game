// Get the game container element
const gameContainer = document.getElementById('gameContainer')

// Get the paddle element
const paddle = document.getElementById('paddle')

// Get the ball element
const ball = document.getElementById('ball')

// Create the paddle velocity
let paddleVelocity = 0

// Add event listeners for keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        paddleVelocity -= 5
    } else if (event.key === 'ArrowRight') {
        paddleVelocity += 5
    }
})

// Update the paddle position every frame
function updatePaddle() {
    let newLeft = paddle.offsetLeft + paddleVelocity

    // Get the game container dimensions
    let containerWidth = gameContainer.offsetWidth
    let paddleWidth = paddle.offsetWidth

    // Check if the new position is within the game container boundaries
    if (newLeft >= 0 && newLeft <= containerWidth - paddleWidth) {
        paddle.style.left = newLeft + 'px'
    }
    paddleVelocity *= 0.8

    requestAnimationFrame(updatePaddle)
}

// Start the game
updatePaddle()