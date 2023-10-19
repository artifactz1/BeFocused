'use client';

import React, { useState, useEffect } from 'react';
import WaveComponent from './wave';
import SettingsComponent from './settings/settings';
import { Button } from '../ui/button';

interface Props {
  isPlaying: boolean;
  setIsPlaying: (isPLaying: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

const Timer: React.FC<Props> = ({
  isPlaying,
  setIsPlaying,
  children,
  className
}) => {
  const combinedClassName = `default-classes ${className || ''}`;

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
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [getCurrentTime, setCurrentTime] = useState(totalDuration);
  const [remainingTime, setRemainingTime] = useState(getCurrentTime);
  const [screenHeight, setScreenHeight] = useState(0);

  // Format the remaining time in minutes and seconds
  const displayMinutes = Math.floor(remainingTime / 60);
  const displaySeconds = remainingTime % 60;

  const [isButtonToggled, setIsButtonToggled] = useState(false);
  const [totalFocus, setTotalFocus] = useState(25);
  const [totalShortBreak, setTotalShortBreak] = useState(5);
  const [totalLongBreak, setTotalLongBreak] = useState(15);

  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(4);
  const [toggleBreak, setToggleBreak] = useState(false);

  const [overTimeRounds, setOverTimeRounds] = useState(1);
  const [roundType, setRoundType] = useState('FOCUS');

  const [savedValues, setSavedValues] = useState<any>(null);
  const [counterRounds, setCounterRounds] = useState(0);

  useEffect(() => {
    resetTimer();
  }, [inputMinutes]);

  const roundTypeCalc = (
    currentRound: number,
    maxRound: number,
    overTimeRounds: number
  ) => {
    console.log('round' + currentRound);

    if (currentRound % maxRound === 0) {
      if (toggleBreak === false) {
        setToggleBreak(true);
        return 3;
      } else {
        setToggleBreak(false);
        return 1;
      }
    } else {
      if (toggleBreak === false) {
        setToggleBreak(true);
        return 2;
      } else {
        setToggleBreak(false);
        return 1;
      }
    }
  };

  const nextRound = () => {
    const rType = roundTypeCalc(currentRound, totalRounds, overTimeRounds);

    switch (rType) {
      case 1:
        setRoundType('FOCUS');
        setInputMinutes(totalFocus.toString());

        if (currentRound + 1 > totalRounds) {
          setCurrentRound(1);
          setOverTimeRounds(overTimeRounds + 1);
        } else {
          setCurrentRound(currentRound + 1);
        }

        break;

      case 2:
        setRoundType('SHORT BREAK');
        setInputMinutes(totalShortBreak.toString());
        break;

      case 3:
        setRoundType('LONG BREAK');
        setInputMinutes(totalLongBreak.toString());
    }

    resetTimer();
    // if (currentRound + 1 > totalRounds) {
    //   setCurrentRound(1);
    //   setOverTimeRounds(overTimeRounds + 1);
    //   setToggleBreak(true);
    // }
  };

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
          console.log('Timer has completed!');
          setIsPlaying(false);
          clearInterval(timerInterval);
          nextRound();
        }
      }
    }, 1000);

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [totalDuration, isPlaying]);

  // Calculate the position of the wave component
  const wavePosition = (progress / 100) * screenHeight;

  // Function to start the timer
  const startTimer = () => {
    if (progress <= 0) {
      console.log('Timer has completed!');
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
    // console.log(minutes);
    const newTotalDuration = calculateTime(minutes, 0);
    setIsPlaying(false);
    setProgress(100);
    setCurrentTime(newTotalDuration);
    setTotalDuration(newTotalDuration);
    setRemainingTime(newTotalDuration);
  };

  const handleSave = (values: any) => {
    console.log('Received values in parent:', values);

    setInputMinutes(values.focus); // Use values.focus directly
    setTotalFocus(values.focus);
    setCurrentRound(1);
    resetTimer();
    setRoundType('FOCUS');

    setTotalShortBreak(values.shortBreak);
    setTotalLongBreak(values.longBreak);
    setTotalRounds(values.rounds);
    setSavedValues(values); // Set savedValues after updating individual states
    setOverTimeRounds(1);
  };

  return (
    <>
      <div className={combinedClassName}>
        <div className="h-screen w-full relative overflow-hidden z-0">
          {/* Filler Component */}
          <div
            className="absolute bg-white h-full w-full transition-transform duration-1000 origin-top bottom-0 "
            style={{
              transform: `scaleY(${1 - progress / 100 - 0.09})`,
              transformOrigin: 'bottom'
            }}
          />

          {/* Wave Component */}
          {screenHeight !== 0 && (
            <div
              className="waves absolute w-full h-[10vh] transition-transform duration-1000 origin-bottom "
              style={{
                transform: `translateY(${wavePosition}px)`,
                transformOrigin: 'bottom'
              }}
            >
              <WaveComponent />
            </div>
          )}

          {/* Rain Component */}
          <div className="absolute top-0 left-0 w-full -z-10">{children}</div>

          {/* Display Timer - Component (Server) (Doesn't need Reacet) ==================================================== */}
          {/* <div className="aboslute text-blue-500 left-4 bottom-0 z-20"> */}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-100 z-30">
            <div className="text-[120px]">
              {displayMinutes.toString().padStart(2, '0')}:
              {displaySeconds.toString().padStart(2, '0')}
            </div>
            <div className="text-[40px] text-blue-100">{roundType}</div>
            <div className="rounded-2xl">
              {currentRound} / {totalRounds} : ({overTimeRounds})
            </div>
            {/* <div className="mt-5">
          Progress: {progress} | Current Time: {getCurrentTime} | Remaining
          Time: {remainingTime}| Total Duration: {totalDuration} | Input Minute
          : {inputMinutes} |
        </div>
        <div className="mt-5">
          Short Break: {totalShortBreak} | Long Break: {totalLongBreak} | Rounds
          : {totalRounds}| Current Round : {currentRound} | RoundType : | Max
          Round : {totalRounds}
          {roundType} |
        </div> */}

            {/* Play/Pause Button */}
            {/* Play/Pause Button */}
            {isPlaying ? (
              <Button onClick={pauseTimer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              </Button>
            ) : (
              <Button onClick={startTimer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </Button>
            )}
          </div>

          <div className="absolute bottom-4 left-4 z-10">
            <div
              className={`transition-all duration-300 ${
                isButtonToggled ? 'opacity-100' : 'opacity-0'
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

            <button
              onClick={() => nextRound()}
              className="transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-fit rounded"
            >
              Next
            </button>
            <button
              onClick={() => resetTimer()}
              className="transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-fit rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
