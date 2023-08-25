import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests

function CountdownInputs({ onStartCountdown }) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleStartClick = async () => {
    const countdownTime = { hours, minutes, seconds };

    // Calculate the total countdown duration in seconds
    const totalDuration = hours * 3600 + minutes * 60 + seconds;

    // Call the API endpoint to start the countdown
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/start-countdown`,
        {
          duration: totalDuration,
        }
      );
      console.log(response.data); // Response from the backend
      onStartCountdown(countdownTime); // Notify the parent component that the countdown has started
    } catch (error) {
      console.error("Error starting countdown:", error);
    }
  };

  return (
    <div className="countdown-control ">
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
                value = Math.max(0, Math.min(59, value));
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
                value = Math.max(0, Math.min(59, value));
                setSeconds(value);
              }}
            />
          </div>
        </div>
        <button className="button button-start" onClick={handleStartClick}>
          Start countdown
        </button>
      </div>
    </div>
  );
}

export default CountdownInputs;
