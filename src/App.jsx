// import { useState } from 'react'
import "./App.css";

function App() {
  return (
    <>
      <div className="main-menu-container">
        <div className="title-text-container">
          <h1>Lord of the Rings</h1>
          <h2>Match Card Game</h2>
        </div>
        <div className="options-container">
          <h3>New Game</h3>
          <h3>How to Play</h3>
          <h3>About</h3>
        </div>
      </div>

      <div className="game-container" hidden>
        <div className="header-container">
          <div className="game-title-text-container">
            <h1>Lord of the Rings</h1>
            <h2>Match Card Game</h2>
          </div>
          <div className="score-container">
            <h3>High Score: 0</h3>
            <h3>Current Score: 0</h3>
          </div>
        </div>

        <div className="game-content-container">
          <div className="game-cards-container">
            <div className="game-card">A</div>
            <div className="game-card">B</div>
            <div className="game-card">C</div>
            <div className="game-card">D</div>
          </div>
          <div className="hint-container">
            <button>Hint</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
