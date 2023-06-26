import React from "react";
import earthIcon from '../assets/earth.svg'

export default function Header() {
    return (
        <header>
            <img src={earthIcon} alt=""/>
            <h1>my travel journal.</h1>
        </header>
    )
}