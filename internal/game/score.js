import { initialTimer, getTimer } from "./timer.js"
export let score = 0;
export let preLevelScore = 0;
export let scoreRequired = [0,500,1000,1500,2000,2500,3000,3500,4000,4500]


let scoreElement
let currentPage = 1 // Track current page

export function addScore() {
    scoreElement = document.createElement('div')
    scoreElement.id = 'scoreDisplay'
    scoreElement.textContent = `Score: ${score}`

    const gameContainer = document.getElementById('gameContainer')
    gameContainer.parentNode.insertBefore(scoreElement, gameContainer)
}

export function setScore(newScore) {
    score = newScore
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`
    }
}

export function cacheScore() {
    preLevelScore = score
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`
    }
}

export function rewriteScore(){
    score = preLevelScore;
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`
    }
}

export function updateScore(points) {
    setScore(score + points);
}

export function resetScore() {
    setScore(0);
}

export function getInformations(timer) {
    document.body.textContent = ''

    let infoContainer = document.createElement('div')

    let nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.id = 'nameInput'
	nameInput.placeholder = 'Congratulations! Enter your name for the scoreboard.'
    nameInput.required = true

    infoContainer.appendChild(nameInput)

    let submitButton = document.createElement('button')
	submitButton.id = 'submitButton'
    submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', async function() {
        const name = nameInput.value.trim()
        if (!name) {
            alert("Please enter your name!")
            return
        }

        const formattedDate = new Date().toLocaleString('sv-SE').replace(',', '') // Converts to "YYYY-MM-DD HH:MM:SS"

        const playerData = {
            position: 0, // Calculated dynamically when showing the scoreboard
            name: name,
            score: score,
            time: formattedDate // Now in "YYYY-MM-DD HH:MM:SS" format
        };

        await submitScore(playerData)
        showScoreboard()
    })

    infoContainer.appendChild(submitButton)
    document.body.appendChild(infoContainer)
}

// Format game time as "minutes:seconds"
function formatGameTime(timer) {
    let seconds = initialTimer - timer
    let minutes = Math.floor(seconds / 60)
    let remainingSeconds = seconds % 60
    return `${minutes > 10 ? minutes : '0'+minutes}:${remainingSeconds > 10 ? remainingSeconds : '0'+remainingSeconds}`
}

// Send score to Go API
async function submitScore(playerData) {
    try {
        let response = await fetch("/add-score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playerData)
        })

        if (!response.ok) {
            console.error("Error submitting score:", await response.text())
        }
    } catch (error) {
        console.error("Error:", error)
    }
}

async function showScoreboard(page = 1) {
    try {
        currentPage = page

        let response = await fetch(`/get-scores?page=${currentPage}`)
        let scores = await response.json()

        document.body.textContent = ''
        let scoreboard = document.createElement("div")
		scoreboard.id = "scoreboard"

        let scoreList = document.createElement("ul")
		scoreList.id = "scoreList"
        scores.scores.forEach(score => {
            let li = document.createElement("li")
            li.textContent = `${score.position}. ${score.name} - ${score.score} points (${score.time})`
            scoreList.appendChild(li)
        })

        scoreboard.appendChild(scoreList)

        // Pagination controls
        let paginationContainer = document.createElement("div")
        paginationContainer.id = "pagination"

        let prevButton = document.createElement("button")
		prevButton.classList.add("scoreboardButton")
        prevButton.textContent = "Previous"
        prevButton.disabled = currentPage === 1
        prevButton.onclick = function () {
            if (currentPage > 1) {
                showScoreboard(currentPage - 1)
            }
        }

        let nextButton = document.createElement("button")
		nextButton.classList.add("scoreboardButton")
        nextButton.textContent = "Next"
		nextButton.disabled = currentPage === scores.totalPages
        nextButton.onclick = function () {
			if (currentPage < scores.totalPages) {
				showScoreboard(currentPage + 1)
			}
        }

        paginationContainer.appendChild(prevButton)
        paginationContainer.appendChild(nextButton)

        scoreboard.appendChild(paginationContainer)
        document.body.appendChild(scoreboard)
    } catch (error) {
    	console.error("Error fetching scores:", error)
    }
}



export function scoreboardButton() {
    let scoreButton = document.createElement('button')
    scoreButton.id = 'scoreButton'
    scoreButton.textContent = 'Scoreboard'
    scoreButton.addEventListener('click', () => {
        let currentTimer = getTimer() // Get the current timer value when clicked
        getInformations(currentTimer)
    })
    document.body.appendChild(scoreButton)
}