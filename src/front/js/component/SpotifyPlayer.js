import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../store/appContext";

function SpotifyPlayer({ trackUri }) {
  const { actions } = useContext(Context);
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    // Fetch track information using the track URI
    const fetchTrackInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/tracks/${trackUri.split(":")[2]}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "spotifyAccessToken"
              )}`,
            },
          }
        );

        setTrackInfo(response.data);
      } catch (error) {
        console.error("Error fetching track information:", error);
      }
    };

    if (trackUri) {
      fetchTrackInfo();
    }
  }, [trackUri]);

  const handleClick = () => {
    actions.clearSelectedSong();
    actions.setCountdownStarted(false);
    actions.setCountdownFinished(false);
  };

  return (
    <div className="spotify-player">
      {trackInfo && (
        <div className="center-content player">
          <h2>Playing from Spotify: </h2>
          <iframe
            className="mt-3"
            src={`https://open.spotify.com/embed/track/${
              trackUri.split(":")[2]
            }`}
            width="350"
            height="100"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Player"
            onLoad={() => {
              console.log("Iframe loaded");
            }}
          ></iframe>
          <div>
            <button
              type="button"
              className="button button-start"
              onClick={handleClick}
            >
              Start again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotifyPlayer;
