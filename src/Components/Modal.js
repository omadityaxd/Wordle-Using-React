import React from "react";

export default function Modal({ solution, turn, isCorrect }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>Congratulations , You won</h1>
          <p>The word was</p>
          <p className="solution">{solution}</p>
          <p>You found the word in {turn} guesses</p>
          <p>Refresh the page to get a new word</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <p>The word was</p>
          <p className="solution">{solution}</p>
          <p>Better luck next time ! </p>
          <p>Refresh the page to get a new word</p>
        </div>
      )}
    </div>
  );
}
