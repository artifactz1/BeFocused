
import TimerComponent from "../components/timer-component";
import ClientComponent from "../components/client-component";

import { Lato, Roboto_Mono } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

import RainComponent from "../components/rain-component";

export default function Home() {
  console.log("SERVER");

  // Set the duration of the timer (in seconds)
  const totalDuration = 60;

  const time = 0;

  return (
    <main style={lato.style}>
      <div className="flex flex-row h-screen">
        <RainComponent />
        <TimerComponent />
      </div>
    </main>
  );
}
