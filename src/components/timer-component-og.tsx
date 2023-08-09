"use client"
import React, { useState, useEffect } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import RainEffect from "./rain-component";
import WaveComponent from "./wave-component";

const TimerComponent: React.FC = () => {
  const calculateTime = (minutes: number, seconds: number) => {
    const totalDuration = minutes * 60 + seconds;
    return totalDuration;
  };

  const initialMinutes = 25;
  const initialSeconds = 0;

  // Convert the total duration to seconds
  const totalDuration = calculateTime(initialMinutes, initialSeconds);

  const [progress, setProgress] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlaying] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [inputSeconds, setInputSeconds] = useState(initialSeconds.toString());
  const [getCurrentTime, setCurrentTime] = useState(totalDuration);
  const [remainingTime, setRemainingTime] = useState(getCurrentTime);
  // const [screenHeight, setScreenHeight] = useState(() => window.innerHeight);
  const [screenHeight, setScreenHeight] = useState(0);

  // Format the remaining time in minutes and seconds
  const displayMinutes = Math.floor(remainingTime / 60);
  const displaySeconds = remainingTime % 60;

  useEffect(() => {
    setScreenHeight(window.innerHeight); // Set initial value after component mount

    let currentTime = getCurrentTime;

    const timerInterval = setInterval(() => {
      if (isPlaying) {
        currentTime -= 1;
        const newProgress = (currentTime / getCurrentTime) * 100;
        setProgress(newProgress);
        setRemainingTime(currentTime);
        setCurrentTime(currentTime);
        if (currentTime <= 0) {
          console.log("Timer has completed!");
          setIsPlaying(false);
          clearInterval(timerInterval);
        }
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
  }, [totalDuration, isPlaying]);

  // Calculate the position of the wave component
  const wavePosition = (progress / 100) * screenHeight;

  // Function to handle user input for time
  const handleTimeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "minutes") {
      console.log("checkMIN", value);
      if (value == null || value == undefined) {
        setInputMinutes("0");
      } else {
        setInputMinutes(value);
      }
    } else if (name === "seconds") {
      console.log("checkSec", value);
      if (
        value === null ||
        value === undefined ||
        parseInt(value.toString()) > 59
      ) {
        setInputMinutes("0");
      } else if (value.toString().length > 2) {
        setInputMinutes(value.toString().substring(0, 2));
      } else if (value == "0") {
        setInputMinutes("0");
      } else {
        setInputSeconds(value);
      }
    }
    console.log(inputMinutes);
    console.log(inputSeconds);

    // const minutes = parseInt(inputMinutes);
    // const seconds = parseInt(inputSeconds);
    // const newTotalDuration = calculateTime(minutes, seconds);
    // setRemainingTime(newTotalDuration);

    // resetTimer();
  };

  // Function to start the timer
  const startTimer = () => {
    // if (hasPlayed === false) {
    //   const minutes = parseInt(inputMinutes);
    //   const seconds = parseInt(inputSeconds);
    //   const newTotalDuration = calculateTime(minutes, seconds);
    //   setRemainingTime(newTotalDuration);
    //   setProgress(100);
    //   setIsPlaying(true);
    //   setHasPlaying(true);
    // }

    setRemainingTime(getCurrentTime);
    setProgress(100);
    setIsPlaying(true);
    setHasPlaying(true);
  };

  // Function to pause the timer
  const pauseTimer = () => {
    setIsPlaying(false);
  };

  // Function to reset the timer
  const resetTimer = () => {
    // handleTimeInput;
    const minutes = parseInt(inputMinutes);
    const seconds = parseInt(inputSeconds);
    const newTotalDuration = calculateTime(minutes, seconds);
    setRemainingTime(newTotalDuration);

    setIsPlaying(false);
    setRemainingTime(
      calculateTime(parseInt(inputMinutes), parseInt(inputSeconds))
    );
    setCurrentTime(
      calculateTime(parseInt(inputMinutes), parseInt(inputSeconds))
    );
    setProgress(100);
  };

  return (
    <div className="w-screen h-[calc(100dvh)]  md:h-screen">
      

      {/* Timer Visual Component (Server) (Doesn't need React)===================================================================================== */}

      <div
        className="bg-white h-full w-full transition-transform duration-1000 origin-top bottom-0 absolute"
        style={{
          transform: `scaleY(${1 - progress / 100 - 0.09})`,
          transformOrigin: "bottom",
        }}
      />

      {/* Waves =========================================================================================== */}

      <div
        className="waves absolute w-full h-[10vh] transition-transform duration-1000 origin-bottom"
        style={{
          transform: `translateY(${wavePosition}px)`,
          transformOrigin: "bottom",
        }}
      >
        <WaveComponent />
      </div>

      {/* Display Timer - Component (Server) (Doesn't need Reacet) ==================================================== */}
      <div className="text-black text-[120px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {displayMinutes.toString().padStart(2, "0")}:
        {displaySeconds.toString().padEnd(2, "0")}
      </div>

      {/* Time Input Componenet (Client) (Needs React to use React) ======================================= */}
      <div className="flex flex-row absolute bottom-4 left-4">
        <input
          type="number"
          min="1"
          name="minutes"
          value={inputMinutes}
          onChange={handleTimeInput}
          className="border p-1 mr-1"
        />
        <span className="text-lg">:</span>
        <input
          type="number"
          min="-1"
          max="61"
          name="seconds"
          value={inputSeconds}
          onChange={handleTimeInput}
          className="border p-1 ml-1"
        />
        <button
          onClick={resetTimer}
          className="bg-blue-500 text-white px-2 py-1 ml-2"
        >
          Reset
        </button>

        {/* Play/Pause Button */}
        {isPlaying ? (
          <AiFillPauseCircle
            onClick={pauseTimer}
            className="text-5xl  cursor-pointer px-2 py-1"
          />
        ) : (
          <AiFillPlayCircle
            onClick={startTimer}
            className="text-5xl cursor-pointer px-2 py- 2"
          />
        )}
      </div>
    </div>
  );
};

export default TimerComponent;