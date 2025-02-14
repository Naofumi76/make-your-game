
import { resetTimer } from "../game/timer.js";
import { isPaused, gameIsOver, setIsPaused, setGameIsOver, data, getDataImg } from "../utils/utils.js";
import {createDialogueOverlay} from "../game/historyOverlay.js";
import { Paddle} from "./paddle.js";
import { Ball } from "./ball.js";
import { cacheScore } from "../game/score.js";
import { addOneLife, resetLives } from "./lives.js";

const verbose = 1;
export const bricks = [];
export const ball = [];
export let currentLevel = 1;
export let oldLevel = 1;
export let maxLevel

const colors = ["gray", "green", "greenyellow", "yellow", "orange", "orangered", "red" ];

export async function loadLevel(levelNumber) {

	if (levelNumber === 1) {
		resetLives();
	} else if (levelNumber === currentLevel + 1){ addOneLife(); }
	const container = document.getElementById("gameContainer");
	container.innerHTML = "";
	console.log(currentLevel);
	cacheScore();
	
	createDialogueOverlay(getDataImg()[currentLevel-1][0],
	getDataImg()[currentLevel-1][1],
	data[levelNumber-1])
	
	currentLevel = levelNumber;
	let ballInstance;
	const response = await fetch("./internal/game/levels.json"); // Load JSON  file
	const dataResponse = await response.json(); // Parse JSON
	const level = dataResponse.levels.find(lvl => lvl.level === levelNumber);
	maxLevel = dataResponse.levels.filter(lvl => lvl.level > 0).length;

	if (!level) {
		console.error("Level not found!");
		return;
	}
	if (verbose >= 1) console.log(`Generating level ${levelNumber}`);

	resetTimer();

	    // Keep or create paddle
		if (!document.getElementById("paddle")) {
			new Paddle("gameContainer");
		}
	
		ballInstance = new Ball("gameContainer");
		ball.push(ballInstance)


	

	const brickWidth = Math.floor(gameContainer.offsetWidth / level.gridSize.columns);
	const brickHeight = Math.floor(gameContainer.offsetHeight / level.gridSize.rows);
	const containerWidth = gameContainer.offsetWidth;
	
	console.log("gameContainer width: " +  gameContainer.offsetWidth + " / nbr of bricks: " + level.gridSize.columns + " = " + brickWidth )
	container.style.width = `${containerWidth}px`;

	level.rowPattern.forEach((pattern, rowIndex) => {
		let totalBricks = pattern.filter(item => typeof item === "number").reduce((a, b) => a + b, 0);
		for (let i = 0; i < pattern.length; i++) {
			if (typeof pattern[i] === "string" && (pattern[i].startsWith("unbreakable-") || pattern[i].startsWith("gap-"))){totalBricks += parseInt(pattern[i].split("-")[1], 10);}
		}
		let totalRowWidth = totalBricks * brickWidth;
		let offsetX = (containerWidth - totalRowWidth) / 2;

		let x = offsetX;
		const rowDiv = document.createElement("div");
		rowDiv.style.position = "relative";
		rowDiv.style.height = `${brickHeight}px`;
		container.appendChild(rowDiv);

		pattern.forEach(part => {
			if (typeof part === "number") {
				for (let j = 0; j < part; j++) {
					let brick = document.createElement("div");
					let health = specialTileHealth(level, 1);
					brick = createBrick(brick, health, brickWidth, brickHeight);
					brick.style.transform = `translateX(${x}px)`;
					rowDiv.appendChild(brick);
					x += brickWidth;
					bricks.push(brick);
				}
			} else if (part.startsWith("gap-")) {
				let gapSize = parseInt(part.split("-")[1], 10);
				x += gapSize * brickWidth;
			} else if ( part.startsWith("unbreakable-") ){
				let nbrOfBricks = parseInt(part.split("-")[1], 10);
				for (let k = 0; k < nbrOfBricks; k++){
					let brick = document.createElement("div");
					let health = -1;
					brick = createBrick(brick, health, brickWidth, brickHeight);
					brick.style.transform = `translateX(${x}px)`;
					rowDiv.appendChild(brick);
					x += brickWidth;
					bricks.push(brick);
				}
			}
		});
	});
}

function createBrick (brick, health, brickWidth, brickHeight) {
	brick.classList.add("brick");
	brick.setAttribute("health", health);
	if (health < 0) {health = 0;}
	brick = updateBrickColor(brick, health);
	brick.style.height = `${brickHeight-2}px`;
	brick.style.width = `${brickWidth-2}px`;
	return brick;
}

export function updateBrickColor (brick, health){
	brick.style.backgroundColor = colors[health];
	return brick;
}

function specialTileHealth(level, health){
	const maxHealth = colors.length - 1;

	// Calculate max possible upgrades based on remaining health space
	const maxUpgrades = maxHealth - health;

	// Generate a random number between 0 and 1, then scale it to fit maxUpgrades
	const upgrades = Math.floor(Math.log(1 - Math.random()) / Math.log(1 - (100-level.specialTileChance) / 100));

	// Ensure we don’t exceed maxHealth
	return Math.min(health + upgrades, maxHealth);
}