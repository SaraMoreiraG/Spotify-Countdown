import React, { useState } from "react";

function CountdownInputs({ onStartCountdown }) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleStartClick = () => {
    const countdownTime = { hours, minutes, seconds };
    onStartCountdown(countdownTime);
  };

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value, 10);
    if (!isNaN(newMinutes) && newMinutes >= 0 && newMinutes <= 59) {
      setMinutes(newMinutes);
    }
  };

  const handleSecondsChange = (e) => {
    const newSeconds = parseInt(e.target.value, 10);
    if (!isNaN(newSeconds) && newSeconds >= 0 && newSeconds <= 59) {
      setSeconds(newSeconds);
    }
  };

  return (
    <div className="countdown-container">
      <div className="countdown-items col-2">
        <div className="countdown-inputs d-flex justify-content-between">
          <div>
            <input
              type="number"
              placeholder="Hours"
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Minutes"
              onChange={handleMinutesChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Seconds"
              onChange={handleSecondsChange}
            />
          </div>
        </div>
        <div className="countdown-labels d-flex justify-content-between">
          <div>H</div>
          <div>Min</div>
          <div>Sec</div>
        </div>
      </div>
      <button className="button" onClick={handleStartClick}>
        Start countdown
      </button>
    </div>
  );
}

export default CountdownInputs;
