import React, { useContext } from "react";
import { Context } from "../store/appContext";

function SelectedSong() {
  const { store, actions } = useContext(Context);
  if (!store.selectedSong) {
    return null;
  }

  return (
    <div className="selected-song-container">
      <div className="selected-song-wrapper row">
        <div className="selected-song-title col-md-3 col-sm-12">
          <h2>Selected Song:</h2>
        </div>
        <div className="selected-song-details col-md-6 col-sm-12">
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
        <div className="col-md-3 col-sm-12">
          <button
            className="button selected-song"
            onClick={actions.clearSelectedSong}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectedSong;
