import React from "react"
import './Quiz.css'
import quizData from '../quizdata'
// Refer to https://scrimba.com/learn/learnreact/project-add-text-to-image-co9dd4288bcdb0c0cfe7a2d9c
import {decode} from 'html-entities'

export default function Quiz() {
    const [allQuizData, setAllQuizData] = React.useState(quizData);

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
    let quizArr = allQuizData.results;
    const shuffledQuestions = shuffleArray(quizArr);

    const questionEl = shuffledQuestions.map((question, i) => {
        let optionArr = [...question.incorrect_answers, question.correct_answer];
        const shuffledOptions = shuffleArray(optionArr);

        const optionEl = shuffledOptions.map((option, j) => {
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

    return (
        <article className="quiz-container">
            {questionEl}
            <section className="result-section">
                {/* <h3 className="quiz-results">You scored 3/5 correct answers</h3> */}
                <button className="check-ans-btn">Check answers</button>
            </section>
        </article>
    )
}