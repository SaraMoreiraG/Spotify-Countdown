import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function SpotifyPlayer({ trackUri }) {
  const [trackInfo, setTrackInfo] = useState(null);
  const iframeRef = useRef(null);

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

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      const playButton = iframeDocument.querySelector(
        '[data-testid="play-pause-button"]'
      );
      console.log(playButton);
      if (playButton) {
        playButton.click();
      }
    }
  }, [iframeRef.current]);

  return (
    <div className="spotify-player">
      {trackInfo && (
        <div className="center-content">
          <h3>Now Playing:</h3>
          <p>
            {trackInfo.name} by {trackInfo.artists[0].name}
          </p>
          <iframe
            ref={iframeRef}
            src={`https://open.spotify.com/embed/track/${
              trackUri.split(":")[2]
            }`}
            width="300"
            height="80"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Player"
            onLoad={() => {
              console.log("Iframe loaded");
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default SpotifyPlayer;
