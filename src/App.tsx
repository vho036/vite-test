import { useState } from 'react'
import './App.css'
import PitchLearner from './modules/PitchLearner.tsx'
import Home from './modules/Home.tsx'

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
    <button className='menu-button' onClick={SwitchValue} >
      {value}
    </button>
  )
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
      <section>
        {(currentPage === 'home') && <Home />}
        {(currentPage === 'pitch-learner') && <PitchLearner />}
      </section>
    </>
  )
}

export default App
