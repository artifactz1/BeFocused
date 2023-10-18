import React, { ChangeEvent, useState } from "react";

interface ButtonProps {
  initialRangeValue: number;
  initialMaxRange: number;
  onRangeValueChange: (rangeValue: number) => void;
}

const Button: React.FC<ButtonProps> = ({
  initialRangeValue,
  initialMaxRange,
  onRangeValueChange,
}) => {
  const [maxRange, setMaxRange] = useState(initialMaxRange);
  const [rangeValue, setRangeValue] = useState<number>(initialRangeValue);

  const handleRangeValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRangeValue = parseInt(event.target.value, 10);
    setRangeValue(newRangeValue);
    onRangeValueChange(newRangeValue);
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min={1}
          max={maxRange}
          value={rangeValue}
          onChange={handleRangeValueChange}
          style={{
            width: "100%", // Use width instead of flex for better responsiveness
            margin: "0 10px",
          }}
        />
        <p style={{ minWidth: "30px" }}>{rangeValue}</p>
      </div>
    </div>
  );
};

export default Button;
