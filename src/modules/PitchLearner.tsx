import { useState, useEffect } from 'react'
import '../App.css'
import useSound from 'use-sound'
import g3 from '../assets/sounds/g3.opus'
import a3 from '../assets/sounds/a3.opus'
import b3 from '../assets/sounds/b3.opus'
import c4 from '../assets/sounds/c4.opus'


function QuestionPage({children}: any) {
  const [isActiveQuestion, setIsActiveQuestion] = useState(true)

  // hardcoded for now, TODO: change
  const options = [
    {name: 'g3', url: g3},
    {name: 'a3', url: a3},
    {name: 'b3', url: b3},
    {name: 'c4', url: c4}
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
                          setIsActiveQuestion(false)}}
          disabled={!isActiveQuestion}
        >
        {option.name}
        </button>
        )
    })
  }

  // sound stuff
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSound, setActiveSound] = useState(correctAnswer)
  const [play, {stop}] = useSound(
    activeSound.url,
    { volume: 0.5, onend: () => setIsPlaying(false) }
  )
  const togglePlayback = () => {
    if (isPlaying) { stop(); setIsPlaying(false) } 
    else { play(); setIsPlaying(true) }
  }

  useEffect(() => {
    // Stop any previously-playing sound instance, then play the new one once.
    // This triggers on initial definition and any update of play.
    stop(); play(); setIsPlaying(true);
    // Stops playback on component de-render.
    return () => { stop() }
  }, [play])

  const handleNewQuestion = () => {
    let newAnswer = generateAnswer()
    // If the RNG picks the same answer, force a replay of the same sound.
    // Automatic playback is otherwise accomplished by useEffect because play changes.
    if (newAnswer.name === correctAnswer.name) { play() }
    setCorrectAnswer(newAnswer)
    setActiveSound(newAnswer)
    setIsActiveQuestion(true)
    console.log(newAnswer)
  }

  return (
    <>
    {children}
    <div className='parent flex-parent'>
      {/* Three columns: sound button, answer buttons, feedback. */}
      <div className='flex-child'>
        <button
          className={isPlaying ? 'active-sound' : ''}
          onClick={() => {
            setActiveSound(correctAnswer)
            togglePlayback()
          }}
        >
        {isPlaying ? '■' : '▶'}
        </button>
      </div>
      <div className='flex-child'>
        {generateOptionsButtons()}
      </div>
      <div className='flex-child'>
        {(!isActiveQuestion) &&
          <>
          <div>{(correctAnswer.name === response) ? <>Correct!</>  : <>Wrong.</>}</div>
          <button onClick={handleNewQuestion}>
            Next question
          </button>
          </>
        }
      </div>
    </div>
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
