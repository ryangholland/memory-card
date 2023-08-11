import { useState } from "react";
import "./App.css";
import logo from "../assets/images/logo.png";
import GameCard from "./GameCard";

function App() {
  const characters = [
    {
      id: 1,
      name: "Frodo",
      guessed: false,
    },
    {
      id: 2,
      name: "Sam",
      guessed: false,
    },
    {
      id: 3,
      name: "Pippin",
      guessed: false,
    },
    {
      id: 4,
      name: "Merry",
      guessed: false,
    },
    {
      id: 5,
      name: "Gandalf",
      guessed: false,
    },
    {
      id: 6,
      name: "Aragorn",
      guessed: false,
    },
    {
      id: 7,
      name: "Gimli",
      guessed: false,
    },
    {
      id: 8,
      name: "Legolas",
      guessed: false,
    },
    {
      id: 9,
      name: "Boromir",
      guessed: false,
    },
  ];

  const generateChoices = () => {
    const activeChoices = [];

    // Pick a character that has NOT been guessed
    const unguessedCharacters = characters.filter(
      (character) => !character.guessed
    );
    let choice =
      unguessedCharacters[
        Math.floor(Math.random() * unguessedCharacters.length)
      ];
    activeChoices.push(choice);

    // Pick 3 more characters
    do {
      choice = characters[Math.floor(Math.random() * characters.length)];
      if (!activeChoices.includes(choice)) activeChoices.push(choice);
    } while (activeChoices.length < 4);

    return activeChoices.sort(() => 0.5 - Math.random());
  };

  const [activeChoices, setActiveChoices] = useState(generateChoices);

  console.log(activeChoices);

  return (
    <>
      <div className="main-menu-container hidden">
        <div className="title-text-container">
          <img src={logo} className="logo-img"></img>
          <h1>Memory Card Game</h1>
        </div>
        <div className="options-container">
          <h2>New Game</h2>
          <h2>How to Play</h2>
          <h2>About</h2>
        </div>
      </div>

      <div className="game-container">
        <div className="header-container">
          <div className="game-title-text-container">
            <img src={logo} className="logo-img"></img>
            <h2>Memory Card Game</h2>
          </div>
          <div className="score-container">
            <h3>High Score: 0</h3>
            <h3>Current Score: 0</h3>
          </div>
        </div>

        <div className="game-content-container">
          <div className="game-cards-container">
            {activeChoices.map(choice => {
              return (
                <GameCard {...choice} key={choice.id} />
              )
            })}
            {/*
            <div className="game-card">Frodo</div>
            <div className="game-card">Frodo</div>
            <div className="game-card">Frodo</div>
            <div className="game-card">Frodo</div>
            */}
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
