import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioPlayer,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const onPlay = () => {
    audioPlayer.current.play();
    setIsPlaying(true);
  };
  const onPause = () => {
    audioPlayer.current.pause();
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioPlayer.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((el) => el.id === currentSong.id);
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        // todo some time
        currentIndex = songs.length - 1;
      } else {
        currentIndex = currentIndex - 1;
      }
    } else if (direction === "skip-forward") {
      if (currentIndex === songs.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex = currentIndex + 1;
      }
    }

    const newSongs = songs.map((el, index) => {
      if (index === currentIndex) {
        return {
          ...el,
          active: true,
        };
      } else {
        return {
          ...el,
          active: false,
        };
      }
    });
    setCurrentSong(songs[currentIndex]);
    setSongs(newSongs);

    if (isPlaying) {
      setIsPlaying(false);
      const playPromise = audioPlayer.current.play();
      if (playPromise !== undefined) {
        playPromise.then((play) => audioPlayer.current.play());
      }
      setIsPlaying(true);
    }
  };
  const { currentTime, duration } = songInfo;

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={dragHandler}
        />
        <p>{formatTime(duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        {isPlaying ? (
          <FontAwesomeIcon
            className="play"
            size="2x"
            icon={faPause}
            onClick={onPause}
          />
        ) : (
          <FontAwesomeIcon
            className="play"
            size="2x"
            icon={faPlay}
            onClick={onPlay}
          />
        )}

        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
