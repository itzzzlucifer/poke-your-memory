import React from "react";
import PokeList from "./components/PokeList";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState("Medium");

  // State for Modal visibility and content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [gameOutcome, setGameOutcome] = useState(''); // 'win' or 'lose'



  const handleDifficultyChange = (selectedValue) => {
    setDifficulty(selectedValue);
    console.log(`Difficulty: ${selectedValue}`);
  };
  const handleScoreChange = (score1) => {
    setScore(score1);
  };
  const handleBestScoreChange = (score1) => {
    setBestScore(score1);
  };

  // Callback from PokeList when game ends
  const handleGameEnd = (score, outcome) => {
    setFinalScore(score);
    setGameOutcome(outcome);
    setIsModalOpen(true); // Open the modal
  };

  const handlePlayAgain = () => {
    setIsModalOpen(false); // Close modal
    setFinalScore(0);    // Reset score
    setGameOutcome('');  // Reset outcome
    // You'll need to trigger a reset in PokeList as well,
    // for example, by forcing a re-fetch or resetting its internal state.
    // A simple way is to pass a 'resetGame' prop to PokeList and toggle it.
    setDifficulty(prev => prev); // A trick to force PokeList re-render if difficulty hasn't changed
                                        // or better yet, pass a dedicated 'resetTrigger' prop
  };

  const handleQuit = () => {
    setIsModalOpen(false); // Close modal
    // Optionally, navigate away or show a different screen
    alert("Thanks for playing!"); // Using alert for demo, use a custom message box in real app
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
          />
          <PokeList
            currentScore={score}
            currentBestScore={bestScore}
            difficulty={difficulty}
            onBestScoreChange={handleBestScoreChange}
            onScoreChange={handleScoreChange}
          />
          <Modal
            isOpen={isModalOpen}
            score={finalScore}
            gameStatus={gameOutcome}
            onPlayAgain={handlePlayAgain}
            onQuit={handleQuit}
          />
        </div>
      </div>
    </>
  );
}

export default App;
