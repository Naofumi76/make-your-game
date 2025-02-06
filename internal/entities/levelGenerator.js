const verbose = 1;

export const bricks = [];

export async function loadLevel(levelNumber) {
	const response = await fetch("./internal/game/levels.json"); // Load JSON file
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
		let totalRowWidth = totalBricks * brickWidth;
		let offsetX = (containerWidth - totalRowWidth) / 2;

		let x = offsetX;
		const rowDiv = document.createElement("div");
		rowDiv.style.position = "relative";
		rowDiv.style.height = `${brickHeight}px`;
		container.appendChild(rowDiv);

		pattern.forEach(part => {
			if (typeof part === "number") {
				for (let i = 0; i < part; i++) {
					let brick = document.createElement("div");
					brick.classList.add("brick");
					brick.style.height = `${brickHeight}px`;
					brick.style.width = `${brickWidth}px`;
					brick.style.borderBlockColor = `black`;

					// Special tile chance
					if (Math.random() * 100 < level.specialTileChance) {
						brick.classList.add("special-brick");
					}

					brick.style.transform = `translateX(${x}px)`;
					rowDiv.appendChild(brick);
					x += brickWidth;
					bricks.push(brick);
				}
			} else if (part.startsWith("gap-")) {
				let gapSize = parseInt(part.split("-")[1], 10);
				x += gapSize * brickWidth;
			}
		});
	});
}
