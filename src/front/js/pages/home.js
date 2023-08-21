import React from "react";
import "../../styles/home.css";
import SongSearch from "../component/SpotifySearch";
import SpotifyAuth from "../component/SpotifyAuth";

export const Home = () => {
  return (
    <div className="text-center mt-5">
      <SpotifyAuth />
      <SongSearch></SongSearch>
    </div>
  );
};
