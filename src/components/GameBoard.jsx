// GameBoard.jsx
// Main game logic and layout for Multiplayer Shiritori
import React, { useState } from 'react';
import PlayerInput from './PlayerInput';
import ScoreBoard from './ScoreBoard';
import WordHistory from './WordHistory';
import CountdownTimer from './CountdownTimer';

const initialPlayers = [
  { name: 'Player 1', score: 0 },
  { name: 'Player 2', score: 0 }
];

const GameBoard = () => {
  // State: track current player (0 or 1)
  const [currentPlayer, setCurrentPlayer] = useState(0);
  // State: track entered words
  const [wordHistory, setWordHistory] = useState([]);
  // State: track players and scores
  const [players, setPlayers] = useState(initialPlayers);
  // State: track last word entered
  const [lastWord, setLastWord] = useState('');

  // State: error message for invalid word
  const [error, setError] = useState('');

  // Helper: Validate word structure
  const isValidStructure = (word) => {
    if (word.length < 4) return false;
    if (wordHistory.includes(word.toLowerCase())) return false;
    if (lastWord) {
      const lastChar = lastWord[lastWord.length - 1].toLowerCase();
      return word[0].toLowerCase() === lastChar;
    }
    return true;
  };

  // Helper: Validate word meaning using DictionaryAPI
  const isValidMeaning = async (word) => {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) return false;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0;
    } catch {
      return false;
    }
  };

  // Function to handle word submission (to be called from PlayerInput)
  const handleWordSubmit = async (word) => {
    setError('');
    // Validate structure
    if (!isValidStructure(word)) {
      setError('Invalid word structure! Must start with last letter, be at least 4 letters, and not repeated.');
      // Deduct point for invalid word
      const updatedPlayers = players.map((p, idx) =>
        idx === currentPlayer ? { ...p, score: p.score - 1 } : p
      );
      setPlayers(updatedPlayers);
      setCurrentPlayer((currentPlayer + 1) % 2);
      return;
    }
    // Validate meaning
    const validMeaning = await isValidMeaning(word);
    if (!validMeaning) {
      setError('Word not found in dictionary!');
      // Deduct point for invalid word
      const updatedPlayers = players.map((p, idx) =>
        idx === currentPlayer ? { ...p, score: p.score - 1 } : p
      );
      setPlayers(updatedPlayers);
      setCurrentPlayer((currentPlayer + 1) % 2);
      return;
    }
    // If valid, update word history, last word, and switch turn
    setWordHistory([...wordHistory, word.toLowerCase()]);
    setLastWord(word);
    setCurrentPlayer((currentPlayer + 1) % 2);
  };

  // Function to handle timer timeout (player loses point and turn)
  const handleTimeout = () => {
    // Deduct point from current player
    const updatedPlayers = players.map((p, idx) =>
      idx === currentPlayer ? { ...p, score: p.score - 1 } : p
    );
    setPlayers(updatedPlayers);
    // Switch turn
    setCurrentPlayer((currentPlayer + 1) % 2);
  };

  return (
    <div className="game-board">
      {/* Display current player's turn with highlight */}
      <h2>
        Turn: <span style={{
          background: currentPlayer === 0 ? '#4f46e5' : '#e11d48',
          color: '#fff',
          padding: '0.3em 1em',
          borderRadius: '1em',
          fontWeight: 'bold',
          fontSize: '1.1em'
        }}>{players[currentPlayer].name}</span>
      </h2>
      {/* Show error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* CountdownTimer: Timer for current player's turn */}
      <CountdownTimer duration={10} onTimeout={handleTimeout} resetKey={currentPlayer + '-' + wordHistory.length} />
      {/* ScoreBoard: Shows scores for both players */}
      <ScoreBoard players={players} />
      {/* PlayerInput: Handles word input and submission */}
      <PlayerInput onSubmit={handleWordSubmit} lastWord={lastWord} />
      {/* WordHistory: Shows all previously entered words */}
      <WordHistory words={wordHistory} />
    </div>
  );
};

export default GameBoard;
