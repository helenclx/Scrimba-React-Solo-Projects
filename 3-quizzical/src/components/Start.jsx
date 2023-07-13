import React from "react"
import './Start.css'

export default function Start (props) {
    function startQuiz() {
        props.setQuizStart(true);
    }

    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>Welcome! Test your knowledge with this quiz!</p>
            <button className="start-btn" onClick={() => startQuiz()}>Start quiz</button>
        </div>
    )
}