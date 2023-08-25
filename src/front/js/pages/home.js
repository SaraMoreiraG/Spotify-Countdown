import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

import SpotifyAuth from "../component/SpotifyAuth";
import SpotifySearch from "../component/SpotifySearch";
import SelectedSong from "../component/SelectedSong";
import CountdownInputs from "../component/CountdownInputs";
import CountdownDisplay from "../component/CountdownDisplay";
import SpotifyPlayer from "../component/SpotifyPlayer";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [countdownTime, setCountdownTime] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("spotifyAccessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const handleStartCountdown = (time) => {
    setCountdownTime(time);
    actions.setCountdownStarted(true); // Set countdownStarted to true when countdown starts
    actions.setCountdownFinished(false); // Reset countdownFinished when countdown starts
  };

  return (
    <div className="text-center mt-5">
      {!accessToken ? (
        <SpotifyAuth />
      ) : (
        <div>
          {!store.selectedSong && !store.countdownFinished ? (
            <SpotifySearch />
          ) : (
            <div>
              {!store.countdownFinished && <SelectedSong />}
              {!store.countdownStarted ? (
                <CountdownInputs onStartCountdown={handleStartCountdown} />
              ) : !store.countdownFinished ? (
                <CountdownDisplay
                  totalSeconds={
                    countdownTime.hours * 3600 +
                    countdownTime.minutes * 60 +
                    countdownTime.seconds
                  }
                />
              ) : (
                <SpotifyPlayer trackUri={store.selectedSong.uri} />
              )}
            </div>
          )}
        </div>
      )}
      <div className="footer">
        <p className="copyright">
          Copyright © Web desarrollada por
          <a
            href="https://www.linkedin.com/in/sara-moreira-g"
            target="”_blank”"
          >
            Sara Moreira García.
          </a>
        </p>
      </div>
    </div>
  );
};
