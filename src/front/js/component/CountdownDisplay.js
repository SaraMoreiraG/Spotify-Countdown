import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import axios from "axios";

function CountdownDisplay({ totalSeconds, onCountdownFinish }) {
  const { store } = useContext(Context);
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (timeRemaining > 0) {
        try {
          const response = await axios.get(
            `${process.env.BACKEND_URL}/get-countdown`
          );
          setTimeRemaining(response.data.time_remaining);
        } catch (error) {
          console.error("Error fetching countdown:", error);
        }
      } else {
        clearInterval(interval); // Stop the interval
        onCountdownFinish(); // Notify the parent component that the countdown finished
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining, onCountdownFinish]); // Add timeRemaining and onCountdownFinish as dependencies

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

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
