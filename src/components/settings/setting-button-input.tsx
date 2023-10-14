import React, { ChangeEvent, useState } from "react";

interface ButtonProps {
  initialRangeValue: number;
  initialMaxRange: number;
  onRangeValueChange: (rangeValue: number) => void; // Add this line
}

const Button: React.FC<ButtonProps> = ({
  initialRangeValue,
  initialMaxRange,
  onRangeValueChange, // Add this line
}) => {
  const [maxRange, setMaxRange] = useState(initialMaxRange);
  const [rangeValue, setRangeValue] = useState<number>(initialRangeValue);

  const handleRangeValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRangeValue = parseInt(event.target.value, 10);
    setRangeValue(newRangeValue);
    onRangeValueChange(newRangeValue);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min={0}
          max={maxRange}
          value={rangeValue}
          onChange={handleRangeValueChange}
          style={{
            flex: 1,
            appearance: "slider-horizontal",
            margin: "0 10px",
          }}
        />
        <p>{rangeValue}</p>
      </div>
    </div>
  );
};

export default Button;
