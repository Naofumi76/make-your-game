package db

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type Score struct {
	Position int
	Name     string
	Score    int
	Date     string
}

func ConnectDB() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "db/database.db")
	if err != nil {
		return nil, err
	}

	query := `CREATE TABLE IF NOT EXISTS scores (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		position INTEGER NOT NULL,
		name TEXT NOT NULL,
		score INTEGER NOT NULL,
		date TEXT NOT NULL
	);`
	_, err = db.Exec(query)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func AddScore(position int, name string, score int) error {
	db, err := ConnectDB()
	if err != nil {
		return err
	}
	defer db.Close()

	date := time.Now().Format("2006-01-02 15:04:05")
	_, err = db.Exec("INSERT INTO scores (position, name, score, date) VALUES (?, ?, ?, ?)", position, name, score, date)
	if err != nil {
		return err
	}

	fmt.Println("New score added:", name, score)
	return nil
}

func GetScores() ([]Score, error) {
	db, err := ConnectDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT position, name, score, date FROM scores ORDER BY score DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var scores []Score
	for rows.Next() {
		var s Score
		if err := rows.Scan(&s.Position, &s.Name, &s.Score, &s.Date); err != nil {
			return nil, err
		}
		scores = append(scores, s)
	}

	return scores, nil
}

// Add score for test : INSERT INTO scores (position, name, score, date) VALUES (1, 'Nathan', 100, '2006-01-02 15:04:05');
