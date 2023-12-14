import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';


function AddGameForm(){
    const [newTitle, setTitle] = useState('');
    const [newImage, setImage] = useState('')
    const [newRating, setRating] = useState('')
    const [newPrice, setPrice] = useState('')
    const history = useHistory()

    function handleTitle(e) {
        setTitle(e.target.value)
    }
    function handleImage(e) {
        setImage(e.target.value)
    }
    function handleRating(e) {
        setRating(e.target.value)
    }
    function handlePrice(e) {
        setPrice(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const newGame = {
            title: newTitle,
            image: newImage,
            rating: newRating,
            price: newPrice
        }

    fetch('http://localhost:5555/addgame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
    })
        .then((resp) => resp.json())
        .then((respData) => {
            console.log(respData);
        history.push('/games')
        })
        .catch((error) => {
            console.error('Error adding game', error)
        })
    }

    return (
        <form method='POST'>
            <input 
                value={newTitle}
                onChange={handleTitle}
                placeholder='Enter Game Title'
                type='text'
                name='newTitle'
            />
            <input
                value={newImage}
                onChange={handleImage}
                placeholder='Enter Image URL'
                type='text'
                name='newImage'
            />
            <input
                value={newRating}
                onChange={handleRating}
                placeholder='Enter Rating'
                type='text'
                name='newRating'
            />
            <input
                value={newPrice}
                onChange={handlePrice}
                placeholder='Enter Price'
                type='text'
                name='newPrice'
            />
                <button type='submit' onClick={handleSubmit}>
                    Add Game
                </button>
        </form>
    )
}
export default AddGameForm