"use client";

import Image from "next/image";
import TimerComponent from "./components/timer-component";
import ClientComponent from "./components/client-component";

import { Lato, Roboto_Mono } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

import { useState } from "react";
import RainComponent from "./components/rain-component";

export default function Home() {
  console.log("SERVER");
  const [start, setStart] = useState(false);

  const handleStartButtonClick = () => {
    setStart(true);
  };

  // Set the duration of the timer (in seconds)
  const totalDuration = 60;

  return (
    <main style={lato.style}>
      <div className="flex flex-row h-screen">
        <RainComponent />
        <TimerComponent />

        {/* <ClientComponent /> */}
      </div>
    </main>
  );
}
