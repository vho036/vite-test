import { useState } from 'react'
import '../App.css'


export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className='header'>
        <h2>Welcome to the pitch learner tool.</h2>
      </div>
      <button
        className="dark-button"
        onClick={() => setCount((count) => count + 3)}
      >
        Increase counter
      </button>
      <button
        className="dark-button"
        onClick={() => setCount((count) => count - 1)}
      >
        Decrease counter
      </button>
      <h3>
        Counter: {count}
      </h3> 
    </div>
  )
}