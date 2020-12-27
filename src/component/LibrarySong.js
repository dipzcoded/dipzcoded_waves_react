import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioPlayer,
  setSongInfo,
  songInfo,
}) => {
  const onSongSelect = () => {
    setCurrentSong(song);
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
    <div onClick={onSongSelect} className="library-song">
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
