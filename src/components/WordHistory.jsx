// WordHistory.jsx
// Shows all previously entered words
import React from 'react';

// Props: words (array of strings)
const WordHistory = ({ words }) => {
  return (
    <div className="word-history">
      <h3>Word History</h3>
      {/* Display list of entered words */}
      <ul>
        {words.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordHistory;
