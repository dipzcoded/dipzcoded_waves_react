import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioPlayer,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
}) => {
  const librarySongs = songs.map((song) => (
    <LibrarySong
      key={song.id}
      song={song}
      setCurrentSong={setCurrentSong}
      audioPlayer={audioPlayer}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
    />
  ));
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">{librarySongs}</div>
    </div>
  );
};

export default Library;
