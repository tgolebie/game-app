import React, { useState } from 'react';

function EditGameForm({ gameId, onClose, onEdit }) {
  const [editedInfo, setEditedInfo] = useState({
    title: '',
    rating: '',
    price: '',
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    onEdit(gameId, editedInfo);
    
    onClose();
  };

  return (
    <div>
      <h2>Edit Game</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedInfo.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={editedInfo.rating}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={editedInfo.price}
            onChange={handleInputChange}
          />
        </label>
        {/* <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={editedInfo.image}
          onChange={handleInputChange}
        /> */}
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditGameForm;