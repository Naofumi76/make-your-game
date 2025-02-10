package db

import (
	"encoding/json"
	"fmt"
	"os"
)

type Score struct {
	Position int    `json:"position"`
	Name     string `json:"name"`
	Score    int    `json:"score"`
	Time     string `json:"time"` // Time taken to finish the game
}

// Reads scores from the JSON file
func readScores() ([]Score, error) {
	file, err := os.ReadFile("db/score.json")
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Println("File not found, creating an empty score.json")
			os.WriteFile("db/score.json", []byte("[]"), 0644) // Create an empty JSON array
			return []Score{}, nil
		}
		return nil, err
	}

	if len(file) == 0 {
		return []Score{}, nil
	}

	var scores []Score
	err = json.Unmarshal(file, &scores)
	if err != nil {
		fmt.Println("Error unmarshalling scores:", err)
		return nil, err
	}

	return scores, nil
}

// Writes scores to the JSON file
func writeScores(scores []Score) error {
	file, err := json.MarshalIndent(scores, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile("db/score.json", file, 0644)
}

// ✅ Now correctly takes in `position`, `name`, `score`, and `time`
func AddScore(position int, name string, score int, timeTaken string) error {
	scores, err := readScores()
	if err != nil {
		return err
	}

	newScore := Score{
		Position: position,
		Name:     name,
		Score:    score,
		Time:     timeTaken, // Time is directly added, no conversion needed
	}

	scores = append(scores, newScore)

	// ✅ No sorting or position recalculation
	// We just store the values as given

	err = writeScores(scores)
	if err != nil {
		return err
	}

	fmt.Println("New score added:", name, score)
	return nil
}

// Returns all scores
func GetScores() ([]Score, error) {
	return readScores()
}
