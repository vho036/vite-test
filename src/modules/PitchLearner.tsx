import { useReducer, useState, useEffect } from 'react'
import '../App.css'
import useSound from 'use-sound'
import bell from '../assets/sounds/bell.opus'
import g3 from '../assets/sounds/g3.opus'
import a3 from '../assets/sounds/a3.opus'
import b3 from '../assets/sounds/b3.opus'
import c4 from '../assets/sounds/c4.opus'


function SoundButton({source, children}: any) {

  const [isPlaying, setIsPlaying] = useState(false)
  const [play, {stop}] = useSound(source, {
    volume: 0.5, 
    onend: () => setIsPlaying(false),
  })

  return (
    <>
    {<>
      {play()} 
      {setIsPlaying(true)}
    </>}
    <button  
      className='dark-button'
      onMouseLeave={() => {stop(); setIsPlaying(false)}}
      onClick={() => {if (!isPlaying) {play()}; setIsPlaying(true)}} 
    >
      {children} {isPlaying.toString()}
    </button>
    </>
  )
}


function QuestionPage({children}: any) {
  const [activeQuestion, setActiveQuestion] = useState(true)

  // hardcoded for now, TODO: change
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
                          setActiveQuestion(false)}}
          disabled={!activeQuestion}
        >
        {option.name}
        </button>
        )
    })
  }

  

  // sound stuff
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, {stop}] = useSound(
    correctAnswer.source,
    { volume: 0.5, onend: () => setIsPlaying(false) }
  )

  useEffect(() => {
    if (play) {
      play()
      setIsPlaying(true)
    }
  }, [correctAnswer, play])

  const handleNewQuestion = () => {
    if (typeof stop === 'function') stop()
    let newAnswer = generateAnswer()
    setCorrectAnswer(newAnswer)
    setActiveQuestion(true)
  }
  
  return (
    <>
    {children}
    <div className='parent flex-parent'>
      {/* Three columns: sound button, answer buttons, feedback. */}
      <div className='child flex-child'>
        <button
          className='dark-button'
          onMouseLeave={() => {stop(); setIsPlaying(false)}}
          onClick={() => {
            if (!isPlaying) { play(); setIsPlaying(true) }
            else { stop(); setIsPlaying(false) }
          }}
        >
          {correctAnswer.name} {isPlaying.toString()}
        </button>
      </div>
      <div className='flex-child'>
        {generateOptionsButtons()}
      </div>
      <div className='flex-child'>
        {(!activeQuestion) &&
          <>
          <div>{(correctAnswer.name === response) ? <>Correct!</>  : <>Wrong.</>}</div>
          <button
            className='dark-button'
            onClick={handleNewQuestion}
          >
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
