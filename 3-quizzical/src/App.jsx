import { useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
    const [quizStart, setQuizStart] = useState(false);

    return (
        <main>
            {quizStart ? <Quiz /> : <Start setQuizStart={setQuizStart} />}
        </main>
    )
}

export default App
