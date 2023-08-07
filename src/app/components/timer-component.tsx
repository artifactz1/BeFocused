import React, { useState, useEffect } from "react";
import { AiFillPauseCircle } from "react-icons/ai";
import RainEffect from "./rain-component";
import WaveComponent from "./wave-component";

const TimerComponent: React.FC = () => {
  const minutes = 0;
  const seconds = 10;

  // Convert the total duration to seconds
  const totalDuration = minutes * 60 + seconds;

  const [progress, setProgress] = useState(100);
  const [remainingTime, setRemainingTime] = useState(totalDuration);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

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

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [totalDuration]);

  // Format the remaining time in minutes and seconds
  const displayMinutes = Math.floor(remainingTime / 60);
  const displaySeconds = remainingTime % 60;

  // Calculate the position of the wave component
  const wavePosition = (progress / 100) * screenHeight;

  return (
    <div className="w-screen h-screen">
      <div
        className="bg-white h-full w-full transition-transform  duration-1000 origin-top bottom-0 absolute"
        style={{
          transform: `scaleY(${1 - progress / 100 - 0.09})`, // Adjust the scale to your preference
          transformOrigin: "bottom",
        }}
      />

      <div
        className="waves absolute w-full h-[10vh] transition-transform duration-1000 origin-bottom "
        style={{
          transform: `translateY(${wavePosition}px)`, // Use translateY to position the wave component
          transformOrigin: "bottom",
        }}
      >
        <WaveComponent />
      </div>

      <div className="text-black text-[120px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {displayMinutes.toString().padStart(2, "0")}:
        {displaySeconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default TimerComponent;

// import React, { useState, useEffect } from "react";
// import { AiFillPauseCircle } from "react-icons/ai";
// import RainEffect from "./rain-component";
// import WaveComponent from "./wave-component";

// const TimerComponent: React.FC = () => {
//   const [isPaused, setIsPaused] = useState(true);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(10);
//   const totalDuration = minutes * 60 + seconds;
//   const [progress, setProgress] = useState(100);
//   const [remainingTime, setRemainingTime] = useState(totalDuration);
//   const [screenHeight, setScreenHeight] = useState(window.innerHeight);

//   useEffect(() => {
//     let currentTime = totalDuration;

//     const timerInterval = setInterval(() => {
//       if (!isPaused) {
//         currentTime -= 1;
//         const newProgress = (currentTime / totalDuration) * 100;
//         setProgress(newProgress);
//         setRemainingTime(currentTime);

//         if (currentTime <= 0) {
//           console.log("Timer has completed!");
//           clearInterval(timerInterval);
//           setIsPaused(true); // Pause the timer when it completes
//         }
//       }
//     }, 1000);

//     const handleResize = () => {
//       setScreenHeight(window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       clearInterval(timerInterval);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [totalDuration, isPaused]);

//   const handleStartPauseClick = () => {
//     setIsPaused((prevState) => !prevState); // Toggle pause state
//   };

//   const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setMinutes(Number(event.target.value));
//   };

//   const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSeconds(Number(event.target.value));
//   };

//   const wavePosition = (progress / 100) * screenHeight;

//   const displayMinutes = Math.floor(remainingTime / 60);
//   const displaySeconds = remainingTime % 60;

//   return (
//     <div className="w-screen h-screen">
//       <div
//         className="bg-red-500 h-full w-full transition-transform duration-1000 origin-bottom absolute"
//         style={{
//           //   transform: `scaleY(${1 - progress / 100} `,
//           transform: `scaleY(${1 - progress / 100 - 0.06} `,
//           transformOrigin: "bottom",
//         }}
//       />
//       <div
//         className="waves absolute w-full transition-transform duration-1000 origin-bottom mb-[100px]"
//         style={{
//           bottom: 0,
//           transform: `translateY(${wavePosition}px)`,
//         }}
//       >
//         <WaveComponent />
//       </div>

//       <div className="text-black text-[120px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//         {displayMinutes.toString().padStart(2, "0")}:
//         {displaySeconds.toString().padStart(2, "0")}
//       </div>

//       {/* Input fields for minutes and seconds */}
//       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
//         <input
//           type="number"
//           value={minutes}
//           onChange={handleMinutesChange}
//           className="mr-2 px-2 py-1 border"
//         />
//         <input
//           type="number"
//           value={seconds}
//           onChange={handleSecondsChange}
//           className="px-2 py-1 border"
//         />
//       </div>

//       {/* Start/Pause button */}
//       <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2">
//         <button
//           onClick={handleStartPauseClick}
//           className="px-4 py-2 bg-blue-500 text-white"
//         >
//           {isPaused ? "Start" : "Pause"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TimerComponent;
