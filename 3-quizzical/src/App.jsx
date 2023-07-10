import { useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
    const [quizStart, setQuizStart] = useState(false);

    function startQuiz() {
        setQuizStart(true);
    }

    return (
        <main>
            {quizStart ? <Quiz /> : <Start onClick={startQuiz} />}
        </main>
    )
}

export default App
