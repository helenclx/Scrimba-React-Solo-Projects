import React, { useState, useEffect } from "react"
import './Quiz.css'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'

export default function Quiz(props) {
    const [allQuestions, setAllQuiestions] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
             .then(res => res.json())
             .then(data => {
                setAllQuiestions(getNewQuestions(data.results))
             })
     }, [props.quizStart]);

    function getNewQuestions(questions) {
        return questions.map(question => {
            return ({
                id: nanoid(),
                question: question.question,
                options: shuffleArray([...question.incorrect_answers, question.correct_answer]),
                correctAnswer: question.correct_answer
            })
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

    const questionEl = allQuestions.map((question, i) => {
        const optionEl = question.options.map((option, j) => {
            return (
                <span key={j}>
                    <input type="radio" value={option} id={`ans-${i}-${j}`} name={`question-${i}`} className="quiz-option" />
                    <label htmlFor={`ans-${i}-${j}`}>{decode(option)}</label>
                </span>
            )
        });

        return (
            <div className="question-wrapper" key={i}>
                <h2>{decode(question.question)}</h2>
                <fieldset className="answer-field">
                    <legend className="sr-only">Select one answer:</legend>
                    {optionEl}
                </fieldset>
            </div>
        );
    });

    function checkAnswers() {
        console.log("Button clicked");
    }

    return (
        <article className="quiz-container">
            {questionEl}
            <section className="result-section">
                {/* <h3>You scored {userScore}/{shuffledQuestions.length} correct answers</h3> */}
                <button className="check-ans-btn" onClick={checkAnswers} type="button">Check answers</button>
            </section>
        </article>
    )
}