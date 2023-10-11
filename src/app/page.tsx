'use client';

import TimerComponent from './components/timer-component';

import { Lato, Roboto_Mono } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic']
});

import PomoTimer from './components/pomo-timer';

export default function Home() {
  return (
    <main style={lato.style}>
      <PomoTimer />
    </main>
  );
}
