import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Css from "./css"
import JavaScript from './js'
import Games from './games/games'
import Home from "./home"
import Space from './games/rpg/Space'
import SnakeGame from './games/snake/SnakeGame'
/* import RetroSnake from './games/snake/RetroSnake'
import SnakePage from './games/snake/SnakePage' */
import Mario from './games/mario/Mario'
import PacMan from './games/pacman/PacMan'
import Quiz from './games/quiz/Quiz'
import Cards from './games/cards/Cards'
import BlackJack from './games/cards/BlackJack'
//import War from './games/cards/War'
import Uno from './games/cards/Uno'
import UnoLanding from './games/cards/UnoLanding'


function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="css" element={<Css />}/>
        <Route path="js" element={<JavaScript />}/>
        <Route path="games" element={<Games />}/>
          <Route path="games/space" element={<Space />}/> 
          <Route path="games/cards" element={<Cards />}/> 
            <Route path="games/cards/uno" element={<UnoLanding />}/> 
            <Route path="games/cards/uno/play" element={<Uno />}/>  
            <Route path="games/cards/blackJack" element={<BlackJack />}/> 
            {/* <Route path="games/cards/war" element={<War />}/>  */}
          <Route path="games/snake" element={<SnakeGame />}/> 
          {/*   <Route path="games/snake/snake" element={<SnakeGame />}/> 
            <Route path="games/snake/retro" element={<RetroSnake />}/>  */}
          <Route path="games/mario" element={<Mario />}/> 
          <Route path="games/pacman" element={<PacMan />}/> 
          <Route path="games/quiz" element={<Quiz />}/> 
        
      
      </Routes>
     
    </>
    
  );
}

export default App;
