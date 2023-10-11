'use client';

import React from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';

interface TimingControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isPlaying: boolean;
}

const TimingControls: React.FC<TimingControlsProps> = ({
  onStart,
  onPause,
  onReset,
  isPlaying
}) => {
  return (
    <div className="flex flex-row absolute bottom-4 left-4">
      <button
        onClick={onReset}
        className="bg-blue-500 text-white px-2 py-1 ml-2"
      >
        Reset
      </button>

      {isPlaying ? (
        <AiFillPauseCircle
          onClick={onPause}
          className="text-5xl cursor-pointer px-2 py-1"
        />
      ) : (
        <AiFillPlayCircle
          onClick={onStart}
          className="text-5xl cursor-pointer px-2 py-2"
        />
      )}
    </div>
  );
};

export default TimingControls;
