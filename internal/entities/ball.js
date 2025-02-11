import { bricks, updateBrickColor } from "./levelGenerator.js";
import { isPaused, gameIsOver } from "../utils/utils.js";
import { lives, updateLives } from "./lives.js";
import { gameOver } from "../game/gameOver.js";
import { updateScore } from "../game/score.js";

export class Ball {
    constructor(gameContainer) {
		this.gameContainer = document.getElementById(gameContainer);
        this.ball = document.createElement("div");
		this.ball.id = "ball";
	
		this.ball.style.width = "15%";
        this.ball.style.maxWidth = "10px";
        this.ball.style.height = "10px";
        this.ball.style.backgroundColor = "red";
        this.ball.style.position = "absolute";
        this.ball.style.bottom = "3.5%";
        this.ball.style.left = "50%";
        this.ball.style.transform = "translateX(50%)";

        this.ballX = 50;
        this.ballY = 80;
        this.velocityX = 0.3;
        this.velocityY = -0.3;

		this.gameContainer.appendChild(this.ball);

		this.isActive = true; // To control update loop

        this.init();
    }


    init() {
        setInterval(() => this.updateBallPosition(), 10);
    }

    updateBallPosition() {
        if (!isPaused && this.isActive) {
            this.ballX += this.velocityX;
            this.ballY += this.velocityY;

            if (this.ballX <= 0 || this.ballX >= 100) {
                this.velocityX = -this.velocityX;
            }
            if (this.ballY <= 0) {
                this.velocityY = -this.velocityY;
            }

            if (this.ballY >= 100) {
                if (lives > 0) {
                    this.resetBallPosition();
                    updateLives();
                } else if (!gameIsOver) {
					console.log("Ball removed")
                    this.ball.remove();
                    gameOver();
                }
            }

            this.collideBallWithBricks();

            this.ball.style.left = this.ballX + "%";
            this.ball.style.top = this.ballY + "%";
        }
    }

    resetBallPosition() {
        this.ballX = 50;
        this.ballY = 80;
        this.velocityX = 0.3;
        this.velocityY = -0.3;
    }

    collideBallWithBricks() {
        if (!isPaused) {
            const ballRect = this.ball.getBoundingClientRect();
            bricks.forEach((brick, index) => {
                const brickRect = brick.getBoundingClientRect();
                if (!brick?.isPaddle && this.isColliding(ballRect, brickRect)) {
                    this.handleCollision(ballRect, brickRect);
                    let health = brick.getAttribute("health");
                    if (health > 0) {
                        health--;
                        if (health === 0) {
                            updateScore(100);
                            brick.remove();
                            bricks.splice(index, 1);
                        } else {
                            brick.setAttribute("health", health);
                            updateBrickColor(brick, health);
                        }
                    }
                } else if (brick?.isPaddle && this.isColliding(ballRect, brickRect)) {
                    this.handlePaddleBounce(ballRect, brickRect);
                }
            });
        }
    }

    isColliding(ballRect, brickRect) {
        return (
            ballRect.left < brickRect.right &&
            ballRect.right > brickRect.left &&
            ballRect.top < brickRect.bottom &&
            ballRect.bottom > brickRect.top
        );
    }

    handleCollision(ballRect, brickRect) {
        const overlaps = {
            left: Math.abs(ballRect.right - brickRect.left),
            right: Math.abs(ballRect.left - brickRect.right),
            top: Math.abs(ballRect.bottom - brickRect.top),
            bottom: Math.abs(ballRect.top - brickRect.bottom),
        };

        const minOverlapSide = Object.keys(overlaps).reduce((a, b) => overlaps[a] < overlaps[b] ? a : b);

        switch (minOverlapSide) {
            case "left":
            case "right":
                this.velocityX = -this.velocityX;
                this.ballX += minOverlapSide === "left" ? -1 : 1;
                break;
            case "top":
            case "bottom":
                this.velocityY = -this.velocityY;
                this.ballY += minOverlapSide === "top" ? -1 : 1;
                break;
        }
    }

    handlePaddleBounce(ballRect, paddleRect) {
        const paddleCenter = paddleRect.left + paddleRect.width / 2;
        const impactPosition = (ballRect.left + ballRect.width / 2 - paddleCenter) / (paddleRect.width / 2);
        const maxBounceAngle = Math.PI / 3;
        const bounceAngle = impactPosition * maxBounceAngle;
        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        this.velocityX = speed * Math.sin(bounceAngle);
        this.velocityY = -speed * Math.cos(bounceAngle);
    }


	removeBall() {
        this.isActive = false; // Stop the update loop
        if (this.ball) {
            this.ball.remove(); // Remove from DOM
            this.ball = null; // Clear reference
        }
    }
}
