"use client";

import { useState, useEffect } from "react";
import { AiFillPauseCircle } from "react-icons/ai";

export default function TimerComponent() {
  const minutes = 0;
  const seconds = 10;

  // Convert the total duration to seconds
  const totalDuration = minutes * 60 + seconds;

  const [progress, setProgress] = useState(100);
  const [remainingTime, setRemainingTime] = useState(totalDuration);

  useEffect(() => {
    let currentTime = totalDuration;

    const timerInterval = setInterval(() => {
      currentTime -= 1;
      const newProgress = (currentTime / totalDuration) * 100;
      setProgress(newProgress);
      setRemainingTime(currentTime);

      if (currentTime <= 0) {
        console.log("Timer has completed!");
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [totalDuration]);

  // Format the remaining time in minutes and seconds
  const displayMinutes = Math.floor(remainingTime / 60);
  const displaySeconds = remainingTime % 60;

  return (
    <div className="w-1/2 h-screen p-4">
      <div className="bg-gray-200 w-full h-full flex items-end justify-center rounded-[30px] overflow-hidden relative border-[2px] border-black">
        <div
          className="bg-[#BB3B0E] h-full w-full transition-transform duration-1000 origin-bottom"
          style={{
            transform: `scaleY(${progress / 100})`,
            transformOrigin: "bottom",
          }}
        ></div>

        <div className="text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
          {displayMinutes.toString().padStart(2, "0")}:
          {displaySeconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

// "use-client";

// // Milliseconds Added

// import React, { useState, useEffect } from "react";
// import { AiFillPauseCircle } from "react-icons/ai";

// export default function TimerComponent() {
//   const minutes = 0;
//   const seconds = 10;

//   // Convert the total duration to seconds
//   const totalDuration = minutes * 60 + seconds;

//   const [progress, setProgress] = useState(100);
//   const [remainingTime, setRemainingTime] = useState(totalDuration * 1000); // Convert to milliseconds

//   useEffect(() => {
//     let currentTime = totalDuration * 1000; // Convert to milliseconds

//     const timerInterval = setInterval(() => {
//       currentTime -= 10; // Decrease by 10 milliseconds
//       const newProgress = (currentTime / (totalDuration * 1000)) * 100; // Convert back to seconds and calculate progress
//       setProgress(newProgress);
//       setRemainingTime(currentTime);

//       if (currentTime <= 0) {
//         console.log("Timer has completed!");
//         clearInterval(timerInterval);
//       }
//     }, 10); // Update every 10 milliseconds

//     return () => clearInterval(timerInterval);
//   }, [totalDuration]);

//   // Format the remaining time in minutes, seconds, and milliseconds
//   const displayMinutes = Math.floor(remainingTime / (60 * 1000));
//   const displaySeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
//   //   const displayMilliseconds = remainingTime % 1000;

//   return (
//     <div className="w-1/2 h-screen p-4">
//       <div className="bg-gray-200 w-full h-full flex items-end justify-center rounded-[30px] overflow-hidden relative border-[2px] border-black">
//         <div
//           className="bg-red-500 h-full w-full transition-transform duration-10 origin-bottom"
//           style={{
//             transform: `scaleY(${remainingTime / (totalDuration * 1000)})`,
//             transformOrigin: "bottom",
//           }}
//         ></div>

//         <div className="text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           {displayMinutes.toString().padStart(2, "0")}:
//           {displaySeconds.toString().padStart(2, "0")}
//           {/* {displayMilliseconds.toString().padStart(3, "0")} */}
//         </div>
//       </div>
//     </div>
//   );
// }
