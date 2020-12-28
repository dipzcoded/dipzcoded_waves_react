import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioPlayer,
  isPlaying,
  setIsPlaying,
  setSongs,
  isOpen,
}) => {
  const librarySongs = songs.map((song) => (
    <LibrarySong
      key={song.id}
      song={song}
      songs={songs}
      setCurrentSong={setCurrentSong}
      audioPlayer={audioPlayer}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      setSongs={setSongs}
    />
  ));
  return (
    <div className={`library ${isOpen && "open"}`}>
      <h2>Library</h2>
      <div className="library-songs">{librarySongs}</div>
    </div>
  );
};

export default Library;
