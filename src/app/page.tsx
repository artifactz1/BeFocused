import { Lato, Roboto_Mono } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic']
});

import PomoTimer from './components/pomo-timer';
import { TimerProvider } from './context/timer-provider';

export default function Home() {
  return (
    <main style={lato.style}>
      <TimerProvider>
        <PomoTimer />
      </TimerProvider>
    </main>
  );
}
