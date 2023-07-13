import React, { useState, useEffect } from "react"
import './Quiz.css'
import {decode} from 'html-entities'
import {nanoid} from 'nanoid'

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

    function handleOptionChange(event, questionId, selectedAnswerId) {
        setAllQuiestions(prevQuestions => {
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

    const questionEl = allQuestions.map((question, i) => {
        const optionEl = question.options.map((option) => {
            return (
                <label key={option.id} htmlFor={option.id} className="quiz-option">
                    <input type="radio" value={option.answer} id={option.id} name={`question-${i}`} onChange={() => handleOptionChange(event, question.id, option.id)} />
                    {option.answer}
                </label>
            )
        });

        return (
            <div className="question-wrapper" key={question.id} id={question.id}>
                <h2>{question.question}</h2>
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
        /* allQuestions.forEach((question, i) => {
            const checkOptionsEl = document.querySelectorAll(`input[name=question-${i}]`);
            checkOptionsEl.forEach(optionEl => {
                if (optionEl.checked) {
                    console.log(`Selected answer: ${optionEl.value}`);
                    if (optionEl.value == question.correctAnswer.answer) {
                        console.log(`-> Correct answer.`);
                        setUserScore(prevScore => prevScore += 1);
                    } else {
                        console.log(`-> Wrong answer. The answer is ${question.correctAnswer.answer}.`);
                    }
                }
            });
        }); */
        allQuestions.forEach((question, i) => {
            if (question.selectedAnswerId === question.correctAnswer.id) {
                console.log(`Question ${i}: Correct answer.`);
                setUserScore(prevScore => prevScore += 1);
            } else {
                console.log(`Question ${i}: Wrong answer. The answer is ${question.correctAnswer.answer}.`);
            };
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