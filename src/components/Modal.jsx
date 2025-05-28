// src/components/Modal.jsx
import React from 'react';

function Modal({ isOpen, score, maxScore, gameStatus, onPlayAgain, onQuit }) {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  // Determine title, message, and image based on gameStatus ('win' or 'lose')
  const isWin = gameStatus === 'win';
  const title = isWin ? 'Congratulations!' : 'Game Over!';
  const message = isWin
    ? `You caught all the Pokémon! Your score: ${score}`
    : `You clicked a Pokémon twice! Your score: ${score}`;
  const imageSrc = isWin
    ? `https://placehold.co/150x150/4CAF50/FFFFFF?text=WIN` // Green for win
    : `https://placehold.co/150x150/F44336/FFFFFF?text=LOSE`; // Red for lose
  const altText = isWin ? 'Winning illustration' : 'Losing illustration';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <img src={imageSrc} alt={altText} />
        <div className="modal-buttons">
          <button className="play-again-btn" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="quit-btn" onClick={onQuit}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;