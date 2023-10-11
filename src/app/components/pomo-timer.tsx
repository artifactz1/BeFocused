import React from 'react';
import RainComponent from './rain-component';
import TimerComponent from './timer-component';

const PomoTimer = () => {
  return (
    <>
      <div className="flex flex-row h-screen">
        <RainComponent />
        <TimerComponent />
      </div>
    </>
  );
};

export default PomoTimer;
