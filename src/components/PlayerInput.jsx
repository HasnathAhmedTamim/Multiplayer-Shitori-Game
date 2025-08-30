// PlayerInput.jsx
// Handles word input for the current player
import React, { useState } from 'react';

// Props: onSubmit (function), lastWord (string)
const PlayerInput = ({ onSubmit, lastWord }) => {
  // State: input value
  const [input, setInput] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length > 0) {
      onSubmit(input.trim()); // Call parent handler
      setInput(''); // Clear input
    }
  };

  return (
    <div className="player-input">
      {/* Show last word for reference */}
      <p>Last word: <strong>{lastWord || 'None'}</strong></p>
      {/* Input field and submit button */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter your word"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PlayerInput;
