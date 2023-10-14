// import React, { useState } from "react";

// import ButtonInput from "./setting-button-input";

// const SettingsComponent: React.FC = () => {
//   let maxRangeMinutes = 90;
//   let maxRounds = 12;

//   const [savedRange, setSavedRange] = useState<number | null>(null); // Variable to save the range value

//   const handleRangeValueChange = (newRangeValue: number) => {
//     // Save the range value to another component or variable
//     setSavedRange(newRangeValue);
//   };
//   return (
//     <div className=" bg-gray-400 w-1/2 h-fit border-1 rounded-xl">
//       <div className="p-5 flex flex-col space-y-2">
//         <div className="border border-1 rounded-md w-fit p-2">Settings</div>

//         {/* Time Inputs */}
//         {/* <ol className="border border-1 rounded-md mt-2"> */}
//         <div className="flex border border-1 rounded-md p-4">
//           <div className="flex-initial w-1/3">Focus</div>
//           <div className="flex-1">
//             <ButtonInput
//               initialMaxRange={maxRangeMinutes}
//               initialRangeValue={25}
//               onRangeValueChange={handleRangeValueChange}
//             ></ButtonInput>
//           </div>
//         </div>

//         <div className="flex border border-1 rounded-md p-4">
//           <div className="flex-initial w-1/3">Short Break</div>
//           <div className="flex-1">
//             <ButtonInput
//               initialMaxRange={maxRangeMinutes}
//               initialRangeValue={5}
//               onRangeValueChange={handleRangeValueChange}
//             ></ButtonInput>
//           </div>
//         </div>
//         <div className="flex border border-1 rounded-md p-4">
//           <div className="flex-initial w-1/3">Long Break</div>
//           <div className="flex-1">
//             <ButtonInput
//               initialMaxRange={maxRangeMinutes}
//               initialRangeValue={5}
//               onRangeValueChange={handleRangeValueChange}
//             ></ButtonInput>
//           </div>
//         </div>

//         <div className="flex   border border-1 rounded-md p-4">
//           <div className="flex-initial w-1/3">Rounds</div>
//           <div className="flex-1">
//             <ButtonInput
//               initialMaxRange={maxRounds}
//               initialRangeValue={4}
//               onRangeValueChange={handleRangeValueChange}
//             ></ButtonInput>
//           </div>
//         </div>
//         <div className="flex flex-row-reverse">
//           <div className="flex flex-row-reverse border border-1 rounded-md w-fit p-2 ">
//             Save
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsComponent;

import React, { useState } from "react";
import ButtonInput from "./setting-button-input";

interface SettingsProps {
  onSave: (values: any) => void;
  resetTimer: () => void;
}

const SettingsComponent: React.FC<SettingsProps> = ({ onSave, resetTimer }) => {
  const maxRangeMinutes = 90;
  const maxRounds = 12;

  const [values, setValues] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    rounds: 4,
  });

  const handleRangeValueChange = (newRangeValue: number, type: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [type]: newRangeValue,
    }));
  };

  const handleSave = () => {
    onSave(values); // Pass the values back to the parent
    resetTimer();
    // Additional actions if needed
  };

  return (
    <div className="bg-gray-400 w-1/2 h-fit border-1 rounded-xl">
      <div className="p-5 flex flex-col space-y-2">
        <div className="border border-1 rounded-md w-fit p-2">Settings</div>

        <div className="flex border border-1 rounded-md p-4">
          <div className="flex-initial w-1/3">Focus</div>
          <div className="flex-1">
            {/* Use maxRangeMinutes as the prop name */}
            <ButtonInput
              initialMaxRange={maxRangeMinutes}
              initialRangeValue={values.focus}
              onRangeValueChange={(value) =>
                handleRangeValueChange(value, "focus")
              }
            />
          </div>
        </div>

        <div className="flex border border-1 rounded-md p-4">
          <div className="flex-initial w-1/3">Short Break</div>
          <div className="flex-1">
            <ButtonInput
              initialMaxRange={maxRangeMinutes}
              initialRangeValue={values.shortBreak}
              onRangeValueChange={(value) =>
                handleRangeValueChange(value, "shortBreak")
              }
            />
          </div>
        </div>

        <div className="flex border border-1 rounded-md p-4">
          <div className="flex-initial w-1/3">Long Break</div>
          <div className="flex-1">
            <ButtonInput
              initialMaxRange={maxRangeMinutes}
              initialRangeValue={values.longBreak}
              onRangeValueChange={(value) =>
                handleRangeValueChange(value, "longBreak")
              }
            />
          </div>
        </div>

        <div className="flex   border border-1 rounded-md p-4">
          <div className="flex-initial w-1/3">Rounds</div>
          <div className="flex-1">
            <ButtonInput
              initialMaxRange={maxRounds}
              initialRangeValue={values.rounds}
              onRangeValueChange={(value) =>
                handleRangeValueChange(value, "rounds")
              }
            />
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <div
            onClick={handleSave}
            className="flex flex-row-reverse border border-1 rounded-md w-fit p-2 cursor-pointer"
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
