// import { useState } from 'react'
import "./App.css";
import logo from "./assets/images/logo.png"


function App() {
  return (
    <>
      <div className="main-menu-container">
        <div className="title-text-container">
          <img src={logo} className="logo-img"></img>
          <h1>Match Card Game</h1>
        </div>
        <div className="options-container">
          <h2>New Game</h2>
          <h2>How to Play</h2>
          <h2>About</h2>
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
