// ScoreBoard.jsx
// Displays scores for both players
import React from 'react';

// Props: players (array of player objects)
const ScoreBoard = ({ players }) => {
  return (
    <div className="mb-4">
      {/* Display scores for both players */}
      <h3 className="text-base font-bold mb-2">Scores</h3>
      <ul className="flex gap-4 justify-center">
        {players.map((player, idx) => (
          <li key={idx} className="bg-gray-100 px-3 py-1 rounded text-gray-700 font-semibold">
            {player.name}: <span className="font-bold">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;
