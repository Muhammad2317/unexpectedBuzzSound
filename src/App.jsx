import React, { useRef, useState } from "react";
import audio from "./assets/audio2.mp3";
import "./index.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rollResult, setRollResult] = useState(null);
  const [nextRollDelay, setNextRollDelay] = useState(60000); // Start with 1 minute (60,000ms)
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  const audioRef = useRef(null);
  const rollTimeout = useRef(null); // Track the timeout ID to clear it when needed

  // Simulate the dice roll with 30% chance of 0 and 70% chance of 1
  const rollDice = () => {
    const randomNum = Math.random();
    console.log(`Random value: ${randomNum}`);

    let result = randomNum < 0.3 ? 0 : 1; // 30% for 0, 70% for 1
    console.log(`Rolled: ${result}`);
    setRollResult(result);

    if (result === 0) {
      emulateButtonPress();
      setNextRollDelay(120000); // After zero, next roll starts after 2 minutes
    } else {
      setNextRollDelay(60000); // After 1, next roll starts after 1 minute
    }

    // Schedule the next roll after the calculated delay
    rollTimeout.current = setTimeout(() => rollDice(), nextRollDelay);
  };

  const emulateButtonPress = () => {
    console.log("Emulating Start button press");
    startSound();
    setTimeout(() => {
      console.log("Emulating Stop button press");
      stopSound();
    }, 3000); // Stop sound after 3 seconds
  };

  const startSound = () => {
    if (!isPlaying && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log("Sound started playing");
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Failed to play sound", err);
        });
    }
  };

  const stopSound = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
      console.log("Sound stopped");
      setIsPlaying(false);
    }
  };

  const startGame = () => {
    console.log("Game started");
    setGameStarted(true); // Mark the game as started
    rollTimeout.current = setTimeout(() => rollDice(), 60000); // Start the first roll after 1 minute
  };

  const stopGame = () => {
    console.log("Game stopped");
    stopSound();
    setRollResult(null); // Clear the result
    setGameStarted(false); // Mark the game as stopped
    if (rollTimeout.current) clearTimeout(rollTimeout.current); // Clear any pending roll timeouts
  };

  return (
    <div className="game-container">
      <h1>The sound will play at any time.</h1>
      <div className="button-container">
        <button
          onClick={startGame}
          className="game-button"
          disabled={gameStarted}
        >
          Start Game
        </button>
        <button
          onClick={stopGame}
          className="game-button stop-button"
          disabled={!gameStarted}
        >
          Stop Game
        </button>
      </div>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
}

export default App;
