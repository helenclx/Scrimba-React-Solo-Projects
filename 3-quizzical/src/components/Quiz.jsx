import React from "react"
import './Quiz.css'
import quizData from '../quizdata'
// Refer to https://scrimba.com/learn/learnreact/project-add-text-to-image-co9dd4288bcdb0c0cfe7a2d9c

export default function Quiz() {
    const [allQuizData, setAllQuizData] = React.useState(quizData);

    const questionEl = (
        <div className="question-container">
            <h2>This is a question</h2>
            <fieldset className="answer-field">
                <legend className="sr-only">Select one answer:</legend>
                <span>
                    <input type="radio" id="ans-1" name="option"/>
                    <label htmlFor="ans-1">Option 1</label>
                </span>
                <span>
                    <input type="radio" id="ans-2" name="option"/>
                    <label htmlFor="ans-2">Option 2</label>
                </span>
                <span>
                    <input type="radio" id="ans-3" name="option"/>
                    <label htmlFor="ans-3">Option 3</label>
                </span>
                <span>
                    <input type="radio" id="ans-4" name="option"/>
                    <label htmlFor="ans-4">Option 4</label>
                </span>
            </fieldset>
        </div>
    )

    return (
        <div className="quiz-container">
            {questionEl}
            {questionEl}
            {questionEl}
            {questionEl}
            {questionEl}
            <button className="check-ans-btn">Check answers</button>
        </div>
    )
}