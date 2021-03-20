import React, { useEffect } from "react";
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
  const { currentTime, duration, animationPercent } = songInfo;
  const activeLibraryHandle = (nextprev) => {
    const newSongs = songs.map((el, index) => {
      if (el.id === nextprev.id) {
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
    setSongs(newSongs);
  };
  // useEffect(() => {
  //   const newSongs = songs.map((el, index) => {
  //     if (el.id === currentSong.id) {
  //       return {
  //         ...el,
  //         active: true,
  //       };
  //     } else {
  //       return {
  //         ...el,
  //         active: false,
  //       };
  //     }
  //   });
  //   setSongs(newSongs);
  // }, [currentSong]);

  useEffect(() => {
    const index = songs.findIndex((el) => el.id === currentSong.id);
    if (currentTime === duration && duration) {
      if (index === songs.length - 1) {
        activeLibraryHandle(songs[0]);
        setCurrentSong(songs[0]);
        setIsPlaying(false);
      } else {
        activeLibraryHandle(songs[index + 1]);
        setCurrentSong(songs[index + 1]);
      }
    } else {
      if (index !== 0) {
        if (isPlaying) {
          setIsPlaying(false);
          const playPromise = audioPlayer.current.play();
          if (playPromise !== undefined) {
            playPromise.then((play) => audioPlayer.current.play());
          }
          setIsPlaying(true);
        }
      }
    }
  }, [currentTime, duration]);

  const onPlay = () => {
    audioPlayer.current.play();
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };
  const onPause = () => {
    audioPlayer.current.pause();
    if (isPlaying) {
      setIsPlaying(false);
    }
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
      if (currentTime > 4 || currentTime === duration) {
        audioPlayer.current.currentTime = 0;
      } else {
        if (currentIndex === 0) {
          // todo some time
          currentIndex = songs.length - 1;
        } else {
          currentIndex = currentIndex - 1;
        }
      }
    } else if (direction === "skip-forward") {
      if (currentIndex === songs.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex = currentIndex + 1;
      }
    }
    activeLibraryHandle(songs[currentIndex]);
    setCurrentSong(songs[currentIndex]);

    if (isPlaying) {
      setIsPlaying(false);
      const playPromise = audioPlayer.current.play();
      if (playPromise !== undefined) {
        playPromise.then((play) => audioPlayer.current.play());
      }
      setIsPlaying(true);
    }
  };

  const trackAnim = {
    transform: `translateX(${animationPercent}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,transparent,${currentSong.color[0]},${currentSong.color[1]},transparent`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{duration ? formatTime(duration) : "0:00"}</p>
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
