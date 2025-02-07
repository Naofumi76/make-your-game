package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"make-your-game/db"
)

func getScoresHandler(w http.ResponseWriter, r *http.Request) {
	scores, err := db.GetScores()
	if err != nil {
		http.Error(w, "Failed to fetch scores", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(scores)
}

func main() {

	db.ConnectDB()
	// Serve static files (index.html, JS, CSS, images)
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	http.HandleFunc("/get-scores", getScoresHandler)

	fmt.Println("Server is running on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Printf("Error starting server: %s\n", err)
		os.Exit(1)
	}
}
