import { Lato, Roboto_Mono } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic']
});

import Pomodoro from '@/components/pomodoro/pomodoro';
import Task from '@/components/task/task';

export default function Home() {
  return (
    <main style={lato.style}>
      <div className="flex flex-row">
        <Task />
        <Pomodoro />
      </div>
    </main>
  );
}
