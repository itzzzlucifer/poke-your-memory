import React, { useState } from "react";
import { useRef } from "react";
import DifficultySelector from "./DifficultySelector";

function NavBar({
  score,
  bestScore,
  difficulty,
  onDifficultyChange
}) {
  // 1. Create a ref to access the <audio> element directly in the DOM
  // const audioRef = useRef(null);

  // const playSound = () => {
  //   if (audioRef.current) {
  //     // 2. Play the audio
  //     audioRef.current.play();

  //     // Optional: If you want to restart the sound every time the button is clicked,
  //     // you can reset the currentTime to 0.
  //     audioRef.current.currentTime = 0;
  //   }
  // };
  return (
    <div className="navbar">
      <div className="game-name">
        <h1>Poke Your Memory</h1>
        <img src="/pokeball.png" alt="pokeball image" />
      </div>
      <div className="author">By Prajwol Sapkota <a href="https://github.com/itzzzlucifer" target="blank">Github</a></div>
      <div className="scores">
        <div className="current-score">Score: {score}</div>
        <div className="best-score">Best: {bestScore}</div>
      </div>
      <div className="actions">
        <DifficultySelector
          value={difficulty} // Passed down from App
          onDifficultyChange={onDifficultyChange} // Passed down from App
        />
        {/* <audio ref={audioRef} src="/assets/audio/12_3.mp3" preload="auto" /> */}
        <button className="play-button btn">PLAY ▶</button>
      </div>
    </div>
  );
}

export default NavBar;
