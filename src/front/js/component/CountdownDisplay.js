import React from "react";
import CountdownTimer from "./CountdownTimer";
import SelectedSong from "./SelectedSong";

function CountdownDisplay({ selectedSong, countdownTime }) {
  const { hours, minutes, seconds } = countdownTime;

  return (
    <div>
      {/* Render CountdownTimer component */}
      <CountdownTimer hours={hours} minutes={minutes} seconds={seconds} />
      {/* Render SelectedSong component */}
      <SelectedSong selectedSong={selectedSong} />
    </div>
  );
}

export default CountdownDisplay;
