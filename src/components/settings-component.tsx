import React from "react";

const SettingsComponent = () => {
  return (
    <div className=" bg-gray-400 w-1/2 h-1/2">
      <div className="p-5 border border-1 flex flex-col">
        <div className="border border-1 rounded-md w-fit p-1">Settings</div>

        {/* Time Inputs */}
        {/* <ol className="border border-1 rounded-md mt-2"> */}
        <div className="border border-1 rounded-md p-2">Focus</div>
        <div className="border border-1 rounded-md p-2">Short Break</div>
        <div className="border border-1 rounded-md p-2">Long Break</div>
        <div className="border border-1 rounded-md p-2">Round</div>

        <div className="border border-1 rounded-md w-fit p-1">Save</div>
      </div>
    </div>
  );
};

export default SettingsComponent;
