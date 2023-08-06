"use client";

import Image from "next/image";
import TimerComponent from "./components/timer-component";
import ClientComponent from "./components/client-component";

import { useState } from "react";

export default function Home() {
  console.log("SERVER");
  const [start, setStart] = useState(false);

  const handleStartButtonClick = () => {
    setStart(true);
  };

  // Set the duration of the timer (in seconds)
  const totalDuration = 60;

  return (
    <>
      <div className="flex flex-col">
        <TimerComponent />
        {/* <ClientComponent /> */}
      </div>
    </>
  );
}
