// import React, {useState, useEffect} from 'react'
// import {Link, useParams} from 'react-router-dom'





function Game({id, image, title, rating, price, onDelete, onEdit, onRent}){

    const handleDelete = () => {
        onDelete(id)
    }

    const handleEdit = () => {
        console.log('Open edit form for game ID:', id);
        onEdit(id)
    }

    const handleRent = () => {
        onRent(id)
    }

  

    return (
        <div className= 'cards_item'>
            <img src={image} alt={title} className= 'cards_image' />
            <div className="card_content"></div>
            <div className='card_title'>{title}
                {/* <p>Title : {title}</p> */}
                <p>Rating : {rating}</p>
                <p>Price : {price}</p>
            </div>
            <button onClick={handleRent}>Rent</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
            
        </div>
    )
}
export default Game