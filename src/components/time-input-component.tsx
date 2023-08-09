// import React from "react";
// import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

// interface TimeInputProps {
//   inputMinutes: string;
//   inputSeconds: string;
//   handleTimeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   resetTimer: () => void;
//   isPlaying: boolean;
//   pauseTimer: () => void;
//   startTimer: () => void;
// }

// const TimeInputComponent: React.FC<TimeInputProps> = ({
//   inputMinutes,
//   inputSeconds,
//   handleTimeInput,
//   resetTimer,
//   isPlaying,
//   pauseTimer,
//   startTimer,
// }) => {
//   return (
//     <div className="flex flex-row absolute bottom-4 left-4">
//       {/* Input elements here */}
//       {/* Reset button */}
//       <button
//         onClick={resetTimer}
//         className="bg-blue-500 text-white px-2 py-1 ml-2"
//       >
//         Reset
//       </button>

//       {/* Play/Pause Button */}
//       {isPlaying ? (
//         <AiFillPauseCircle
//           onClick={pauseTimer}
//           className="text-5xl cursor-pointer px-2 py-1"
//         />
//       ) : (
//         <AiFillPlayCircle
//           onClick={startTimer}
//           className="text-5xl cursor-pointer px-2 py-2"
//         />
//       )}
//     </div>
//   );
// };

// export default TimeInputComponent;


import React from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

interface TimeInputProps {
  inputMinutes: string;
  inputSeconds: string;
  handleTimeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetTimer: () => void;
  isPlaying: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
}

const TimeInputComponent: React.FC<TimeInputProps> = ({
  inputMinutes,
  inputSeconds,
  handleTimeInput,
  resetTimer,
  isPlaying,
  startTimer,
  pauseTimer,
}) => {
  // Client-side logic for TimeInputComponent
  // Uses React

  return (
    <div className="flex flex-row absolute bottom-4 left-4">
      <input
        type="number"
        min="1"
        name="minutes"
        value={inputMinutes}
        onChange={handleTimeInput}
        className="border p-1 mr-1"
      />
      <span className="text-lg">:</span>
      <input
        type="number"
        min="0"
        max="61"
        name="seconds"
        value={inputSeconds}
        onChange={handleTimeInput}
        className="border p-1 ml-1"
      />
      <button onClick={resetTimer} className="bg-blue-500 text-white px-2 py-1 ml-2">
        Reset
      </button>
      {/* Play/Pause Button */}
      {isPlaying ? (
        <AiFillPauseCircle onClick={pauseTimer} className="text-5xl  cursor-pointer px-2 py-1" />
      ) : (
        <AiFillPlayCircle onClick={startTimer} className="text-5xl cursor-pointer px-2 py- 2" />
      )}
    </div>
  );
};

export default TimeInputComponent;
