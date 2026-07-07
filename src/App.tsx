import { useState } from 'react'
import './App.css'
import PitchLearner from './modules/PitchLearner.tsx'
import Home from './modules/Home.tsx'

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
