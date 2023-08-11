/* eslint-disable react/prop-types */

function GameCard({ name, guessed }) {
  return (
    <>
      <div
        className="game-card"
        style={{ backgroundImage: `url(/${name.toLowerCase()}.webp)` }}
      >
        {name}
      </div>
    </>
  );
}

export default GameCard;
