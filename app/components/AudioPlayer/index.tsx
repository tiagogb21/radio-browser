import React from "react";

interface AudioPlayerProps {
  playingRadio: string;
}

export function AudioPlayer({ playingRadio }: AudioPlayerProps) {
  return (
    <>
      {playingRadio && (
        <audio controls autoPlay src={playingRadio} data-testid="audio-player" className="hidden"></audio>
      )}
    </>
  );
}
