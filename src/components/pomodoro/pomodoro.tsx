'use client';

import React, { useState } from 'react';
import Rain from './rain';
import Timer from './timer';
import { motion, AnimatePresence } from 'framer-motion';

const Pomodoro = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-blue-400 w-full relative">
      {/* Create a container for Timer and Rain */}
      <Timer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        className="w-full"
      >
        {isPlaying && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isPlaying ? 1 : 0 }}
              exit={{ opacity: 0, transition: { duration: 1 } }} // Exit animation
              transition={{ duration: 1 }} // Adjust duration as needed
            >
              <Rain />
            </motion.div>
          </AnimatePresence>
        )}
      </Timer>
    </div>
  );
};

export default Pomodoro;
