import React, { useState, useEffect } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import RainEffect from "./rain-component";
import WaveComponent from "./wave-component";

const TimerComponent: React.FC = () => {
  const initialMinutes = 0;
  const initialSeconds = 3;

  // Convert the total duration to seconds
  const totalDuration = initialMinutes * 60 + initialSeconds;

  const [progress, setProgress] = useState(100);
  const [remainingTime, setRemainingTime] = useState(totalDuration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlaying] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [inputSeconds, setInputSeconds] = useState(initialSeconds.toString());
  const [screenHeight, setScreenHeight] = useState(() => window.innerHeight);

  const [getCurrentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let currentTime = totalDuration;

    const timerInterval = setInterval(() => {
      if (isPlaying) {
        currentTime -= 1;
        const newProgress = (currentTime / totalDuration) * 100;
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

  // Format the remaining time in minutes and seconds
  const displayMinutes = Math.floor(remainingTime / 60);
  const displaySeconds = remainingTime % 60;

  // Calculate the position of the wave component
  const wavePosition = (progress / 100) * screenHeight;

  // Function to handle user input for time
  const handleTimeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "minutes") {
      setInputMinutes(value);
    } else if (name === "seconds") {
      setInputSeconds(value);
    }
  };

  // Function to start the timer
  const startTimer = () => {
    if (hasPlayed === false) {
      const minutes = parseInt(inputMinutes);
      const seconds = parseInt(inputSeconds);
      const newTotalDuration = minutes * 60 + seconds;
      setRemainingTime(newTotalDuration);
      setProgress(100);
      setIsPlaying(true);
      setHasPlaying(true);
    }

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
    setIsPlaying(false);
    setRemainingTime(totalDuration);
    setProgress(100);
  };

  return (
    <div className="w-screen h-screen">
      <div
        className="bg-white h-full w-full transition-transform duration-1000 origin-top bottom-0 absolute"
        style={{
          transform: `scaleY(${1 - progress / 100 - 0.09})`,
          transformOrigin: "bottom",
        }}
      />

      <div
        className="waves absolute w-full h-[10vh] transition-transform duration-1000 origin-bottom"
        style={{
          transform: `translateY(${wavePosition}px)`,
          transformOrigin: "bottom",
        }}
      >
        <WaveComponent />
      </div>

      <div className="text-black text-[120px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {displayMinutes.toString().padStart(2, "0")}:
        {displaySeconds.toString().padStart(2, "0")}
      </div>

      {/* Time Input */}
      <div className="flex flex-row absolute bottom-4 left-4">
        <input
          type="number"
          name="minutes"
          value={inputMinutes}
          onChange={handleTimeInput}
          className="border p-1 mr-1"
        />
        <span className="text-lg">:</span>
        <input
          type="number"
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
