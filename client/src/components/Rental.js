import React from "react";
import Game from "./Game";

function Rental({ rentedGames }) {
  const renderRentedGames = rentedGames.map((gameObj) => (
    <Game
      key={gameObj.id}
      id={gameObj.id}
      image={gameObj.image}
      title={gameObj.title}
      rating={gameObj.rating}
      price={`$${gameObj.price}`}
    />
  ));

  return (
    <div>
      <h2>Rented Games</h2>
      <ul className='cards'>{renderRentedGames}</ul>
    </div>
  );
}

export default Rental;