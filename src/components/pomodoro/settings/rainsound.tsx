import React, { useRef, useEffect, useState } from "react";

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if the audio element is available
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd);
      audioRef.current.volume = 1; // Set initial volume to 1
      audioRef.current.loop = true;
    }
  }, []);

  const crossfadeDuration = 2; // Duration in seconds
  const fadeOutInterval = 10; // Interval for volume reduction in milliseconds

  const crossfadeOut = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      let currentVolume = currentAudio.volume;
      const interval = setInterval(() => {
        currentVolume -= fadeOutInterval / (crossfadeDuration * 1000);
        currentAudio.volume = Math.max(currentVolume, 0);

        if (currentVolume <= 0) {
          clearInterval(interval);
          currentAudio.pause();
          setIsPlaying(false);
          currentAudio.volume = 1; // Reset volume to 1 when paused
        }
      }, fadeOutInterval);
    }
  };

  const handleAudioEnd = () => {
    // Crossfade by decreasing volume at the end
    crossfadeLast15Seconds();
  };

  const crossfadeLast15Seconds = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      const duration = currentAudio.duration;
      const crossfadeDuration = 2; // Crossfade duration in seconds
      const fadeOutInterval = 10; // Interval for volume reduction in milliseconds
      const fadeOutStart = duration - 15; // Start fading out at the last 15 seconds

      if (currentAudio.currentTime >= fadeOutStart) {
        let currentVolume = currentAudio.volume;
        const interval = setInterval(() => {
          currentVolume -= fadeOutInterval / (crossfadeDuration * 1000);
          currentAudio.volume = Math.max(currentVolume, 0);

          if (currentVolume <= 0) {
            clearInterval(interval);
            currentAudio.currentTime = 20; // Reset audio to the beginning of the first 20 seconds
            currentAudio.volume = 1;
          }
        }, fadeOutInterval);
      }
    }
  };

  const toggleAudio = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      if (isPlaying) {
        crossfadeOut();
      } else {
        currentAudio.currentTime = 0; // Reset audio to the beginning
        currentAudio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div>
      <h1>Play Looping Audio with Crossfade</h1>
      <button onClick={toggleAudio}>{isPlaying ? "Pause" : "Play"}</button>

      <audio className="" controls ref={audioRef}>
        <source
          src="https://cdn.pixabay.com/audio/2022/07/04/audio_f52a5754b1.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;

// import React, { useRef, useEffect, useState } from "react";

// function AudioPlayer() {
//   const audioRef1 = useRef<HTMLAudioElement | null>(null);
//   const audioRef2 = useRef<HTMLAudioElement | null>(null);
//   const currentAudio = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     // Check if the audio elements are available
//     if (audioRef1.current && audioRef2.current) {
//       audioRef1.current.volume = 1;
//       audioRef2.current.volume = 0; // Initially, the second audio is muted
//       audioRef1.current.addEventListener("ended", handleAudioEnd);
//       audioRef2.current.addEventListener("ended", handleAudioEnd);
//     }
//   }, []);

//   const crossfadeDuration = 2; // Duration of the crossfade in seconds
//   const fadeOutInterval = 10; // Interval for volume reduction in milliseconds
//   const loopStartTime = 20; // Start looping from the first 20 seconds

//   const crossfade = (
//     fromAudio: HTMLAudioElement,
//     toAudio: HTMLAudioElement
//   ) => {
//     let currentVolume = fromAudio.volume;
//     const interval = setInterval(() => {
//       currentVolume -= fadeOutInterval / (crossfadeDuration * 1000);
//       fromAudio.volume = Math.max(currentVolume, 0);
//       toAudio.volume = 1 - fromAudio.volume; // Crossfade by adjusting the volume of the other audio

//       if (currentVolume <= 0) {
//         clearInterval(interval);
//         fromAudio.currentTime = loopStartTime;
//         fromAudio.volume = 1;
//         toAudio.volume = 0; // Mute the other audio
//         fromAudio.play();
//         if (currentAudio.current) {
//           currentAudio.current = fromAudio;
//         }
//         setIsPlaying(true); // Update the state to indicate audio is playing
//       }
//     }, fadeOutInterval);
//   };

//   const handleAudioEnd = () => {
//     // When audio ends, start the crossfade to the beginning of the other audio
//     const fromAudio =
//       currentAudio.current === audioRef1.current
//         ? audioRef1.current!
//         : audioRef2.current!;
//     const toAudio =
//       currentAudio.current === audioRef1.current
//         ? audioRef2.current!
//         : audioRef1.current!;
//     crossfade(fromAudio, toAudio);
//   };

//   const toggleAudio = () => {
//     if (currentAudio.current) {
//       if (isPlaying) {
//         currentAudio.current.pause();
//         setIsPlaying(false);
//       } else {
//         currentAudio.current.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Play Audio with Seamless Loop</h1>
//       <button onClick={toggleAudio}>{isPlaying ? "Pause" : "Play"}</button>
//       <div>
//         <audio ref={audioRef1} controls>
//           <source
//             src="https://cdn.pixabay.com/audio/2022/07/04/audio_f52a5754b1.mp3"
//             type="audio/mpeg"
//           />
//           Your browser does not support the audio element.
//         </audio>
//       </div>
//       <div>
//         <audio ref={audioRef2} controls>
//           <source
//             src="https://cdn.pixabay.com/audio/2022/07/04/audio_f52a5754b1.mp3"
//             type="audio/mpeg"
//           />
//           Your browser does not support the audio element.
//         </audio>
//       </div>
//     </div>
//   );
// }

// export default AudioPlayer;
