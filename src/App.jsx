import React, { useState, useRef } from "react";
import audio from "./assets/audio.mp3";
import "./index.css";

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const startGame = () => {
    if (!isGameRunning) {
      setIsGameRunning(true);
      console.log("Game started");
      scheduleNextSound();
    }
  };

  const stopGame = () => {
    if (isGameRunning) {
      setIsGameRunning(false);
      console.log("Game stopped");
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setBgColor("#ffffff");
    }
  };

  const scheduleNextSound = () => {
    if (isGameRunning) {
      const delay = Math.random() * (5 - 2) * 1000 + 2 * 1000; // Random delay between 2 to 5 seconds
      console.log(`Next sound scheduled in ${delay / 1000} seconds`);
      timerRef.current = setTimeout(() => {
        playSoundAndChangeBg();
      }, delay);
    }
  };

  const playSoundAndChangeBg = () => {
    if (isGameRunning && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log("Sound played");
        })
        .catch((err) => {
          console.error("Sound failed to play", err);
        });
      setBgColor(getRandomColor());
      console.log("Background color changed");
      scheduleNextSound();
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="game-container" style={{ backgroundColor: bgColor }}>
      <h1>Random Sound Game</h1>
      <div className="button-container">
        <button
          onClick={startGame}
          className="game-button"
          disabled={isGameRunning}
        >
          Start
        </button>
        <button
          onClick={stopGame}
          className="game-button stop-button"
          disabled={!isGameRunning}
        >
          Stop
        </button>
      </div>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
}

export default App;
