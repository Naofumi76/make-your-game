const verbose = 1;
export const bricks = [];

const colors = ["gray", "green", "greenyellow", "yellow", "orange", "orangered", "red" ];

export async function loadLevel(levelNumber) {
	const response = await fetch("./internal/game/levels.json"); // Load JSON  file
	const data = await response.json(); // Parse JSON
	const level = data.levels.find(lvl => lvl.level === levelNumber);

	if (!level) {
		console.error("Level not found!");
		return;
	}
	if (verbose >= 1) console.log(`Generating level ${levelNumber}`);
	const container = document.getElementById("gameContainer");

	const brickWidth = Math.floor(gameContainer.offsetWidth / level.gridSize.columns) - 1;
	const brickHeight = Math.floor(gameContainer.offsetHeight / level.gridSize.rows) - 1;
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
	brick.style.height = `${brickHeight}px`;
	brick.style.width = `${brickWidth}px`;
	return brick;
}

export function updateBrickColor (brick, health){
	brick.style.backgroundColor = colors[health];
	return brick;
}

function specialTileHealth(level, health){
	if (health === colors.length - 1) {return heath}
	if (Math.random() * 100 < level.specialTileChance) {
		health++;
		return specialTileHealth(level, health);
	}
	return health;
}