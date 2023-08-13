import { useState, useEffect } from "react";
import "./App.css";
import logo from "../assets/images/logo.png";
import github from "../assets/images/github-mark-white.png";
import GameCard from "./GameCard";

function App() {
  const characters = [
    {
      id: 1,
      name: "Frodo",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfc15",
    },
    {
      id: 2,
      name: "Sam",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfd0d",
    },
    {
      id: 3,
      name: "Pippin",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfe2e",
    },
    {
      id: 4,
      name: "Merry",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfc7c",
    },
    {
      id: 5,
      name: "Gandalf",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfea0",
    },
    {
      id: 6,
      name: "Aragorn",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfbe6",
    },
    {
      id: 7,
      name: "Gimli",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfd23",
    },
    {
      id: 8,
      name: "Legolas",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfd81",
    },
    {
      id: 9,
      name: "Boromir",
      guessed: false,
      quoteID: "5cd99d4bde30eff6ebccfc57",
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
  const [hint, setHint] = useState(null);

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
      setHint(null);
      setActiveChoices(generateChoices);
    }
  };

  const getQuote = () => {
    const unguessedChoices = activeChoices.filter((choice) => !choice.guessed);
    const randomCharacter =
      unguessedChoices[Math.floor(Math.random() * unguessedChoices.length)];

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer O1Fp801wvJOmnR3Bcq3U",
    };

    const fetchData = async () => {
      const rawQuotes = await fetch(
        `https://the-one-api.dev/v2/character/${randomCharacter.quoteID}/quote`,
        {
          headers: headers,
        }
      );
      const quoteData = await rawQuotes.json();
      const quotes = quoteData.docs;
      const filteredQuotes = quotes.filter((quote) => quote.dialog.length > 50);
      const randomQuote =
        filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

      setHint(randomQuote.dialog);
    };

    fetchData();
  };

  const resetGame = () => {
    setActiveCharacters(characters);
    if (currScore > highScore) setHighScore(currScore);
    setCurrScore(0);
    setHint(null);
    setGameOver(false);
  };

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
          <button onClick={() => setActiveScreen("game")}>New Game</button>
          <button onClick={() => setActiveScreen("howtoplay")}>
            How to Play
          </button>
          <button onClick={() => setActiveScreen("about")}>About</button>
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
            <h3>
              High Score: <span>{highScore}</span>
            </h3>
            <h3>
              Current Score: <span>{currScore}</span>
            </h3>
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
            {hint ? (
              <p>"{hint}"</p>
            ) : (
              <button onClick={() => getQuote()}>Hint</button>
            )}
          </div>
          <button
            onClick={() => {
              resetGame();
              setActiveScreen("main");
            }}
          >
            Quit Game
          </button>
        </div>
      </div>

      <dialog className={`${!gameOver && "hidden"}`}>
        <h2>{currScore === 9 ? "You win!" : "Game over!"}</h2>
        <h2>
          Your score was <span>{currScore} / 9</span>
        </h2>
        <img src={currScore === 9 ? "/win.gif" : "/lose.gif"} alt="#" />
        <button onClick={() => resetGame()}>Play Again</button>
        <button
          onClick={() => {
            resetGame();
            setActiveScreen("main");
          }}
        >
          Main Menu
        </button>
      </dialog>

      <div
        className={`main-menu-container ${
          activeScreen !== "howtoplay" && "hidden"
        }`}
      >
        <div className="title-text-container ">
          <img src={logo} className="logo-img"></img>
          <h1>Memory Card Game</h1>
          <div className="instructions-container">
            <h3>
              1. Select all members of the fellowship, but don't click the same
              character twice!
            </h3>
            <h3>
              2. Need help? Press the hint button to get a quote from an
              unguessed character.
            </h3>
          </div>
          <button
            onClick={() => {
              setActiveScreen("main");
            }}
          >
            Main Menu
          </button>
        </div>
      </div>

      <div
        className={`main-menu-container ${
          activeScreen !== "about" && "hidden"
        }`}
      >
        <div className="title-text-container ">
          <img src={logo} className="logo-img"></img>
          <h1>Memory Card Game</h1>
          <div className="instructions-container">
            <a href="https://github.com/ryangholland">
              <h5>
                <img src={github} className="github"></img>
                Created by Ryan Holland
              </h5>
            </a>
            <a href="https://the-one-api.dev/">
              <h5>Character quotes courtesy of The One API</h5>
            </a>
            <h5>
              Images are copyrighted (or assumed to be copyrighted) and
              unlicensed. However, it is believed that the use of this work
              qualifies as fair use under United States copyright law.
            </h5>
          </div>
          <button
            onClick={() => {
              setActiveScreen("main");
            }}
          >
            Main Menu
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
