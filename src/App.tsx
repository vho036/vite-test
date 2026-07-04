import { useState } from 'react'
import useSound from 'use-sound';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import bell from './assets/sounds/bell.mp3';
import './App.css'

function MenuButton(props: any) {
  const [value, setValue] = useState(props.children);
  const [option, setOption] = useState(true);

  function SwitchValue (): void {
    if (option) {
      setValue('neh')
    } 
    else if (!option) {
      setValue('yeh')
    }
    setOption(!option)
  }

  return (
    <button type='button' className='menu-button' onClick={SwitchValue} >
      {value}
    </button>
  )
}

function SoundButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, {stop}] = useSound(bell, {volume: 0.5})

  return (
    <button 
      type='button' 
      className='counter'
      onMouseLeave={() => {stop(); setIsPlaying(false)}}
      onClick={() => {play(); setIsPlaying(true)}} 
    >
      {isPlaying.toString()}
    </button>
  )
}

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div></div>
      <SoundButton></SoundButton>
      <button
        type="button"
        className="dark-button"
        onClick={() => setCount((count) => count + 3)}
      >
        Increase counter
      </button>
      <button
        type="button"
        className="dark-button"
        onClick={() => setCount((count) => count - 1)}
      >
        Decrease counter
      </button>
      <div>
        {count}
      </div> 
    </>
  )
}

function PitchLearner() {
  return (
    <></>
  )
}

function MainView({currentPage}: any) {

  if (currentPage == 'home') {
    return (
      Home()
    )
  }
  else if (currentPage == 'pitch-learner') {
    return (
      PitchLearner()
    )
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <section id='left'>
        <div className='menu-bar'>
            <button className='menu-button' onClick={() => {setCurrentPage('home')}}>
              Home
            </button>
            <button className='menu-button' onClick={() => {setCurrentPage('pitch-learner')}}>
              Pitch learner
            </button>
            <MenuButton>
              Custombutton
            </MenuButton>
        </div>
      </section>
      <section id="center">
        <MainView currentPage={currentPage}></MainView>
      </section>
    </>
  )
}

export default App
