import { Lato, Roboto_Mono } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic']
});

import Pomodoro from '@/components/pomodoro/pomodoro';
import Task from '@/components/task/task';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main style={lato.style}>
      <div className="flex flex-col md:flex-row w-screen">
        {/* <Pomodoro /> */}
        <Task />
      </div>
    </main>
  );
}
