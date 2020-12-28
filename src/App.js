import React, { useState, useRef } from "react";
import "./styles/app.scss";
import Song from "./component/Song";
import Player from "./component/Player";
import Library from "./component/Library";
import Nav from "./component/Nav";
import chillHop from "./data";
const App = () => {
  const audioPlayer = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [songs, setSongs] = useState(chillHop() || []);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  return (
    <div className="App">
      <Nav setOpen={setOpen} isOpen={isOpen} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioPlayer={audioPlayer}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioPlayer={audioPlayer}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        isOpen={isOpen}
      />
      <audio
        ref={audioPlayer}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
};

export default App;
