import React from "react";

function SelectedSong({ selectedSong }) {
  if (!selectedSong) {
    return null;
  }

  return (
    <div className="selected-song-container">
      <h3>Selected Song:</h3>
      <div className="selected-song-details">
        <img
          src={selectedSong.album.images[0]?.url || "default-image-url.png"}
          alt={`Album cover for ${selectedSong.name}`}
        />
        <p>{selectedSong.name}</p>
      </div>
    </div>
  );
}

export default SelectedSong;
