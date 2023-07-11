import React from "react"
import './Quiz.css'
import quizData from '../quizdata'
// Refer to https://scrimba.com/learn/learnreact/project-add-text-to-image-co9dd4288bcdb0c0cfe7a2d9c
import { nanoid } from 'nanoid'

export default function Quiz() {
    const [allQuizData, setAllQuizData] = React.useState(quizData);

    let quizArr = allQuizData.results;
    const randomQuizIndex = Math.floor(Math.random() * quizArr.length);
    const randomQuiz = quizArr[randomQuizIndex];

    let optionArr = [...randomQuiz.incorrect_answers, randomQuiz.correct_answer];
    let optionArrTest = ["Option 1", "Option 2", "Option 3", "Option 4"];

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
    const shuffledQuestions = shuffleArray(quizArr);
    const shuffledOptions = shuffleArray(optionArr);

    const optionEl = shuffledOptions.map((option, index) => {
        return (
            <span key={index}>
                <input type="radio" value={option} id={`ans-${index}`} name="option" className="quiz-option" />
                <label htmlFor={`ans-${index}`}>{option} - Index: {index}</label>
            </span>
        )
    });

    const questionEl = shuffledQuestions.map((option, index) => {
        return (
            <div className="question-wrapper" key={index}>
                <h2>{option.question}</h2>
                <fieldset className="answer-field">
                    <legend className="sr-only">Select one answer:</legend>
                    {optionEl}
                </fieldset>
            </div>
        )
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