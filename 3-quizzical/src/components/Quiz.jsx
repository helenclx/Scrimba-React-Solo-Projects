import React, { useState, useEffect } from "react"
import './Quiz.css'
import {decode} from 'html-entities'

export default function Quiz() {
    const [allQuestions, setAllQuiestions] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                setAllQuiestions(getNewQuestions(data.results))
            });
     }, []);

    function getNewQuestions(questions) {
        return questions.map(question => {
            return ({
                question: question.question,
                options: shuffleArray([...question.incorrect_answers, question.correct_answer]),
                correctAnswer: question.correct_answer
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

    const questionEl = allQuestions.map((question, i) => {
        const optionEl = question.options.map((option, j) => {
            return (
                <span key={j} id={`option-${i}-${j}`}>
                    <input type="radio" value={option} id={`ans-${i}-${j}`} name={`question-${i}`} className="quiz-option" />
                    <label htmlFor={`ans-${i}-${j}`}>{decode(option)}</label>
                </span>
            )
        });

        return (
            <div className="question-wrapper" key={i} id={`question-${i}`}>
                <h2>{decode(question.question)}</h2>
                <fieldset className="answer-field">
                    <legend className="sr-only">Select one answer:</legend>
                    {optionEl}
                </fieldset>
                <hr />
            </div>
        );
    });

    function checkAnswers() {
        setShowScore(true);
        console.log("Answers checked");
        allQuestions.forEach((question, i) => {
            const checkOptionsEl = document.querySelectorAll(`input[name=question-${i}]`);
            checkOptionsEl.forEach(optionEl => {
                if (optionEl.checked) {
                    console.log(`Selected answer: ${optionEl.value}`);
                    if (optionEl.value == question.correctAnswer) {
                        console.log(`-> Correct answer.`);
                        setUserScore(prevScore => prevScore += 1);
                    } else {
                        console.log(`-> Wrong answer. The answer is ${decode(question.correctAnswer)}.`);
                    }
                }
            });
        });
    }

    return (
        <article className="quiz-container">
            {questionEl}
            <section className="result-section">
                {showScore && <h3>You scored {userScore}/{allQuestions.length} correct answers</h3>}
                <button className="check-ans-btn" onClick={checkAnswers}>Check answers</button>
            </section>
        </article>
    )
}