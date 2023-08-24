import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import SpotifyAuth from "../component/SpotifyAuth";
import SpotifySearch from "../component/SpotifySearch";
import SelectedSong from "../component/SelectedSong";
import CountdownInputs from "../component/CountdownInputs";
import CountdownDisplay from "../component/CountdownDisplay";
import SpotifyPlayer from "../component/SpotifyPlayer";
import axios from "axios";

const SPOTIFY_CLIENT_ID = process.env.MYCLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.MYCLIENT_SECRET;

export const Home = () => {
  const { store } = useContext(Context);
  const [countdownTime, setCountdownTime] = useState(null);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("spotifyAccessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const handleStartCountdown = (time) => {
    setCountdownTime(time);
    setCountdownStarted(true); // Set countdownStarted to true when countdown starts
    setCountdownFinished(false); // Reset countdownFinished when countdown starts
  };

  return (
    <div className="text-center mt-5">
      {!accessToken ? (
        <SpotifyAuth />
      ) : (
        <div>
          {!store.selectedSong && !countdownFinished ? (
            <SpotifySearch />
          ) : (
            <div>
              <SelectedSong />
              {!countdownStarted ? (
                <CountdownInputs onStartCountdown={handleStartCountdown} />
              ) : !countdownFinished ? (
                <CountdownDisplay
                  totalSeconds={
                    countdownTime.hours * 3600 +
                    countdownTime.minutes * 60 +
                    countdownTime.seconds
                  }
                  changeSeconds={() => setCountdownStarted(false)}
                  onCountdownFinish={() => setCountdownFinished(true)}
                />
              ) : (
                <SpotifyPlayer trackUri={store.selectedSong.uri} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Function to refresh the access token using the refresh token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newAccessToken = response.data.access_token;
    const expiresIn = response.data.expires_in;

    // Update the access token and expiration time in local storage
    localStorage.setItem("spotifyAccessToken", newAccessToken);
    localStorage.setItem(
      "spotifyTokenExpiration",
      Date.now() + expiresIn * 1000
    );
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};
