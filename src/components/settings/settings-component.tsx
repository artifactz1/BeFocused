import React, { useEffect, useState } from "react";
import ButtonInput from "./setting-button-input";

interface SettingsProps {
  onSave: (values: any) => void;
}

const SettingsComponent: React.FC<SettingsProps> = ({ onSave }) => {
  const maxRangeMinutes = 90;
  const maxRounds = 12;

  const [values, setValues] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    rounds: 4,
    change: false,
  });

  const handleRangeValueChange = (newRangeValue: number, type: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [type]: newRangeValue,
    }));
  };

  const handleSave = () => {
    onSave(values); // Pass the values back to the parent
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
          <button
            onClick={handleSave}
            className="flex flex-row-reverse border border-1 rounded-md w-fit p-2 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
