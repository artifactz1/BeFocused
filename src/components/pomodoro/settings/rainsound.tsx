import React, { useRef } from "react";

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startPlayback = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Start at 5 seconds
      audioRef.current.play();
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      const endPosition = audioDuration - 5; // Last 5 seconds
      audioRef.current.currentTime = endPosition;
      audioRef.current.play();
    }
  };

  const loopAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 10; // Start at 5 seconds
      audioRef.current.play();
      audioRef.current.addEventListener("timeupdate", loopCheck);
    }
  };

  const loopCheck = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const loopStartTime = 10;
      const loopEndTime = duration - 10;

      if (currentTime >= loopEndTime) {
        audioRef.current.currentTime = loopStartTime;
      }
    }
  };

  return (
    <div className="flex space-x-3 ">
      {/* <audio className="hidden" controls ref={audioRef}> */}
      <audio className="" controls ref={audioRef}>
        <source
          src="https://cdn.pixabay.com/audio/2022/07/04/audio_f52a5754b1.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      <button onClick={startPlayback}>Start</button>
      <button onClick={stopPlayback}>Stop</button>
      <button onClick={loopAudio}>Loop</button>
    </div>
  );
}

export default AudioPlayer;
