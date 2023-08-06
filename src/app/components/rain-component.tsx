import React from "react";
import "../styles/rain.css"; // Import the CSS file

const droplets = 250;

const Rain = () => {
  const generateRandomValue = () => Math.random() * 100;
  const generateRandomFloat = () => Math.random();
  const generateRandomSignedFloat = () => Math.random() * 2 - 1;

  return (
    <div className="rain">
      {Array.from({ length: droplets }).map((_, index) => (
        <svg
          key={index}
          className="rain__drop"
          style={
            {
              "--x": `${generateRandomValue()}%`,
              "--y": `${generateRandomValue() * 10}`, // Adjust the range for --y
              "--o": generateRandomFloat(),
              "--a": generateRandomFloat() + 0.5,
              "--d": generateRandomSignedFloat(),
              "--s": generateRandomFloat(),
            } as React.CSSProperties
          } // Use type assertion to allow custom CSS properties
          preserveAspectRatio="xMinYMin"
          viewBox="0 0 5 50"
        >
          <path
            stroke="none"
            d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
          />
        </svg>
      ))}
    </div>
  );
};

export default Rain;
