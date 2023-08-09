import WaveComponent from "./wave-component";

interface TimerVisualProps {
    progress: number;
    wavePosition: number;
  }
  
  const TimerVisualComponent: React.FC<TimerVisualProps> = ({ progress, wavePosition }) => {
    // Server-side logic for TimerVisualComponent
    // No React involved
  
    return (
        <>

      <div
        className="bg-white h-full w-full transition-transform duration-1000 origin-top bottom-0 absolute"
        style={{
          transform: `scaleY(${1 - progress / 100 - 0.09})`,
          transformOrigin: "bottom",
        }}
      />


      <div
        className="waves absolute w-full h-[10vh] transition-transform duration-1000 origin-bottom"
        style={{
          transform: `translateY(${wavePosition}px)`,
          transformOrigin: "bottom",
        }}
      >
        <WaveComponent />
      </div>

        </>
        

    );
  };
  
  export default TimerVisualComponent;
  