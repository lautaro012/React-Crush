import React from "react";

export default function Score ( {score} ) {

    return (
        <div className="details">
            <h1> Score </h1>
            <h1>{score}</h1>
        </div>
    )
}