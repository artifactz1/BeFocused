// import React, { useRef } from "react";

// function AudioPlayer() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const startPlayback = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = 0; // Start at 5 seconds
//       audioRef.current.play();
//     }
//   };

//   const stopPlayback = () => {
//     if (audioRef.current) {
//       const audioDuration = audioRef.current.duration;
//       const endPosition = audioDuration - 5; // Last 5 seconds
//       audioRef.current.currentTime = endPosition;
//       audioRef.current.play();
//     }
//   };

//   const loopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = 10; // Start at 5 seconds
//       audioRef.current.play();
//       audioRef.current.addEventListener("timeupdate", loopCheck);
//     }
//   };

//   const loopCheck = () => {
//     if (audioRef.current) {
//       const currentTime = audioRef.current.currentTime;
//       const duration = audioRef.current.duration;
//       const loopStartTime = 10;
//       const loopEndTime = duration - 10;

//       if (currentTime >= loopEndTime) {
//         audioRef.current.currentTime = loopStartTime;
//       }
//     }
//   };

//   return (
//     <div className="flex space-x-3 ">
//       {/* <audio className="hidden" controls ref={audioRef}> */}
//       <audio className="" controls ref={audioRef}>
//         <source
//           src="https://cdn.pixabay.com/audio/2022/07/04/audio_f52a5754b1.mp3"
//           type="audio/mpeg"
//         />
//         Your browser does not support the audio element.
//       </audio>
//       <button onClick={startPlayback}>Start</button>
//       <button onClick={stopPlayback}>Stop</button>
//       <button onClick={loopAudio}>Loop</button>
//     </div>
//   );
// }

// export default AudioPlayer;

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

  const handleAudioEnd = () => {
    // Crossfade by decreasing volume at the end
    const crossfadeDuration = 2; // Duration in seconds
    const fadeOutInterval = 10; // Interval for volume reduction in milliseconds

    let currentVolume = 1;
    const interval = setInterval(() => {
      currentVolume -= fadeOutInterval / (crossfadeDuration * 1000);
      if (audioRef.current) {
        audioRef.current.volume = Math.max(currentVolume, 0);
      }

      if (currentVolume <= 0) {
        clearInterval(interval);
        // After fading out, reset the audio element and play
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 1;
          audioRef.current.play();
        }
      }
    }, fadeOutInterval);

    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

// import React, { useState } from "react";
// import ReactPlayer from "react-player";
// import axios from "axios";

// //AIzaSyDCK596A9KAUTidmmBlWCLg6frHI61xfM8

// const API_KEY = "AIzaSyDCK596A9KAUTidmmBlWCLg6frHI61xfM8"; // Replace with your YouTube API key

// function getVideoIdFromUrl(url: string): string | null {
//   const urlObject = new URL(url);
//   const searchParams = new URLSearchParams(urlObject.search);
//   const videoId = searchParams.get("v");
//   return videoId;
// }

// const youtubeUrl =
//   "https://www.youtube.com/watch?v=lriGjx_EG2Y&ab_channel=ZenDrops-RainSoundsForSleeping";

// const AudioPlayer: React.FC = () => {
//   const [audioURL, setAudioURL] = useState<string>("");

//   const fetchAudioURL = async () => {
//     try {
//       const videoId = getVideoIdFromUrl(youtubeUrl);
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`
//       );
//       if (response.data.items && response.data.items.length > 0) {
//         const contentDetails = response.data.items[0].contentDetails;
//         const duration = contentDetails.duration;
//         const audioURL = `https://www.youtube.com/watch?v=${videoId}&t=0s&start=0&end=${duration}`;
//         setAudioURL(audioURL);
//       } else {
//         console.error("Video not found or API response format is unexpected.");
//       }
//     } catch (error) {
//       console.error("Error fetching audio URL:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchAudioURL}>Play</button>
//       {audioURL && <ReactPlayer url={audioURL} playing controls />}
//     </div>
//   );
// };

// export default AudioPlayer;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_KEY = "AIzaSyDCK596A9KAUTidmmBlWCLg6frHI61xfM8"; // Replace with your YouTube API key

// function getVideoIdFromUrl(url: string): string | null {
//   const urlObject = new URL(url);
//   const searchParams = new URLSearchParams(urlObject.search);
//   const videoId = searchParams.get("v");
//   return videoId;
// }

// const youtubeUrl =
//   //   "https://www.youtube.com/watch?v=lriGjx_EG2Y&ab_channel=ZenDrops-RainSoundsForSleeping";
//   "https://www.youtube.com/watch?v=LuKm4L9ryB0&ab_channel=TravisScottVEVO";

// function parseISO8601Duration(duration: string) {
//   const match = duration.match(/P(\d+H)?(\d+M)?(\d+S)?/);

//   if (match) {
//     const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
//     const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
//     const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;

//     return hours * 3600 + minutes * 60 + seconds;
//   }

//   // If there is no match, return a default value (e.g., 0).
//   return 0;
// }

// function AudioPlayer() {
//   const [audioURL, setAudioURL] = useState("");

//   useEffect(() => {
//     async function fetchAudioURL() {
//       try {
//         const VIDEO_ID = getVideoIdFromUrl(youtubeUrl);

//         // Make a request to the YouTube Data API to fetch video details
//         const response = await axios.get(
//           `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${VIDEO_ID}&key=${API_KEY}`
//         );

//         // Extract the video's duration

//         const durationISO8601 = response.data.items[0].contentDetails.duration;

//         // const duration = response.data.items[0].contentDetails.duration;
//         const durationInSeconds = parseISO8601Duration(durationISO8601);

//         // Generate the audio URL with start and end parameters
//         const audioURL = `https://www.youtube.com/watch?v=${VIDEO_ID}&t=0s&start=0&end=${39600}`;
//         setAudioURL(audioURL);
//       } catch (error) {
//         console.error("Error fetching audio URL:", error);
//       }
//     }

//     fetchAudioURL();
//   }, []);

//   return (
//     <div>
//       <h1>Play YouTube Audio (Audio Only)</h1>
//       {audioURL && (
//         <audio controls>
//           <source src={audioURL} type="audio/mpeg" />
//           Your browser does not support the audio element.
//         </audio>
//       )}
//     </div>
//   );
// }

// export default AudioPlayer;
