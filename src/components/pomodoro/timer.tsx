"use client";

import React, { useState, useEffect } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import WaveComponent from "./wave";
import SettingsComponent from "./settings/settings";

interface Props {
  isPlaying: boolean;
  setIsPlaying: (isPLaying: boolean) => void;
}

const Timer: React.FC<Props> = ({ isPlaying, setIsPlaying }) => {
  const calculateTime = (minutes: number, seconds: number) => {
    const totalDuration = minutes * 60 + seconds;
    return totalDuration;
  };

  const initialMinutes = 25;
  const initialSeconds = 0;

  // Convert the total duration to seconds
  const [totalDuration, setTotalDuration] = useState(
    calculateTime(initialMinutes, initialSeconds)
  );

  const [progress, setProgress] = useState(100);
  const [hasPlayed, setHasPlaying] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [getCurrentTime, setCurrentTime] = useState(totalDuration);
  const [remainingTime, setRemainingTime] = useState(getCurrentTime);
  const [screenHeight, setScreenHeight] = useState(0);

  // Format the remaining time in minutes and seconds
  const displayMinutes = Math.floor(remainingTime / 60);
  const displaySeconds = remainingTime % 60;

  const [isButtonToggled, setIsButtonToggled] = useState(false);
  const [totalShortBreak, setTotalShortBreak] = useState(5);
  const [totalLongBreak, setTotalLongBreak] = useState(15);
  const [totalRounds, setTotalRounds] = useState(4);

  const [savedValues, setSavedValues] = useState<any>(null);
  const [settingChange, setSettingsChange] = useState(false);

  useEffect(() => {
    resetTimer();
  }, [inputMinutes]);

  useEffect(() => {
    setScreenHeight(window.innerHeight); // Set initial value after component mount

    let currentTime = getCurrentTime;

    const timerInterval = setInterval(() => {
      if (isPlaying) {
        currentTime -= 1;
        const newProgress =
          ((totalDuration - currentTime) / totalDuration) * 100;
        setProgress(Math.max(0, 100 - newProgress));
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
      }
    }
  };

  // Function to start the timer
  const startTimer = () => {
    if (progress <= 0) {
      console.log("Timer has completed!");
      resetTimer();
    } else {
      setProgress(progress);
    }
    setIsPlaying(true);
  };

  // Function to pause the progress
  const pauseTimer = () => {
    setCurrentTime(getCurrentTime);
    setIsPlaying(false);
    setProgress(progress);
  };

  // Function to reset the timer
  const resetTimer = () => {
    // handleTimeInput;
    const minutes = parseInt(inputMinutes);
    console.log(minutes);
    const newTotalDuration = calculateTime(minutes, 0);
    setIsPlaying(false);
    setProgress(100);
    setCurrentTime(newTotalDuration);
    setTotalDuration(newTotalDuration);
    setRemainingTime(newTotalDuration);
  };

  const handleSave = (values: any) => {
    // Do something with the saved values, e.g., make an API call, update state, etc.
    console.log("Received values in parent:", values);
    // setSavedValues(values);
    // setInputMinutes(savedValues.focus);
    // setTotalShortBreak(savedValues.shortBreak);
    // setTotalLongBreak(savedValues.longBreak);
    // setTotalRounds(savedValues.rounds);

    setInputMinutes(values.focus); // Use values.focus directly
    resetTimer();
    setTotalShortBreak(values.shortBreak);
    setTotalLongBreak(values.longBreak);
    setTotalRounds(values.rounds);
    setSavedValues(values); // Set savedValues after updating individual states
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
      {screenHeight !== 0 && (
        <div
          className="waves absolute w-full h-[10vh] transition-transform duration-1000 origin-bottom"
          style={{
            transform: `translateY(${wavePosition}px)`,
            transformOrigin: "bottom",
          }}
        >
          <WaveComponent />
        </div>
      )}

      {/* Display Timer - Component (Server) (Doesn't need Reacet) ==================================================== */}
      <div className="text-blue-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-[120px]">
          {displayMinutes.toString().padStart(2, "0")}:
          {displaySeconds.toString().padStart(2, "0")}
        </div>
        <div className="text-[40px] text-blue-100">FOCUS</div>
        Progress: {progress} | Current Time: {getCurrentTime} | Remaining Time:{" "}
        {remainingTime}| Total Duration: {totalDuration} | Input Minute :{" "}
        {inputMinutes}
        {/* Play/Pause Button */}
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

      <div className="absolute bottom-4 left-4">
        <div
          className={`transition-all duration-300 ${
            isButtonToggled ? "opacity-100" : "opacity-0"
          } mt-4 p-4 rounded`}
        >
          <SettingsComponent onSave={handleSave} />
        </div>

        <button
          onClick={() => setIsButtonToggled(!isButtonToggled)}
          className="transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-fit rounded"
        >
          Toggle Button
        </button>
      </div>
    </div>
  );
};

export default Timer;
