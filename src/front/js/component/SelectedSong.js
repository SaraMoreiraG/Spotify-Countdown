import React, { useContext } from "react";
import { Context } from "../store/appContext";

function SelectedSong() {
  const { store, actions } = useContext(Context);
  if (!store.selectedSong) {
    return null;
  }

  return (
    <div className="selected-song-container">
      <div className="selected-song-wrapper">
        <div className="selected-song-title col-3">
          <h2>Selected Song:</h2>
        </div>
        <div className="selected-song-details col-6">
          <div>
            <img
              src={
                store.selectedSong.album.images[0]?.url ||
                "default-image-url.png"
              }
              alt={`Album cover for ${store.selectedSong.name}`}
            />
          </div>
          <div>
            <p className="song-title">{store.selectedSong.name}</p>
            <p>
              By:{" "}
              {store.selectedSong.artists
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
        <div className="selected-song-button col-3">
          <button className="button-search" onClick={actions.clearSelectedSong}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectedSong;
