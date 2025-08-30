// ScoreBoard.jsx
// Displays scores for both players
import React from 'react';

// Props: players (array of player objects)
const ScoreBoard = ({ players }) => {
  return (
    <div className="score-board">
      {/* Display scores for both players */}
      <h3>Scores</h3>
      <ul>
        {players.map((player, idx) => (
          <li key={idx}>
            {player.name}: <strong>{player.score}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;
