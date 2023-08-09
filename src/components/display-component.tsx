// interface DisplayTimerProps {
//   displayMinutes: number;
//   displaySeconds: number;
// }

// const DisplayTimerComponent: React.FC<DisplayTimerProps> = ({
//   displayMinutes,
//   displaySeconds,
// }) => {
//   return (
//     <div className="text-black text-[120px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//       {String(displayMinutes).padStart(2, "0")}:
//       {String(displaySeconds).padStart(2, "0")}
//     </div>
//   );
// };

// export default DisplayTimerComponent;

interface DisplayTimerProps {
  displayMinutes: number;
  displaySeconds: number;
}

const DisplayTimerComponent: React.FC<DisplayTimerProps> = ({ displayMinutes, displaySeconds }) => {
  // Server-side logic for DisplayTimerComponent
  // No React involved

  return (
    <div className="text-black text-[120px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {displayMinutes.toString().padStart(2, "0")}:
      {displaySeconds.toString().padEnd(2, "0")}
    </div>
  );
};

export default DisplayTimerComponent;