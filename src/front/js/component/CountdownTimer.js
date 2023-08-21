import React, { useState, useEffect } from "react";

function CountdownTimer({ hours, minutes, seconds }) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining > 0) {
          return prevTimeRemaining - 1;
        } else {
          clearInterval(interval);
          return prevTimeRemaining;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="countdown-timer-container">
      <h3>Countdown Timer:</h3>
      <p>{formatTime(timeRemaining)}</p>
    </div>
  );
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

export default CountdownTimer;
