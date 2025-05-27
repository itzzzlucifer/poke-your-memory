import React, { use, useState } from "react";

function NavBar() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');

  function handleDifficulty(e){
    setDifficulty(e.target.value);
  }

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
        <select name="" id="" value={difficulty} onChange={handleDifficulty}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button className="play-button btn">PLAY ▶</button>
      </div>
    </div>
  );
}

export default NavBar;
