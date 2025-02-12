import { initialTimer, getTimer } from "./timer.js"
export let score = 0
let scoreElement
let currentPage = 1 // Track current page

export function addScore() {
    scoreElement = document.createElement('div')
    scoreElement.id = 'scoreDisplay'
    scoreElement.textContent = `Score: ${score}`

    const gameContainer = document.getElementById('gameContainer')
    gameContainer.parentNode.insertBefore(scoreElement, gameContainer)
}

export function updateScore(points) {
    score += points
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`
    }
}

export function resetScore() {
    score = 0
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`
    }
}

export function getInformations(timer) {
    document.body.textContent = ''

    let infoContainer = document.createElement('div')

    let textInfo = document.createElement('p')
    textInfo.textContent = 'Congratulations, you finished the game! Enter your name for the scoreboard.'
    textInfo.id = "textInfo"

    infoContainer.appendChild(textInfo)

    let nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.id = 'nameInput'
    nameInput.required = true

    infoContainer.appendChild(nameInput)

    let submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', async function() {
        const name = nameInput.value.trim()
        if (!name) {
            alert("Please enter your name!")
            return
        }

        const playerData = {
            position: 0, // Calculated dynamically when showing the scoreboard
            name: name,
            score: score,
            time: formatGameTime(parseInt(timer))
        }

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

        let scoreList = document.createElement("ul")
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
        prevButton.textContent = "Previous"
        prevButton.disabled = currentPage === 1
        prevButton.onclick = function () {
            if (currentPage > 1) {
                showScoreboard(currentPage - 1)
            }
        }

        let nextButton = document.createElement("button")
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