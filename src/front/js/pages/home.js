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
  const [countdownFinished, setCountdownFinished] = useState(false); // Add state for countdownFinished
  const accessToken = localStorage.getItem("spotifyAccessToken");
  const refreshToken = localStorage.getItem("spotifyRefreshToken");

  useEffect(() => {
    // Check if the access token is expired and handle refresh here
    if (accessToken) {
      const expirationTime = localStorage.getItem("spotifyTokenExpiration");
      const currentTime = Date.now();

      if (expirationTime && currentTime > parseInt(expirationTime, 10)) {
        // Access token has expired, check for refresh token
        if (!refreshToken) {
          // No refresh token available, redirect to Spotify login
          localStorage.removeItem("spotifyAccessToken");
          localStorage.removeItem("spotifyRefreshToken");
          localStorage.removeItem("spotifyTokenExpiration");
          window.location.reload(); // Refresh the page to show SpotifyAuth component
        } else {
          // Call the refreshAccessToken function to refresh the access token
          refreshAccessToken(refreshToken);
        }
      }
    }
  }, [accessToken, refreshToken]);

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
