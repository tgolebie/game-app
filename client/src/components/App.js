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

  // useEffect(() => {
  //   fetch('/authorized')
  //   .then((resp) => {
  //     if (resp.ok) {
  //       resp.json().then((user) => setUser(user))
  //     } else {
  //       // handle what should happen if not logged in
  //       console.log('error')
  //     }
  //   })
  // }, [])

  // function handleLogout() {
  //   fetch('/logout', {
  //     method: 'DELETE'
  //   }).then((resp) => {
  //     if (resp.ok) {
  //       //  handle logout on frontend
  //       setUser(null)
  //       // naigate to route
  //     }
  //   })
  // }

  // if (!user) {
  //   return <Signup setUser={setUser} />
  // }
 
  
  return (
    <div className='mainpage'>
      <Router>
        <Navbar />
        <Switch>
          
         {/* <Signup setUser={setUser} /> */}
         
          {/* <Route path='/' component={Home} /> */}
          <Route path='/games' component={GameCard} />
          <Route path='/addgame' component={AddGameForm} />
          <Route path='/rental' component={Rental} />
          <Route path='/users' component={Signup} />
          
          {/* <Route patn='/rentals/:id' componenet={RentalDetails} /> */}
          {/* <Button variant="contained" onClick={handleLogout}>Logout</Button> */}
        </Switch>
      </Router>
      

     
      {/* <Button variant="contained" onClick={handleLogout}>Logout</Button> */}
  </div>
  )
}

export default App;
