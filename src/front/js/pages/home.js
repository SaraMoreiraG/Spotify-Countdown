import React, { useState } from "react";
import SpotifyAuth from "../component/SpotifyAuth";
import SpotifySearch from "../component/SpotifySearch";
import SelectedSong from "../component/SelectedSong";
import CountdownInputs from "../component/CountdownInputs";
import CountdownDisplay from "../component/CountdownDisplay";

export const Home = () => {
  const accessToken = localStorage.getItem("spotifyAccessToken");
  const [selectedSong, setSelectedSong] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

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
          {!selectedSong ? (
            <SpotifySearch
              onSelect={handleSongSelect}
              onStartCountdown={handleStartCountdown}
            />
          ) : (
            <div>
              {!countdownStarted ? ( // Only show CountdownInputs if countdown hasn't started
                <>
                  <CountdownInputs onStartCountdown={handleStartCountdown} />
                  <SelectedSong selectedSong={selectedSong} />
                </>
              ) : (
                <CountdownDisplay
                  selectedSong={selectedSong}
                  countdownTime={countdownTime}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
