'use client';

import React, { useState, useEffect } from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import WaveComponent from './wave';
import SettingsComponent from './settings/settings';

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
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [getCurrentTime, setCurrentTime] = useState(totalDuration);
  const [remainingTime, setRemainingTime] = useState(getCurrentTime);
  const [screenHeight, setScreenHeight] = useState(0);
  const [heightReady, setHeightReady] = useState(false);

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
    setHeightReady(true);

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
      {!heightReady ? (
        <div className='h-screen flex justify-center items-center'>Loading</div>
      ) : (
        <div className="h-screen w-full relative overflow-hidden">
          <div>
            <div
              className="absolute bg-white h-full w-full transition-transform duration-1000 origin-top bottom-0"
              style={{
                transform: `scaleY(${1 - progress / 100 - 0.09})`,
                transformOrigin: 'bottom',
                zIndex: 1 // Set a lower z-index
              }}
            />

            {screenHeight !== 0 && (
              <div
                className="waves absolute w-full h-[10vh] transition-transform duration-1000 origin-bottom"
                style={{
                  transform: `translateY(${wavePosition}px)`,
                  transformOrigin: 'bottom',
                  zIndex: 1 // Set a lower z-index
                }}
              >
                <WaveComponent />
              </div>
            )}
          </div>

          {/* Display Timer - Component (Server) (Doesn't need Reacet) ==================================================== */}
          <div className="text-blue-100 flex flex-col justify-center items-center h-[80vh] z-10">
            <div className="text-[120px]">
              {displayMinutes.toString().padStart(2, '0')}:
              {displaySeconds.toString().padStart(2, '0')}
            </div>
            <div className="text-[40px] text-blue-500">{roundType}</div>
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
      )}
    </>
  );
};

export default Timer;
