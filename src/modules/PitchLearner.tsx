import { useState } from 'react'
import '../App.css'
import useSound from 'use-sound'
import bell from '../assets/sounds/bell.opus'
import g3 from '../assets/sounds/g3.opus'
import a3 from '../assets/sounds/a3.opus'
import b3 from '../assets/sounds/b3.opus'
import c4 from '../assets/sounds/c4.opus'


function SoundButton({source, children}: any) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, {stop}] = useSound(source, {volume: 0.5})
  const [className, setClassName] = useState('dark-button')

  return (
    <button  
      className={className}
      onMouseLeave={() => {stop(); setIsPlaying(false)}}
      onClick={() => {if (!isPlaying) {play()}; setIsPlaying(true)}} 
    >
      {children} {isPlaying.toString()}
    </button>
  )
}

function QuestionPage({children}: any) {
  const [status, setStatus] = useState('active-question')

  const options = [
    {name: 'g3', source: g3},
    {name: 'a3', source: a3},
    {name: 'b3', source: b3},
    {name: 'c4', source: c4}
  ]

  const generateAnswer = () => {
    return options[Math.floor(Math.random() * options.length)]
  }

  const [correctAnswer, setCorrectAnswer] = useState(generateAnswer())
  const [response, setResponse] = useState('')

  // generate a button for each option
  const generateOptionsButtons = () => {
    return options.map((option) => {
      return (
        <button 
          key={option.name}
          className='round-button' 
          onClick={() => {setResponse(option.name); 
                          setStatus('post-question')}}
        >
        {option.name}
        </button>
        )
    })
  }
  
  return (
    <>
    {children}
    {(status === 'active-question') &&
      <>
      <div>
        <SoundButton source={correctAnswer.source}> 
          {correctAnswer.name} 
        </SoundButton>
      </div>
      <div>
        {generateOptionsButtons()}
      </div>
      </>
    }
    {(status === 'post-question') &&
      <>
      <div>
        <div className='dialog-background'>
        <div className='dialog'>
          <div>{children}</div>
          <div>{(correctAnswer.name === response) ? <>Correct!</>  : <>Wrong.</>}</div>
          <button
            className='dark-button'
            onClick={() => {
              setStatus('active-question');
              setCorrectAnswer(generateAnswer)  
            }}
          >
          Next question
          </button>
        </div>
        </div>
      </div>
      </>
    }
    </>
  )
}


export default function PitchLearner() {
  const [currentPage, setCurrentPage] = useState('start-menu')

  return (
    <>
    {currentPage === 'start-menu' && 
      <>
      <div>
        Press Start when you're ready for your first question!
      </div>
      <button 
        className='dark-button' 
        onClick={() => {setCurrentPage('question-page')}}
      >
        Start!
      </button>
      </>  
    }
    {currentPage === 'question-page' &&
      <>  
      <QuestionPage>
        <button 
          className='dark-button' 
          onClick={() => {setCurrentPage('start-menu')}}
        >
          Return to menu
        </button>
      </QuestionPage>
      </>
    }
    </>
  )
}
