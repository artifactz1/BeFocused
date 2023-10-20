import React, { useEffect, useState } from 'react';
import ButtonInput from './button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

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
    change: false
  });

  const handleRangeValueChange = (newRangeValue: number, type: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [type]: newRangeValue
    }));
  };

  const handleSave = () => {
    onSave(values); // Pass the values back to the parent
    // Additional actions if needed
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px]">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Card className="w-full">
            <CardHeader>Focus</CardHeader>
            <CardContent>
              <Slider
                defaultValue={[values.focus]}
                max={maxRangeMinutes}
                onChange={e => handleRangeValueChange(e.target.value, 'focus')}
                step={1}
              />
            </CardContent>
          </Card>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Card className="w-full">
            <CardHeader>Short Break</CardHeader>
            <CardContent>
              <Slider
                defaultValue={[values.shortBreak]}
                max={maxRangeMinutes}
                onChange={e => handleRangeValueChange(e, 'focus')}
                step={1}
              />
            </CardContent>
          </Card>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Card className="w-full">
            <CardHeader>Long Break</CardHeader>
            <CardContent>
              <Slider
                defaultValue={[values.longBreak]}
                max={maxRangeMinutes}
                step={1}
              />
            </CardContent>
          </Card>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Card className="w-full">
            <CardHeader>Rounds</CardHeader>
            <CardContent>
              <Slider defaultValue={[values.rounds]} max={maxRounds} step={1} />
            </CardContent>
          </Card>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div className="bg-gray-400 w-full h-fit border-1 rounded-xl">
    //   <div className="p-5 flex flex-col space-y-2">
    //     <div className="border border-1 rounded-md w-fit p-2">Settings</div>

    //     <div className="flex border border-1 rounded-md p-4">
    //       <div className="flex-initial w-1/3">Focus</div>
    //       <div className="flex-1">
    //         {/* Use maxRangeMinutes as the prop name */}
    //         <ButtonInput
    //           initialMaxRange={maxRangeMinutes}
    //           initialRangeValue={values.focus}
    //           onRangeValueChange={(value) =>
    //             handleRangeValueChange(value, "focus")
    //           }
    //         />
    //       </div>
    //     </div>

    //     <div className="flex border border-1 rounded-md p-4">
    //       <div className="flex-initial w-1/3">Short Break</div>
    //       <div className="flex-1">
    //         <ButtonInput
    //           initialMaxRange={maxRangeMinutes}
    //           initialRangeValue={values.shortBreak}
    //           onRangeValueChange={(value) =>
    //             handleRangeValueChange(value, "shortBreak")
    //           }
    //         />
    //       </div>
    //     </div>

    //     <div className="flex border border-1 rounded-md p-4">
    //       <div className="flex-initial w-1/3">Long Break</div>
    //       <div className="flex-1">
    //         <ButtonInput
    //           initialMaxRange={maxRangeMinutes}
    //           initialRangeValue={values.longBreak}
    //           onRangeValueChange={(value) =>
    //             handleRangeValueChange(value, "longBreak")
    //           }
    //         />
    //       </div>
    //     </div>

    //     <div className="flex   border border-1 rounded-md p-4">
    //       <div className="flex-initial w-1/3">Rounds</div>
    //       <div className="flex-1">
    //         <ButtonInput
    //           initialMaxRange={maxRounds}
    //           initialRangeValue={values.rounds}
    //           onRangeValueChange={(value) =>
    //             handleRangeValueChange(value, "rounds")
    //           }
    //         />
    //       </div>
    //     </div>

    //     <div className="flex flex-row-reverse">
    //       <button
    //         onClick={handleSave}
    //         className="flex flex-row-reverse border border-1 rounded-md w-fit p-2 cursor-pointer"
    //       >
    //         Save
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SettingsComponent;
