'use client';

import React from 'react';
import RainComponent from './rain-component';
import TimerComponent from './timer-component';
import { useTimerContext } from '../context/timer-provider';
import { motion, AnimatePresence } from 'framer-motion';

const PomoTimer = () => {
  const { isPlaying } = useTimerContext();

  return (
    <>
      <div className="flex flex-row h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 1 : 0 }}
          exit={{ opacity: 0, transition: { duration: 1 } }} // Exit animation
          transition={{ duration: 1 }} // Adjust duration as needed
        >
          {isPlaying && <RainComponent droplets={500} />}
        </motion.div>

        <TimerComponent />
      </div>
    </>
  );
};

export default PomoTimer;
