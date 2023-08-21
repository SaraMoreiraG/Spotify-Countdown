import React, { useState } from "react";
import axios from "axios";
import CountdownInputs from "./CountdownInputs"; // Import the CountdownInputs component

function SpotifySearch({ onSelect, onStartCountdown }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = localStorage.getItem("spotifyAccessToken");

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
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSongSelect = (song) => {
    onSelect(song);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((track) => (
          <li key={track.id} onClick={() => handleSongSelect(track)}>
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
  );
}

export default SpotifySearch;
