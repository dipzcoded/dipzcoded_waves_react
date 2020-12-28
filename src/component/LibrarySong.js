import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioPlayer,
  setSongs,
  songs,
}) => {
  const onSongSelect = () => {
    setCurrentSong(song);
    if (song.active) {
      audioPlayer.current.currentTime = 0;
    }
    const newSong = songs.map((el) => {
      if (el.id === song.id) {
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
    setSongs(newSong);
    if (isPlaying) {
      setIsPlaying(false);
      const playPromise = audioPlayer.current.play();
      if (playPromise !== undefined) {
        playPromise.then((play) => audioPlayer.current.play());
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
      const playPromise = audioPlayer.current.play();
      if (playPromise !== undefined) {
        playPromise.then((play) => audioPlayer.current.play());
      }
    }
  };
  return (
    <div
      onClick={onSongSelect}
      className="library-song"
      style={{
        background:
          song.active &&
          `linear-gradient(to right,transparent,${song.color[0]},${song.color[1]})`,
      }}
    >
      <img src={song.cover} alt={song.name} />
      <div className={`song-description ${song.active && "selected"}`}>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
