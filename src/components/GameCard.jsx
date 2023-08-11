/* eslint-disable react/prop-types */

function GameCard({ id, name, makeGuess }) {
  return (
    <>
      <div
        className="game-card"
        style={{ backgroundImage: `url(/${name.toLowerCase()}.webp)` }}
        onClick={() => makeGuess(id)}
      >
        <h4>{name}</h4>
      </div>
    </>
  );
}

export default GameCard;
