import React from "react"
import './Quiz.css'
import classNames from 'classnames'

export default function Quiz(props) {
    function handleOptionChange(event, questionId, selectedAnswerId) {
        props.setAllQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                if (question.id === questionId) {
                    console.log(`Selected answer: ${event.target.value}, id: ${selectedAnswerId}`);
                    return {...question,
                        selectedAnswerId: selectedAnswerId
                    }
                } else {
                    return question;
                };
            });
        })
    }

    const questionEl = props.allQuestions.map((question, i) => {
        const {selectedAnswerId, correctAnswer} = question;
        const optionEl = question.options.map((option) => {
            return (
                <label key={option.id} htmlFor={option.id} className={
                    classNames(
                        "quiz-option",
                        {"quiz-option__selected": !props.answersChecked && option.id === selectedAnswerId},
                        {"quiz-option__correct": props.answersChecked && option.id === correctAnswer.id},
                        {"quiz-option__wrong": props.answersChecked && option.id !== correctAnswer.id},
                        {"quiz-option__unselected": props.answersChecked && option.id !== correctAnswer.id && option.id !== selectedAnswerId}
                    )
                }>
                    <input
                        type="radio"
                        value={option.answer}
                        id={option.id}
                        name={`question-${i}`}
                        onChange={() => handleOptionChange(event, question.id, option.id)}
                        disabled={props.answersChecked}
                    />
                    {option.answer}
                </label>
            )
        });

        return (
            <div className="question-wrapper" key={question.id} id={question.id}>
                <h2>{question.question}</h2>
                <fieldset className="answer-field" aria-label="Answer options">
                    <legend className="sr-only">Select one answer:</legend>
                    {optionEl}
                </fieldset>
                <hr />
            </div>
        );
    });

    function checkAnswers() {
        props.setAnswersChecked(true);
        console.log("Answers checked");
        props.allQuestions.forEach((question, i) => {
            if (question.selectedAnswerId === question.correctAnswer.id) {
                console.log(`Question ${i}: Correct answer.`);
                props.setUserScore(prevScore => prevScore += 1);
            } else {
                console.log(`Question ${i}: Wrong answer. The answer is ${question.correctAnswer.answer}.`);
            };
        });
        console.log(`User score is ${props.userScore} out of ${props.allQuestions.length}`);
    }

    return (
        <article className="quiz-container" aria-live="polite">
            <h1 className="sr-only">Quizzical questions</h1>
            <section className="quiz-section">{questionEl}</section>
            <section className="result-section">
                {
                    props.answersChecked &&
                    <h3>You scored {props.userScore}/{props.allQuestions.length} correct answers</h3>
                }
                {
                    props.answersChecked ?
                    <button className="check-ans-btn" onClick={() => props.restartQuiz()}>
                        Play again
                    </button>
                    : <button className="check-ans-btn" onClick={() => checkAnswers()}>
                        Check answers
                    </button>
                }

            </section>
        </article>
    )
}