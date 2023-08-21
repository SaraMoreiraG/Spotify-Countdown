import React, { useState, useEffect } from "react";

function CountdownDisplay({ totalSeconds }) {
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

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
    <div className="countdown-display">
      <div className="center-content">
        <h2>Countdown Timer:</h2>
        <div className="countdown-time">
          <div className="time">{hours}</div>
          <div className="time">{minutes.toString().padStart(2, "0")}</div>
          <div className="time">{seconds.toString().padStart(2, "0")}</div>
        </div>
        <button className="button-search">Re-start</button>
      </div>
    </div>
  );
}

export default CountdownDisplay;
