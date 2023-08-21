import React, { useState, useEffect } from "react";
import axios from "axios";

function SongSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = localStorage.getItem("spotifyAccessToken");
  const [selectedSong, setSelectedSong] = useState(null);

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

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((track) => (
          <li
            key={track.id}
            onClick={() => handleSongSelect(track)}
            className={
              selectedSong && selectedSong.id === track.id ? "selected" : ""
            }
          >
            <div className="track-info">
              <img
                src={track.album.images[0]?.url || "default-image-url.png"}
                alt={`Album cover for ${track.name}`}
              />
              <p>{track.name}</p>
            </div>
          </li>
        ))}
      </ul>

      {selectedSong && (
        <div>
          <h3>Selected Song:</h3>
          <p>{selectedSong.name}</p>
        </div>
      )}
    </div>
  );
}

export default SongSearch;
