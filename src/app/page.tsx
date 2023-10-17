import { Lato, Roboto_Mono } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

import Pomodoro from "../components/pomodoro/pomodoro";
// import Task from '@/components/task/task';

export default function Home() {
  // Set the duration of the timer (in seconds)
  const totalDuration = 60;

  const time = 0;

  return (
    <main style={lato.style}>
      <Pomodoro />
      {/* <Task /> */}
    </main>
  );
}
