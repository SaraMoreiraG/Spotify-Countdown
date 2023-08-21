import React, { useEffect, useState } from "react";
import axios from "axios";

const SPOTIFY_CLIENT_ID = "2b50384a52984850894b744e174717fb";
const SPOTIFY_REDIRECT_URI =
  "https://3000-saramoreira-spotifycoun-kbyzl3gapd7.ws-eu104.gitpod.io/";
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  SPOTIFY_REDIRECT_URI
)}&response_type=token&show_dialog=true`;

function SpotifyAuth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the URL has an access token
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      setToken(accessToken);

      // Store the token in local storage for future use
      localStorage.setItem("spotifyAccessToken", accessToken);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = SPOTIFY_AUTH_URL;
  };

  return (
    <div>
      {!token ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <p>Logged in to Spotify!</p>
          {/* Render your app's content */}
        </div>
      )}
    </div>
  );
}

export default SpotifyAuth;
