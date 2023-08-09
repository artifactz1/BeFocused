
// import React, { useState, useEffect } from "react";
import TimerVisualComponent from "./timer-visual-component";
import DisplayTimerComponent from "./display-component";
import TimeInputComponent from "./time-input-component";

// const TimerComponent: React.FC = () => {
//   // Client-side logic for TimerComponent
//   // Uses React and components above

//   const calculateTime = (minutes: number, seconds: number) => {
//     const totalDuration = minutes * 60 + seconds;
//     return totalDuration;
//   };

//   const initialMinutes = 25;
//   const initialSeconds = 0;

//   // Convert the total duration to seconds
//   const totalDuration = calculateTime(initialMinutes, initialSeconds);

//   const [progress, setProgress] = useState(100);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hasPlayed, setHasPlaying] = useState(false);
//   const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
//   const [inputSeconds, setInputSeconds] = useState(initialSeconds.toString());
//   const [getCurrentTime, setCurrentTime] = useState(totalDuration);
//   const [remainingTime, setRemainingTime] = useState(getCurrentTime);
//   // const [screenHeight, setScreenHeight] = useState(() => window.innerHeight);
//   const [screenHeight, setScreenHeight] = useState(0);

//   // Format the remaining time in minutes and seconds
//   const displayMinutes = Math.floor(remainingTime / 60);
//   const displaySeconds = remainingTime % 60;

//   useEffect(() => {
//     setScreenHeight(window.innerHeight); // Set initial value after component mount

//     let currentTime = getCurrentTime;

//     const timerInterval = setInterval(() => {
//       if (isPlaying) {
//         currentTime -= 1;
//         const newProgress = (currentTime / getCurrentTime) * 100;
//         setProgress(newProgress);
//         setRemainingTime(currentTime);
//         setCurrentTime(currentTime);
//         if (currentTime <= 0) {
//           console.log("Timer has completed!");
//           setIsPlaying(false);
//           clearInterval(timerInterval);
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
//   }, [totalDuration, isPlaying]);

//   // Calculate the position of the wave component
//   const wavePosition = (progress / 100) * screenHeight;

//   const handleTimeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Client-side logic for handling time input
//   };

//   const startTimer = () => {
//     // Client-side logic for starting the timer
//   };

//   const pauseTimer = () => {
//     // Client-side logic for pausing the timer
//   };

//   const resetTimer = () => {
//     // Client-side logic for resetting the timer
//   };

  // ==========================================================================================================
  
const TimerComponent: React.FC = () => {

  const calculateTime = (minutes: number, seconds: number): number => {
    const totalDuration: number = minutes * 60 + seconds;
    return totalDuration;
  };
 

  const initialMinutes: number = 25;
  const initialSeconds: number = 0;
  
  let totalDuration = calculateTime(initialMinutes, initialSeconds)  

  let progress: number = 100;
  let isPlaying: boolean = false;
  let hasPlayed: boolean = false;
  let inputMinutes: string = initialMinutes.toString();
  let inputSeconds: string = initialSeconds.toString();
  let getCurrentTime: number = totalDuration;
  let remainingTime: number = getCurrentTime;
  let screenHeight: number = (window as any).innerHeight;
  // let screenHeight: number = 0;
  
  const displayMinutes: number = Math.floor(remainingTime / 60);
  const displaySeconds: number = remainingTime % 60;

  
  const wavePosition = (progress / 100) * screenHeight;

  const handleResize = (): void => {
    screenHeight = window.innerHeight;
  };
  
  const timerInterval = setInterval(() => {
    if (isPlaying) {
      getCurrentTime -= 1;
      const newProgress: number = (getCurrentTime / totalDuration) * 100;
      progress = newProgress;
      remainingTime = getCurrentTime;
      if (getCurrentTime <= 0) {
        console.log("Timer has completed!");
        isPlaying = false;
        clearInterval(timerInterval);
      }
    }
  }, 1000);
  
  window.addEventListener("resize", handleResize);
  
  const handleTimeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "minutes") {
      console.log("checkMIN", value);
      if (value == null || value == undefined) {
        inputMinutes = "0";
      } else {
        inputMinutes = value;
      }
    } else if (name === "seconds") {
      console.log("checkSec", value);
      if (value === null || value === undefined || parseInt(value) > 59) {
        inputMinutes = "0";
      } else if (value.toString().length > 2) {
        inputMinutes = value.toString().substring(0, 2);
      } else if (value == "0") {
        inputMinutes = "0";
      } else {
        inputSeconds = value;
      }
    }
    console.log(inputMinutes);
    console.log(inputSeconds);
  };
  
  const startTimer = (): void => {
    remainingTime = getCurrentTime;
    progress = 100;
    isPlaying = true;
    hasPlayed = true;
  };
  
  const pauseTimer = (): void => {
    isPlaying = false;
  };
  
  const resetTimer = (): void => {
    const minutes = parseInt(inputMinutes);
    const seconds = parseInt(inputSeconds);
    const newTotalDuration = calculateTime(minutes, seconds);
    remainingTime = newTotalDuration;
    isPlaying = false;
    remainingTime = calculateTime(parseInt(inputMinutes), parseInt(inputSeconds));
    getCurrentTime = calculateTime(parseInt(inputMinutes), parseInt(inputSeconds));
    progress = 100;
  };
  
  window.addEventListener("resize", handleResize);
  


  // ==========================================================================================================
  return (
    <div className="w-screen h-[calc(100dvh)]  md:h-screen">
      <TimerVisualComponent progress={progress} wavePosition={wavePosition} />
      <DisplayTimerComponent displayMinutes={displayMinutes} displaySeconds={displaySeconds} />
      <TimeInputComponent
        inputMinutes={inputMinutes}
        inputSeconds={inputSeconds}
        handleTimeInput={handleTimeInput}
        resetTimer={resetTimer}
        isPlaying={isPlaying}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
    </div>
  );
};

export default TimerComponent;
