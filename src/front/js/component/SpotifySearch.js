import React, { useState } from "react";
import axios from "axios";

function SongSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
        }
      );

      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
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
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SongSearch;
