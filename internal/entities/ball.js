import { bricks } from './levelGenerator.js';
import { isPaused } from "../utils/utils.js";
import { lives, updateLives, gameOver, isGameOver } from './lives.js';

// Select the ball element
export const ball = document.getElementById('ball');

// Set initial position and velocity
let ballX = 50; // Initial horizontal position (percentage)
let ballY = 80; // Initial vertical position (percentage)
let velocityX = 0.3; // Horizontal velocity
let velocityY = -0.3; // Vertical velocity


// Function to update the ball's position
export function updateBallPosition() {
	if (!isPaused) {
		// Update position based on velocity
		ballX += velocityX;
		ballY += velocityY;

    // Check for collision with the walls
    if (ballX <= 0 || ballX >= 100) {
        velocityX = -velocityX; // Reverse horizontal direction
    }
    if (ballY <= 0) {
        velocityY = -velocityY; // Reverse vertical direction
    }

    // If the ball touch the botmon wall, reset the position
    if (ballY >= 100){

        if (lives > 0) {
            resetBallPosition()
            updateLives();
        } else if (!isGameOver) {
            ball.remove();
            gameOver();
        }

    }

    collideBallWithBricks(ball);

    // Apply the new position
    ball.style.left = ballX + '%';
    ball.style.top = ballY + '%';

	}
}

function resetBallPosition() {
    ballX = 50;
    ballY = 80;
    velocityX = 0.3;
    velocityY = -0.3;
}


function collideBallWithBricks(ball) {
	if (!isPaused) {
		const ballRect = ball.getBoundingClientRect();
	
		bricks.forEach((brick, index) => {
			const brickRect = brick.getBoundingClientRect();
	
			if (isColliding(ballRect, brickRect)) {
				handleCollision(ballRect, brickRect);
	
				if (!brick?.unbreakable) {
					brick.remove();
					bricks.splice(index, 1);
				}
			}
		});
	}
}

// Check if the ball is colliding
function isColliding(ballRect, brickRect) {
    return (
        ballRect.left < brickRect.right &&
        ballRect.right > brickRect.left &&
        ballRect.top < brickRect.bottom &&
        ballRect.bottom > brickRect.top
    );
}

// Handle bouncing
function handleCollision(ballRect, brickRect) {
    // Calculate the overlaps between the ball and the brick sides
    const overlaps = {
        left: Math.abs(ballRect.right - brickRect.left),
        right: Math.abs(ballRect.left - brickRect.right),
        top: Math.abs(ballRect.bottom - brickRect.top),
        bottom: Math.abs(ballRect.top - brickRect.bottom),
    };

    // Determine which side of the brick has the smallest overlap and apply the corresponding bounce
    const minOverlapSide = Object.keys(overlaps).reduce((a, b) => overlaps[a] < overlaps[b] ? a : b);

    switch (minOverlapSide) {
        case "left":
        case "right":
            velocityX = -velocityX;
            ballX += minOverlapSide === "left" ? -2 : 2;
            break;
        case "top":
        case "bottom":
            velocityY = -velocityY;
            ballY += minOverlapSide === "top" ? -2 : 2;
            break;
    }
}



// Update the ball's position every 10 milliseconds
setInterval(updateBallPosition, 10);