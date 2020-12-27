import React, { useState } from "react";
import "./styles/app.scss";
import Song from "./component/Song";
import Player from "./component/Player";
import chillHop from "./data";
const App = () => {
  const [songs, setSongs] = useState(chillHop() || []);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  console.log(songs);
  console.log(currentSong);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
    </div>
  );
};

export default App;
