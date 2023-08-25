import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import axios from "axios";

function SpotifySearch() {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("most popular");
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = localStorage.getItem("spotifyAccessToken");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      // If there is no access token, reload the window
      window.location.reload();
    }
  }, [accessToken]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSearchResults(response.data.tracks.items);
      setButtonClicked(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If access token expired, delete it and reload the page
        localStorage.removeItem("spotifyAccessToken");
        window.location.reload();
      } else {
        console.error("Error searching for songs:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <div className="center-content">
        <div className="input-container">
          <input
            className={`search-input ${buttonClicked ? "clicked" : ""}`}
            type="text"
            placeholder="Choose your song!"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="button-container">
          <button
            className={`button-search ${buttonClicked ? "clicked" : ""}`}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <ul>
          {searchResults.map((track) => (
            <li key={track.id} onClick={() => actions.setSelectedSong(track)}>
              <img
                src={track.album.images[0]?.url}
                alt={`Album cover for ${track.name}`}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <span>{track.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SpotifySearch;
