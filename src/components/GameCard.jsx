/* eslint-disable react/prop-types */

function GameCard({ id, name, makeGuess }) {
  return (
    <>
      <div
        className="game-card"
        style={{ backgroundImage: `url(/${name.toLowerCase()}.webp)` }}
        onClick={() => makeGuess(id)}
      >
        {name}
      </div>
    </>
  );
}

export default GameCard;
