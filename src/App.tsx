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

function DropdownButton({children, ...props}: any) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <button 
      onClick={props.onClick}
      className='menu-button'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      Home
      {(isOpen) && 
        <ul>
          {children.map((child: any) => {
            return (
              <li key={child}>
                {child}
              </li>
            )})}
        </ul>
      }
    </button>
    </>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <nav id='left'>
        <button className='menu-button' onClick={() => {setCurrentPage('home')}}>
          Home
        </button>
        <div className='dropdown'>
          <button className='menu-button'>
            Tools
          </button>
          <div className='dropdown-content'>
            <button className='menu-button dropdown' onClick={() => {setCurrentPage('pitch-learner')}}>
              Pitch learner
            </button>
          </div>
        </div>
      </nav>
      <section>
        {(currentPage === 'home') && <Home />}
        {(currentPage === 'pitch-learner') && <PitchLearner />}
      </section>
    </>
  )
}

export default App
