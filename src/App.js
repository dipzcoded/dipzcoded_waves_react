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
    animationPercent: 0,
  });
  const [songs, setSongs] = useState(chillHop() || []);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate percent
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercent = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercent,
    });
  };

  return (
    <div className={`App ${isOpen && "library-active"}`}>
      <Nav setOpen={setOpen} isOpen={isOpen} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioPlayer={audioPlayer}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
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
