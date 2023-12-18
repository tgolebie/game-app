import React, { useState, useEffect } from "react";
import Game from "./Game";

function Rental({ setRentedGames }) {
    const [rentedGamesLocal, setRentedGamesLocal] = useState([]);
  
    useEffect(() => {

      fetch('/rentals')
        .then((resp) => {
          console.log("Response status:", resp.status);
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error(`Server returned status: ${resp.status}`);
          }
        })
        .then((data) => {
          console.log("Response from /rentals:", data);
          setRentedGamesLocal(data);
          setRentedGames(data);
        })
        .catch((error) => {
          console.error("Error fetching rented games:", error.message);
        });
    }, [setRentedGames]);

    const handleReturnGame = (gameId) => {
     
      fetch(`/rentals/${gameId}`, {
          method: "DELETE",
      })
          .then((resp) => {
              if (resp.ok) {
                  
                  setRentedGamesLocal((prevRentedGames) =>
                      prevRentedGames.filter((game) => game.id !== gameId)
                  );
                  setRentedGames((prevRentedGames) =>
                      prevRentedGames.filter((game) => game.id !== gameId)
                  );
              } else {
                  console.error("Failed to return game");
              }
          })
          .catch((error) => console.error("Error returning game:", error));
  };


  
    
  
    const renderRentedGames = rentedGamesLocal.map(({game}) => (
      <Game
        key={game.id}
        id={game.id}
        image={game.image}
        title={game.title}
        rating={game.rating}
        price={`$${game.price}`}
        onReturn={handleReturnGame} 
        
        
       
      />
    ));
  
    return (
      <div>
        <h2>Rented Games</h2>
        <ul className="cards">{renderRentedGames}</ul>
      </div>
    );
  }
  
  export default Rental;