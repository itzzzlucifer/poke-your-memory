import React from "react";
import PokeList from "./components/PokeList";
import NavBar from "./components/NavBar";
import { useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState('Medium');

  const handleDifficultyChange = (selectedValue) => {
    setDifficulty(selectedValue);
    console.log(`Difficulty: ${selectedValue}`);
  };
  const handleScoreChange = (score) => {
    let newScore = score + 1;
    setScore(newScore);
  };
  const handleBestScoreChange = (value) => {
    if(score>bestScore){
      setBestScore(score);
    }
  };
  return (
    <>
      <div className="background-mask">
        <div className="main">
          <NavBar
            score={score}
            bestScore={bestScore}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onBestScoreChange={handleBestScoreChange}
            onScoreChange={handleScoreChange}
          />
          <PokeList difficulty={difficulty}/>
        </div>
      </div>
    </>
  );
}

export default App;
