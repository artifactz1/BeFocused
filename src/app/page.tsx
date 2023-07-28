import Image from 'next/image'
import TimerComponent from './timer-component'
import ClientComponent from './client-component'

export default function Home() {

  console.log("SERVER")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <ClientComponent /> */}
      <TimerComponent/>
    </main>
  )
}

