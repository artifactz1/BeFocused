import { Lato, Roboto_Mono } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic']
});

import Pomodoro from '../components/pomodoro/pomodoro';

export default function Home() {
  // Set the duration of the timer (in seconds)
  const totalDuration = 60;

  const time = 0;

  return (
    <main style={lato.style}>
      <div className="flex flex-row h-screen bg-blue-400">
        <Pomodoro />
      </div>
    </main>
  );
}
