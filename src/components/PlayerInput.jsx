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
    <div className="mb-4">
      {/* Show last word for reference */}
      <p className="mb-2 text-gray-700">Last word: <span className="font-semibold text-blue-600">{lastWord || 'None'}</span></p>
      {/* Input field and submit button */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter your word"
          className="px-3 py-1 border rounded text-base"
        />
        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default PlayerInput;
