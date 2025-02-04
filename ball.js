// Select the ball element
export const ball = document.getElementById('ball');

// Set initial position and velocity
let ballX = 50; // Initial horizontal position (percentage)
let ballY = 80; // Initial vertical position (percentage)
let velocityX = 0.2; // Horizontal velocity
let velocityY = -0.2; // Vertical velocity

// Function to update the ball's position
export function updateBallPosition() {
    // Update position based on velocity
    ballX += velocityX;
    ballY += velocityY;

    // Check for collision with the walls
    if (ballX <= 0 || ballX >= 100) {
        velocityX = -velocityX; // Reverse horizontal direction
    }
    if (ballY <= 0 || ballY >= 100) {
        velocityY = -velocityY; // Reverse vertical direction
    }

    // Apply the new position
    ball.style.left = ballX + '%';
    ball.style.top = ballY + '%';
}



// Update the ball's position every 10 milliseconds
setInterval(updateBallPosition, 10);