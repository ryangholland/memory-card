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

  const getQuote = () => {
    console.log("getQuote function runs");

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer O1Fp801wvJOmnR3Bcq3U",
    };
    const fetchData = async () => {
      const rawFrodoQuotes = await fetch(
        "https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfc15/quote",
        {
          headers: headers,
        }
      );
      const frodoQuoteData = await rawFrodoQuotes.json();
      const frodoQuotes = frodoQuoteData.docs;
      const filteredFrodoQuotes = frodoQuotes.filter(
        (quote) => quote.dialog.length > 50
      );
      const randomQuote =
        filteredFrodoQuotes[
          Math.floor(Math.random() * filteredFrodoQuotes.length)
        ];

      console.log(randomQuote.dialog);

      /*
      Name: Frodo Baggins - ID: 5cd99d4bde30eff6ebccfc15
      Name: Samwise Gamgee ID: 5cd99d4bde30eff6ebccfd0d
      Name: Peregrin Took ID: 5cd99d4bde30eff6ebccfe2e
      Name: Meriadoc Brandybuck ID: 5cd99d4bde30eff6ebccfc7c
      Name: Gandalf ID: 5cd99d4bde30eff6ebccfea0
      Name: Aragorn II Elessar ID: 5cd99d4bde30eff6ebccfbe6
      Name: Gimli ID: 5cd99d4bde30eff6ebccfd23
      Name: Legolas ID: 5cd99d4bde30eff6ebccfd81
      Name: Boromir ID: 5cd99d4bde30eff6ebccfc57
      */

      /*
      const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
      setQuote(quote.dialog);
      const rawCharacters = await fetch(
        "https://the-one-api.dev/v2/character?_id=" + quote.character,
        { headers: headers }
      );
      const characters = await rawCharacters.json();
      const character = characters.docs[0];
      setCharacter(character.name);
      */
    };

    fetchData();
  };

  /*
  useEffect(() => {
    if (gameOver) {
      console.log("this effect runs on game over");
    }
  }, [gameOver]);
  */

  const resetGame = () => {
    setActiveCharacters(characters);
    if (currScore > highScore) setHighScore(currScore);
    setCurrScore(0);
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
          <button>About</button>
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
            <button onClick={() => getQuote()}>Hint</button>
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
              resetGame();
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
