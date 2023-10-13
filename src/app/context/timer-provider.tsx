'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TimerContextType {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <TimerContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};
