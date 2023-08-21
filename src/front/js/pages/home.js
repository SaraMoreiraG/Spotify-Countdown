import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import SpotifyAuth from "../component/SpotifyAuth";
import SpotifySearch from "../component/SpotifySearch";
import SelectedSong from "../component/SelectedSong";
import CountdownInputs from "../component/CountdownInputs";
import CountdownDisplay from "../component/CountdownDisplay";

export const Home = () => {
  const { store } = useContext(Context);
  const accessToken = localStorage.getItem("spotifyAccessToken");
  const [countdownTime, setCountdownTime] = useState(null);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const handleStartCountdown = (time) => {
    setCountdownTime(time);
    setCountdownStarted(true); // Set countdownStarted to true when countdown starts
  };

  return (
    <div className="text-center mt-5">
      {!accessToken ? (
        <SpotifyAuth />
      ) : (
        <div>
          {!store.selectedSong ? (
            <SpotifySearch />
          ) : (
            <div>
              <SelectedSong />
              {!countdownStarted ? (
                <CountdownInputs onStartCountdown={handleStartCountdown} />
              ) : (
                <CountdownDisplay
                  totalSeconds={
                    countdownTime.hours * 3600 +
                    countdownTime.minutes * 60 +
                    countdownTime.seconds
                  }
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
