import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from "./Navbar"
import Css from "./css"
import JavaScript from './js'
import Games from './games/games'
import Home from "./home"
import RpgGame from './games/rpg/Rpg'
import SnakeGame from './games/snake/SnakeGame'
import RetroSnake from './games/snake/RetroSnake'
import SnakePage from './games/snake/SnakePage'


function App() {
  return (
    <>
      <header className="App-header">
      <Navbar />
      </header>
      <Routes>
        <Route path="/scrimba-project" element={<Home />}/>
        <Route path="/scrimba-project/css" element={<Css />}/>
        <Route path="/scrimba-project/js" element={<JavaScript />}/>
        <Route path="/scrimba-project/games" element={<Games />}/>
          <Route path="/scrimba-project/games/rpg" element={<RpgGame />}/> 
          <Route path="/scrimba-project/games/snake" element={<SnakePage />}/> 
            <Route path="/scrimba-project/games/snake/snake" element={<SnakeGame />}/> 
            <Route path="/scrimba-project/games/snake/retro" element={<RetroSnake />}/> 
        
      
      </Routes>
     
    </>
    
  );
}

export default App;
