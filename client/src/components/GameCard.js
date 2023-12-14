import React, { useEffect, useState } from "react";
import Game from "./Game";
import EditGameForm from './EditGameForm'
import { useHistory } from 'react-router-dom';

function GameCard() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editGameId, setEditGameId] = useState(null);
  const [rentedGames, setRentedGames] = useState([]);
  const history = useHistory()



  useEffect(() => {
    fetch("/games")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(`Server returned status: ${resp.status}`);
        }
      })
      .then((gameData) => {
        if (Array.isArray(gameData)) {
          setGames(gameData);
          setFilteredGames(gameData); 
        } else {
          console.error("Invalid response format. Expected an array, but received:", gameData);
        }
      })
      .catch((error) => {
        console.error("Error fetching games:", error.message);
      });
  }, []);

  const handleDeleteGame = (gameId) => {
    fetch(`http://localhost:5555/games/${gameId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
          setFilteredGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
        } else {
          console.error('Failed to delete game');
        }
      })
      .catch((error) => {
        console.error('Error deleting game:', error);
      });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = games.filter(
      (game) => game.title.toLowerCase().includes(query)
    );
    setFilteredGames(filtered);
  };

  const handleEditGame = (gameId, editedInfo) => {
    
    setGames((prevGames) =>
        prevGames.map((game) =>
            game.id === gameId ? { ...game, ...editedInfo } : game
        )
    );
    setFilteredGames((prevGames) =>
        prevGames.map((game) =>
            game.id === gameId ? { ...game, ...editedInfo } : game
        )
    );

    
    fetch(`http://localhost:5555/games/${gameId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedInfo),
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Server returned status: ${resp.status}`);
            }
        })
        .catch((error) => {
            console.error("Error updating game:", error.message);
            
        });
};

  const handleEditButtonClick = (gameId) => {
    
    setShowEditForm(true);
    setEditGameId(gameId);
  };

  const handleEditFormClose = () => {
    
    setShowEditForm(false);
    setEditGameId(null);
  };

  
  const handleRentGame = (gameId) => {
   
  
    fetch('/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id: gameId,
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(`Server returned status: ${resp.status}`);
        }
      })
      .then((rentalData) => {
        setRentedGames((prevRentedGames) => [
          ...prevRentedGames,
          {
            id: rentalData.gameObj.id,
            image: rentalData.gameObj.image,
            title: rentalData.gameObj.title,
            rating: rentalData.gameObj.rating,
            price: rentalData.gameObj.price,
          },
        ]);
  
        // Navigate to the Rental route
        history.push('/rentals');
      })
      .catch((error) => {
        console.error('Error renting game:', error.message);
      });
  };


  const renderGames = filteredGames.map((gameObj) => (
    <Game
      key={gameObj.id}
      id={gameObj.id}
      image={gameObj.image}
      title={gameObj.title}
      rating={gameObj.rating}
      price={`$${gameObj.price}`}
      onRent={handleRentGame}
      onDelete={handleDeleteGame}
      onEdit={handleEditButtonClick}
      setGames={setGames}
    />
  ));

  return (
    <div>
        {showEditForm && (
        <EditGameForm
          gameId={editGameId}
          onClose={handleEditFormClose}
          onEdit={handleEditGame}
        />
      )}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul className='cards'>{renderGames}</ul>
    </div>
  );
}

export default GameCard;