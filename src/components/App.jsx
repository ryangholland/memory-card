import { useState, useEffect } from "react";
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

  const [activeScreen, setActiveScreen] = useState("main");
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeCharacters, setActiveCharacters] = useState(characters);

  const generateChoices = () => {
    const activeChoices = [];

    // Pick a character that has NOT been guessed
    const unguessedCharacters = activeCharacters.filter(
      (character) => !character.guessed
    );
    let choice =
      unguessedCharacters[
        Math.floor(Math.random() * unguessedCharacters.length)
      ];
    activeChoices.push(choice);

    // Pick 3 more characters
    do {
      choice =
        activeCharacters[Math.floor(Math.random() * activeCharacters.length)];
      if (!activeChoices.includes(choice)) activeChoices.push(choice);
    } while (activeChoices.length < 4);

    return activeChoices.sort(() => 0.5 - Math.random());
  };

  const [activeChoices, setActiveChoices] = useState(generateChoices);

  const makeGuess = (id) => {
    const guess = activeCharacters.find((character) => character.id === id);

    if (guess.guessed || currScore >= 8) {
      if (!guess.guessed) setCurrScore((currScore) => currScore + 1);
      setGameOver(true);
    } else {
      setActiveCharacters(
        activeCharacters.map((character) => {
          if (character.id === id) character.guessed = true;
          return character;
        })
      );
      setCurrScore((currScore) => currScore + 1);
      setActiveChoices(generateChoices);
    }
  };

  useEffect(() => {
    if (gameOver) {
      console.log("this effect runs on game over");
    }
  }, [gameOver]);

  console.log(activeScreen);

  return (
    <>
      <div
        className={`main-menu-container ${activeScreen !== "main" && "hidden"}`}
      >
        <div className="title-text-container ">
          <img src={logo} className="logo-img"></img>
          <h1>Memory Card Game</h1>
        </div>
        <div className="options-container">
          <button
            className="options-btn"
            onClick={() => setActiveScreen("game")}
          >
            New Game
          </button>
          <h2>How to Play</h2>
          <h2>About</h2>
        </div>
      </div>

      <div
        className={`game-container ${activeScreen !== "game" && "hidden"} ${
          gameOver && "overlay"
        }`}
      >
        <div className="header-container">
          <div className="game-title-text-container">
            <img src={logo} className="logo-img"></img>
            <h2>Memory Card Game</h2>
          </div>
          <div className="score-container">
            <h3>High Score: 0</h3>
            <h3>Current Score: {currScore}</h3>
          </div>
        </div>

        <div className="game-content-container">
          <div className="game-cards-container">
            {activeChoices.map((choice) => {
              return (
                <GameCard {...choice} key={choice.id} makeGuess={makeGuess} />
              );
            })}
          </div>
          <div className="hint-container">
            <button>Hint</button>
          </div>
        </div>
      </div>

      <dialog className={`${!gameOver && "hidden"}`}>
        <h2>{currScore === 9 ? "You win!" : "Game over!"}</h2>
        <h2>Your score was {currScore} / 9</h2>
        <img src={currScore === 9 ? "/win.gif" : "/lose.gif"} alt="#" />
        <button>Play Again</button>
        <button>Main Menu</button>
      </dialog>
    </>
  );
}

export default App;
