const verbose = 1;

const rowPatterns = [
    [],
	[3],              // Full row of 3 bricks (centered)
	[3, "gap-2", 3],  // Three bricks, then a gap, then three bricks
	[4],              // Full row of 4 bricks
	[5, "gap-4", 2],  // Five bricks, then a gap, then two bricks
    [15],
    [],
    [11],
    [2],
];

export const bricks = [];

export function generateLevel(level) {
	if (verbose >= 1) console.log(`Generating level ${level}`);
	const screenWidth = gameContainer.offsetWidth;
	const brickWidth = 20
	const brickHeight = 10

    let totalBricks = rowPatterns.reduce((a, b) => a + b.filter(item => typeof item === "number").reduce((c, d) => c + d, 0), 0);
	if (level === 1){
		function generateBricks() {
            const container = document.getElementById("gameContainer");

            rowPatterns.forEach((pattern, rowIndex) => {
                let totalBricks = pattern.filter(item => typeof item === "number").reduce((a, b) => a + b, 0);
                let totalRowWidth = totalBricks * brickWidth;
                let offsetX = (screenWidth - totalRowWidth) / 2;

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
                            // Assign a special class to random bricks (20% chance)
                            if (Math.random() > 0.8) brick.classList.add("special-brick");

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
        };
		if (verbose >= 1){ console.log("calling the function generateBricks"); }
		generateBricks();
	}
};