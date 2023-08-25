import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Context } from "../store/appContext";

function CountdownDisplay({ totalSeconds }) {
  const { store, actions } = useContext(Context);
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isPaused && timeRemaining > 0) {
        try {
          const response = await axios.get(
            `${process.env.BACKEND_URL}/get-countdown`
          );
          setTimeRemaining(response.data.time_remaining);
        } catch (error) {
          console.error("Error fetching countdown:", error);
        }
      } else {
        clearInterval(interval);
        if (!isPaused) actions.setCountdownFinished(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining, store.setCountdownFinished, isPaused]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const handleRestart = () => {
    setTimeRemaining(totalSeconds); // Restart the countdown
  };

  const handlePause = async () => {
    try {
      await axios.post(`${process.env.BACKEND_URL}/pause-countdown`);
      setIsPaused(true);
    } catch (error) {
      console.error("Error pausing countdown:", error);
    }
  };

  const handleResume = async () => {
    try {
      await axios.post(`${process.env.BACKEND_URL}/resume-countdown`);
      setIsPaused(false);
    } catch (error) {
      console.error("Error resuming countdown:", error);
    }
  };

  const handleChange = () => {
    actions.setCountdownStarted(false);
  };

  return (
    <div className="countdown-display">
      <div className="center-content">
        <h2>Countdown Timer:</h2>
        <div className="countdown-time">
          <div className="time">{hours}</div>
          <div className="time">{minutes.toString().padStart(2, "0")}</div>
          <div className="time">{seconds.toString().padStart(2, "0")}</div>
        </div>
        <div className="button-container">
          <button className="button button-control" onClick={handleRestart}>
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button
            className="button button-control"
            onClick={isPaused ? handleResume : handlePause}
          >
            {isPaused ? (
              <i className="fa-solid fa-play"></i>
            ) : (
              <i className="fa-solid fa-pause"></i>
            )}
          </button>
          <button className="button button-control" onClick={handleChange}>
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountdownDisplay;
