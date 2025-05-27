import React, { useState } from "react";
import DifficultySelector from "./DifficultySelector";

function NavBar({
  score,
  bestScore,
  difficulty,
  onDifficultyChange
}) {
  return (
    <div className="navbar">
      <div className="game-name">
        <h1>Poke Your Memory</h1>
        <img src="/pokeball.png" alt="pokeball image" />
      </div>
      <div className="scores">
        <div className="current-score">Score: {score}</div>
        <div className="best-score">Best: {bestScore}</div>
      </div>
      <div className="actions">
        <DifficultySelector
          value={difficulty} // Passed down from App
          onDifficultyChange={onDifficultyChange} // Passed down from App
        />
        <button className="play-button btn">PLAY ▶</button>
      </div>
    </div>
  );
}

export default NavBar;
