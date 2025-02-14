
export let isPaused = false;
export let gameIsOver = false;
export let gameInterval = null;

export let data = [];
export let dataLooseWin = [];


export function getDataImg(){
    return[
        ["static/images/character1.png","static/images/character2.png"],
        ["static/images/character1.png","static/images/character3.png"],
        ["static/images/character1.png","static/images/character4.png"],
        ["static/images/character1.png","static/images/character5.png"],
        ["static/images/character1.png","static/images/character6.png"],
        ["static/images/character1.png","static/images/character7.png"],
        ["static/images/character1.png","static/images/character8.png"]
    ];
}

export async function loadDialogues() {
    const response = await fetch("./static/dialogs/dialogs.json"); // Load JSON file
    data = await response.json(); // Parse and assign the data
    const responseLoose = await fetch("./static/dialogs/loose_win.json"); // Load JSON file
    dataLooseWin = await responseLoose.json(); // Parse and assign the data
}

// If you need to update these values from other files, you can create setter functions:
export function setIsPaused(value) {
    isPaused = value;
}

export function setGameIsOver(value) {
    console.log("value of game is over : ", gameIsOver);
    gameIsOver = value;
    console.log("new value of game is over : ", gameIsOver);
}

export function setGameInterval(value) {
    gameInterval = value;
}

// Export the update function
export function update() {
    setGameInterval(requestAnimationFrame(update));
}

// Update the paddle position every frame
export function updatePaddle() {
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


