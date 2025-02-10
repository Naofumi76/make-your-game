package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"sort"
	"strconv"

	"make-your-game/db"
)

// Handles fetching scores with pagination
func getScoresHandler(w http.ResponseWriter, r *http.Request) {
	scores, err := db.GetScores()
	if err != nil {
		http.Error(w, "Failed to fetch scores", http.StatusInternalServerError)
		return
	}

	// Sort scores in descending order
	sort.Slice(scores, func(i, j int) bool {
		return scores[i].Score > scores[j].Score
	})

	// Assign positions dynamically
	for i := range scores {
		scores[i].Position = i + 1
	}

	// Get page number from query parameters
	pageSize := 5
	page := 1
	if r.URL.Query().Has("page") {
		page, err = strconv.Atoi(r.URL.Query().Get("page"))
		if err != nil || page < 1 {
			page = 1
		}
	}

	totalPages := (len(scores) + pageSize - 1) / pageSize

	// Paginate results
	startIndex := (page - 1) * pageSize
	endIndex := startIndex + pageSize

	if startIndex >= len(scores) {
		scores = []db.Score{}
	} else {
		if endIndex > len(scores) {
			endIndex = len(scores)
		}
		scores = scores[startIndex:endIndex]
	}
	// Create a response struct to include both scores and totalPages
	response := struct {
		Scores     []db.Score `json:"scores"`
		TotalPages int        `json:"totalPages"`
	}{
		Scores:     scores,
		TotalPages: totalPages,
	}

	// Send the scores and totalPages to the frontend
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func addScoreHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var newScore db.Score
	err := json.NewDecoder(r.Body).Decode(&newScore)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	err = db.AddScore(newScore.Position, newScore.Name, newScore.Score, newScore.Time)
	if err != nil {
		http.Error(w, "Failed to add score", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "Score added successfully")
}

func main() {
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	http.HandleFunc("/get-scores", getScoresHandler)
	http.HandleFunc("/add-score", addScoreHandler)

	fmt.Println("Server is running on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Printf("Error starting server: %s\n", err)
		os.Exit(1)
	}
}
