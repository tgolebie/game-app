import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
// import { Switch, Route } from "react-router-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import GameCard from './GameCard'
import AddGameForm from './AddGameForm'
import Navbar from './Navbar'
import Rental from './Rental'
import Home from './Home'

import Signup from "./Signup";
// import Game from "./Game";


function App() {
  const [user, setUser] = useState(null)
  const [rentedGames, setRentedGames] = useState([])

  useEffect(() => {
    fetch('/authorized')
    .then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user))
      } else {
        // handle what should happen if not logged in
        console.log('error')
      }
    })
  }, [])

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE'
    }).then((resp) => {
      if (resp.ok) {
        //  handle logout on frontend
        setUser(null)
        // naigate to route
      }
    })
  }

  if (!user) {
    return <Signup setUser={setUser} />
  }
 
  
  return (
    <div className='mainpage'>
      <Router>
        <Navbar />
        <Switch> 
          <Route exact path='/' component={Home} />
          <Route path='/games' render={() => <GameCard userId={user.id} />} />
          <Route path='/addgame' component={AddGameForm} />
          <Route path='/rentals' render={() => <Rental setRentedGames={setRentedGames} />} />
          <Route path='/users' component={Signup} />
        </Switch>
      </Router>
      

     
      <Button className="logout-button" variant="contained" onClick={handleLogout}>
  Logout
</Button>
  </div>
  )
}

export default App;
