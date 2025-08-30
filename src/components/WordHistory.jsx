// WordHistory.jsx
// Shows all previously entered words
import React from 'react';

// Props: words (array of strings)
const WordHistory = ({ words }) => {
  return (
    <div className="mt-4">
      <h3 className="text-base font-bold mb-2">Word History</h3>
      {/* Display list of entered words */}
      <ul className="flex flex-wrap gap-1 justify-center">
        {words.map((word, idx) => (
          <li key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm font-medium">
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordHistory;
