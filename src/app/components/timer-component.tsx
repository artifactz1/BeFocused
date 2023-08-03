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
    <div className="bg-gray-200 w-1/2 h-screen flex items-end justify-center rounded-[30px] overflow-hidden relative">
      <div
        className="bg-red-500 h-full w-full transition-transform duration-1000 origin-bottom"
        style={{
          transform: `scaleY(${progress / 100})`,
          transformOrigin: "bottom",
        }}
      ></div>

      <div className="text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {displayMinutes.toString().padStart(2, "0")}:
        {displaySeconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
