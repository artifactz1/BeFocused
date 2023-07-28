import React from 'react'
import { isSharedArrayBuffer } from 'util/types'
import { AiFillPauseCircle } from 'react-icons/ai'


export default function TimerComponent() {
  return (
    <>
    <div>TimerComponent</div>
    <div className='w-1/2 h-screen bg-gray-400 rounded-lg'>
		<div className='flex flex-col justify-center items-center text-5xl'>
			<div>
				25:00
			</div>
			<AiFillPauseCircle/>
		</div>

	</div>
    </>
  )
}




