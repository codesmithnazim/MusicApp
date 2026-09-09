import { memo } from "react";


function SongMainCard({cardRef, song}) {
  // console.log("the song details = ", imageSrc, audioSongSrc, content)

console.log('the song deatils from the main songCard ', song)

  return (
    <div
      className="song  flex flex-col w-120 h-83 text-foreground"
      ref={cardRef}
    >
      <img
        src={song.songCover}
        alt={song.artist}
        className="w-full object-cover h-68 rounded-md shadow-2xl"
      />
      <div>{song.title}</div>
      <div>{song.artist}</div>
    </div>
  );
}

export default memo(SongMainCard);
