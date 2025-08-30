
// App.jsx
// Main entry for Multiplayer Shiritori Game
import React from 'react';
import GameBoard from './components/GameBoard';
import PlayerInput from './components/PlayerInput';
import ScoreBoard from './components/ScoreBoard';
import WordHistory from './components/WordHistory';
import CountdownTimer from './components/CountdownTimer';


function App() {
  // Only render GameBoard, which includes all child components
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-white flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto p-6 rounded-2xl shadow-2xl bg-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow">
          Multiplayer Shiritori Game
        </h1>
        <GameBoard />
       
      </div>
    </div>
  );
}

export default App;
