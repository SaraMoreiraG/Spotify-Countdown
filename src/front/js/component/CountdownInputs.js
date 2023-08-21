import React, { useState } from "react";
import SelectedSong from "./SelectedSong";

function CountdownInputs({ onStartCountdown }) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleStartClick = () => {
    const countdownTime = { hours, minutes, seconds };
    onStartCountdown(countdownTime);
  };

  return (
    <div className="countdown-control">
      <div className="center-content">
        <div className="countdown-inputs d-flex">
          <div>
            <input
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => {
                const value = Math.max(0, parseInt(e.target.value));
                setHours(value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => {
                let value = parseInt(e.target.value);
                value = Math.max(0, Math.min(59, value)); // Ensure value is between 0 and 59
                setMinutes(value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={(e) => {
                let value = parseInt(e.target.value);
                value = Math.max(0, Math.min(59, value)); // Ensure value is between 0 and 59
                setSeconds(value);
              }}
            />
          </div>
        </div>
        <button className="button" onClick={handleStartClick}>
          Start countdown
        </button>
        <SelectedSong />
      </div>
    </div>
  );
}

export default CountdownInputs;
