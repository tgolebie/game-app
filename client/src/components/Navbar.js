import React from 'react'
import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav className='navbarclass'>
            <ul>
                <p>
                    <Link to='/'>Home</Link>
                </p>
                <p>
                    <Link to='/games'>Games</Link>
                </p>
                <p>
                    <Link to='/addgame'>Add Game</Link>
                </p>
                <p>
                    <Link to='/rentals'>My Rentals</Link>
                </p>
                <p>
                    <Link to='/users'>Signup</Link>
                </p>
            </ul>
        </nav>
    )
}
export default Navbar