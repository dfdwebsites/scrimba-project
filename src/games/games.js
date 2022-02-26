import React from 'react'
import {Link} from "react-router-dom"
import GameLink from './GameLink'


export default function Games(){
const rpgDetail=`A fun game the used advanced js functions to build like map(),
 reduce() also a big step to understant about Constractor functions and Classes `
 const quizDetail=`An amazing quiz game with a very nice API that you can scale it a LOT.
 this game was actually a challenge but with the previous lessons we learn how we can 
 handle with API calls and we had all the tools with js and css to make it GREAT`
 const snakeDetail =` Classic game from Nokia phones brings a nostagic touch giving use the 
 ability to understand the basic js functions arrays and SetIntenals`
return (
    <main className='games-main'>

        <span className='page-title'></span>
        <p className='games-main-p'>In many modules through the course we were creating small games in order to 
            learn  </p>
        <p className='games-second-p'>specific commands /properties/values while creating an example.Srimba's amazing workspace made each challenge , challenging in the same time
            very important since all the teachers aggreed in the same principle that "You 
            learn code by practicing".</p>
        
        <p className='games-second-p'>Here is a small list of the games we created in the course. <br /> You can navigate below or check
            them in details further in the page
        </p>
        <div className='games-nav'>
            <Link to="/games/cardgames">Card Games</Link>
            <Link to="/games/snake">Snake</Link>
            <Link to="/games/rpg">RPG</Link>
            <Link to="/games/pacman">PacMan</Link>
            <Link to="/games/quiz">Quiz-Game</Link>
            <Link to="/games/Mario">Super Mario</Link>
        </div>
        <section className='all-game-items'>
            <GameLink to="rpg" url="./img/rpg.png" name="RPG" detail={rpgDetail}/>
            <GameLink to="snake" url="./img/snake.png" name="Snake Game" detail={snakeDetail}/>
            <GameLink to="quiz" url="./img/rpg.png" name="Quiz-Game" detail={quizDetail}/>
        </section>
    </main>
    ) 
    
}