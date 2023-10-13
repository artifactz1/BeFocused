'use client';

import React, { useState } from 'react';
import Rain from './rain';
import Timer from './timer';

const Pomodoro = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {isPlaying && <Rain />}
      <Timer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </>
  );
};

export default Pomodoro;
