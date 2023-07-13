import { useState, useEffect } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'
import {decode} from 'html-entities'
import {nanoid} from 'nanoid'

function App() {
    const [quizStart, setQuizStart] = useState(false);
    const [allQuestions, setAllQuestions] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [answersChecked, setAnswersChecked] = useState(false);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                setAllQuestions(getNewQuestions(data.results))
            });
     }, []);

    function getNewQuestions(questions) {
        return questions.map(question => {
            const correctAnswer = {
                id: nanoid(),
                answer: decode(question.correct_answer)
            };
            const incorrectAnswers = question.incorrect_answers.map(answer => ({
                id: nanoid(),
                answer: decode(answer)
            }));

            return ({
                id: nanoid(),
                question: decode(question.question),
                options: shuffleArray([...incorrectAnswers, correctAnswer]),
                correctAnswer: correctAnswer,
                selectedAnswerId: null
            });
        });
    }

    function shuffleArray(arr) {
        let index = arr.length;
        let randomIndex;
        // While there remain elements to shuffle.
        while (index != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * index);
            index--;
            // And swap it with the current element.
            [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
        }
        return arr;
    }

    return (
        <main>
            {quizStart ?
                <Quiz
                    allQuestions={allQuestions}
                    setAllQuestions={setAllQuestions}
                    answersChecked={answersChecked}
                    setAnswersChecked={setAnswersChecked}
                    userScore={userScore}
                    setUserScore={setUserScore}
                />
                : <Start setQuizStart={setQuizStart} />
            }
        </main>
    )
}

export default App