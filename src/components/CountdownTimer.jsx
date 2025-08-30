// CountdownTimer.jsx
// Countdown timer for each player's turn
import React, { useEffect, useState } from 'react';

// Props: duration (seconds), onTimeout (function), resetKey (any)
const CountdownTimer = ({ duration = 10, onTimeout, resetKey }) => {
  // State: time left
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when resetKey changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [resetKey, duration]);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeout) onTimeout();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  return (
    <div className="countdown-timer">
      {/* Display countdown timer */}
      <p>Time left: <strong>{timeLeft}</strong> seconds</p>
    </div>
  );
};

export default CountdownTimer;
