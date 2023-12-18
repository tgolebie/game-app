import React from 'react'
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Home() {
    return (
        <Card className='home-card'>
            <CardContent>
                <h1>Welcome to Game Renting Site</h1>
                <p>
                    Explore our collection of exciting games available for rent. Whether you're into action, adventure, or strategy, we have something for everyone.
                </p>
                <p>
                    Ready to play? Browse our <Link to='/games'>game catalog</Link> to discover the latest titles.
                </p>
                <p>
                    Have some games you no longer play? <Link to='/addgame'>Add them to our collection</Link> and earn rewards!
                </p>
                <p>
                    Check your <Link to='/rentals'>rental history</Link> to see the games you currently have on rent.
                </p>
                
            </CardContent>
        </Card>
    );
}

export default Home;