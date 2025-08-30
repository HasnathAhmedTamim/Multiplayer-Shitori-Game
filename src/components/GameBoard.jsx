// GameBoard.jsx
// Main game logic and layout for Multiplayer Shiritori
import React, { useState } from 'react';
import PlayerInput from './PlayerInput';
import ScoreBoard from './ScoreBoard';
import WordHistory from './WordHistory';
import CountdownTimer from './CountdownTimer';

const initialPlayers = [
  { name: 'Player 1', score: 20 },
  { name: 'Player 2', score: 20 }
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
  // State: winner
  const [winner, setWinner] = useState(null);
  // State: time left for speed bonus
  const [timeLeft, setTimeLeft] = useState(10);
  // State: game started
  const [gameStarted, setGameStarted] = useState(false);

  // Pass timeLeft to CountdownTimer and update on tick
  const handleTimerTick = (t) => setTimeLeft(t);

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
    if (!gameStarted || winner) return;
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
    // Calculate length bonus and speed bonus
    const lengthBonus = word.length - 4;
    const speedBonus = timeLeft;
    const totalBonus = Math.max(lengthBonus, 0) + Math.max(speedBonus, 0);
    // Subtract bonus from current player's score, clamp to zero
    const updatedPlayers = players.map((p, idx) => {
      if (idx === currentPlayer) {
        const newScore = p.score - totalBonus;
        return { ...p, score: newScore < 0 ? 0 : newScore };
      }
      return p;
    });
    setPlayers(updatedPlayers);
    // Check for winner
    if (updatedPlayers[currentPlayer].score <= 0) {
      setWinner(players[currentPlayer].name);
      setGameStarted(false);
    }
    setCurrentPlayer((currentPlayer + 1) % 2);
    setTimeLeft(10); // Reset timer for next turn
  };

  // Function to handle timer timeout (player loses point and turn)
  const handleTimeout = () => {
    if (!gameStarted || winner) return;
    // Deduct point from current player
    const updatedPlayers = players.map((p, idx) => {
      if (idx === currentPlayer) {
        const newScore = p.score - 1;
        return { ...p, score: newScore < 0 ? 0 : newScore };
      }
      return p;
    });
    setPlayers(updatedPlayers);
    // Check for winner
    if (updatedPlayers[currentPlayer].score <= 0) {
      setWinner(players[currentPlayer].name);
      setGameStarted(false);
    }
    // Switch turn
    setCurrentPlayer((currentPlayer + 1) % 2);
    setTimeLeft(10); // Reset timer for next turn
  };

  return (
    <div className="bg-white rounded p-4 mb-4 border">
      {/* Start button, only enabled if game not started */}
      {!gameStarted && !winner && (
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => {
          setPlayers(initialPlayers);
          setCurrentPlayer(0);
          setWordHistory([]);
          setLastWord('');
          setError('');
          setWinner(null);
          setTimeLeft(10);
          setGameStarted(true);
        }}>
          Start
        </button>
      )}
      {/* Display winner if game is over */}
      {winner && (
        <div className="text-center text-green-600 font-bold text-xl mb-4">
          Winner: {winner}!
        </div>
      )}
      {/* Display current player's turn with highlight */}
      <h2 className="text-lg font-bold mb-4 text-center">
        Turn: <span className={`px-3 py-1 rounded text-white font-bold ${currentPlayer === 0 ? 'bg-blue-500' : 'bg-pink-500'}`}>{players[currentPlayer].name}</span>
      </h2>
      {/* Show error message if any */}
      {error && <p className="text-red-600 font-medium mb-2 text-center">{error}</p>}
      {/* CountdownTimer: Timer for current player's turn, only running if gameStarted and no winner */}
      <CountdownTimer duration={10} onTimeout={handleTimeout} resetKey={currentPlayer + '-' + wordHistory.length} onTick={handleTimerTick} running={gameStarted && !winner} />
      {/* ScoreBoard: Shows scores for both players */}
      <ScoreBoard players={players} />
      {/* PlayerInput: Handles word input and submission, only enabled if gameStarted and no winner */}
      <PlayerInput onSubmit={handleWordSubmit} lastWord={lastWord} disabled={!gameStarted || !!winner} />
      {/* WordHistory: Shows all previously entered words */}
      <WordHistory words={wordHistory} />
    </div>
  );
};

export default GameBoard;
