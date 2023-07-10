import React from "react"
import './Start.css'

export default function Start (props) {
    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button className="start-btn" onClick={props.onClick}>Start quiz</button>
        </div>
    )
}