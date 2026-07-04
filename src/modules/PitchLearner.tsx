import { useState } from 'react'
import '../App.css'
import useSound from 'use-sound'
import bell from '../assets/sounds/bell.mp3'


function SoundButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, {stop}] = useSound(bell, {volume: 0.5})
  const [className, setClassName] = useState('dark-button')

  return (
    <button  
      className={className}
      onMouseLeave={() => {stop(); setIsPlaying(false)}}
      onClick={() => {play(); setIsPlaying(true)}} 
    >
      {isPlaying.toString()}
    </button>
  )
}

export default function PitchLearner() {
  return (
    <div>
        <SoundButton />
    </div>
  )
}
