import React, { useEffect, useState } from 'react';

interface CalculationProps {
  initialMinutes: number;
  initialSeconds: number;
  onTimerComplete: () => void;
}

const CalculationComponent: React.FC<CalculationProps> = ({
  initialMinutes,
  initialSeconds,
  onTimerComplete,
}) => {
  const calculateTime = (minutes: number, seconds: number): number => {
    const totalDuration = minutes * 60 + seconds;
    return totalDuration;
  };

  const totalDuration = calculateTime(initialMinutes, initialSeconds);

  const [progress, setProgress] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [getCurrentTime, setCurrentTime] = useState<number>(totalDuration);
  const [remainingTime, setRemainingTime] = useState<number>(getCurrentTime);

  useEffect(() => {
    let currentTime = getCurrentTime;

    const timerInterval = setInterval(() => {
      if (isPlaying) {
        currentTime -= 1;
        const newProgress = (currentTime / getCurrentTime) * 100;
        setProgress(newProgress);
        setRemainingTime(currentTime);
        setCurrentTime(currentTime);
        if (currentTime <= 0) {
          console.log('Timer has completed!');
          setIsPlaying(false);
          clearInterval(timerInterval);
          onTimerComplete();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [totalDuration, isPlaying, getCurrentTime, onTimerComplete]);

  // Return any relevant data or components if needed
  // This component doesn't need JSX since it doesn't render any UI elements
  return null;
};

export default CalculationComponent;
