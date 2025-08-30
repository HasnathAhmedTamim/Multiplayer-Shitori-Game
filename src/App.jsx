
// App.jsx
// Main entry for Multiplayer Shiritori Game
import React from 'react';
import GameBoard from './components/GameBoard';
import PlayerInput from './components/PlayerInput';
import ScoreBoard from './components/ScoreBoard';
import WordHistory from './components/WordHistory';
import CountdownTimer from './components/CountdownTimer';
import './App.css';

function App() {
  // Only render GameBoard, which includes all child components
  return (
    <div className="shiritori-app">
      <h1>Multiplayer Shiritori Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
