import { isPaused, gameIsOver } from "../utils/utils.js";
import { bricks } from "./levelGenerator.js";

export class Paddle {
    constructor(gameContainer) {
        this.gameContainer = document.getElementById(gameContainer);
        this.paddle = document.createElement("div");
        this.paddle.id = "paddle";
        this.paddle.style.width = "15%";
        this.paddle.style.maxWidth = "120px";
        this.paddle.style.height = "10px";
        this.paddle.style.backgroundColor = "blue";
        this.paddle.style.position = "absolute";
        this.paddle.style.bottom = "3.5%";
        this.paddle.style.left = "50%";
        this.paddle.style.transform = "translateX(-50%)";
        
        this.paddle.unbreakable = true;
        this.paddle.isPaddle = true;
        bricks.push(this.paddle);
        
        this.paddleVelocity = 0;
        
        this.gameContainer.appendChild(this.paddle);
        
        this.initControls();
        this.updatePaddle();
    }

    initControls() {
        document.addEventListener("keydown", (event) => {
            if (!isPaused && !gameIsOver) {
                if (event.key === "ArrowLeft") {
                    this.paddleVelocity = -3;
                } else if (event.key === "ArrowRight") {
                    this.paddleVelocity = 3;
                }
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                this.paddleVelocity = 0;
            }
        });
    }

    updatePaddle() {
        if (!this.gameContainer) return;
        
        let newLeft = this.paddle.offsetLeft + this.paddleVelocity;
        let containerWidth = this.gameContainer.offsetWidth;
        let paddleWidth = this.paddle.offsetWidth;
        
        if (newLeft >= paddleWidth / 2 && newLeft <= containerWidth - paddleWidth / 2) {
            this.paddle.style.left = newLeft + "px";
        }
        
        requestAnimationFrame(this.updatePaddle.bind(this));
    }
}
