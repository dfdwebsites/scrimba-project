import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Css from "./css"
import JavaScript from './js'
import Games from './games/games'
import Home from "./home"
import RpgGame from './games/rpg/Rpg'
import SnakeGame from './games/snake/SnakeGame'
import RetroSnake from './games/snake/RetroSnake'
import SnakePage from './games/snake/SnakePage'
import Mario from './games/mario/Mario'
import PacMan from './games/pacman/PacMan'


function App() {
  const [loading,setLoading] = React.useState(true)
  React.useEffect(()=>{
    window.onload=()=>{
      setLoading(false)
    }
  })

  return !loading&& (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="css" element={<Css />}/>
        <Route path="js" element={<JavaScript />}/>
        <Route path="games" element={<Games />}/>
          <Route path="games/rpg" element={<RpgGame />}/> 
          <Route path="games/snake" element={<SnakePage />}/> 
            <Route path="games/snake/snake" element={<SnakeGame />}/> 
            <Route path="games/snake/retro" element={<RetroSnake />}/> 
          <Route path="games/mario" element={<Mario />}/> 
          <Route path="games/pacman" element={<PacMan />}/> 
        
      
      </Routes>
     
    </>
    
  );
}

export default App;
