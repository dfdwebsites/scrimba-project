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
    <main>

        <div className='section-hero games-page'>
            <h2 className='page-title'>GAMES</h2>
        </div>
        <div className='games-main'>
            <h3 className='games-main-title'>Creating mini-games with JS</h3>
            <p className='games-main-p'>In many modules through the course we were creating small games in order to 
                learn specific commands /properties /values while creating an example. Srimba's amazing workspace made each challenge , challenging in the same time
                very important since all the teachers aggreed in the same principle that "You 
                learn code by practicing".</p> 
            <p className='games-main-p second'>Here is a small list of the games we created in the course. You can navigate below or check
                them in details further in the page
            </p>
            <div className='games-nav'>
                <Link className='game-item-cards' to="/games/cardgames">Card Games</Link>
                <Link className='game-item-snake' to="/games/snake">Snake</Link>
                <Link className='game-item-rpg' to="/games/rpg">RPG</Link>
                <Link className='game-item-pacman' to="/games/pacman">PacMan</Link>
                <Link className='game-item-quiz' to="/games/quiz">Quiz-Game</Link>
                <Link className='game-item-mario' to="/games/mario">
                    <span className='super-mario-name'>S</span>
                    <span className='super-mario-name'>u</span>
                    <span className='super-mario-name'>p</span>
                    <span className='super-mario-name'>e</span>
                    <span className='super-mario-name'>r </span> 
                    <span className='super-mario-name'>M</span>
                    <span className='super-mario-name'>a</span>
                    <span className='super-mario-name'>r</span>
                    <span className='super-mario-name'>i</span>
                    <span className='super-mario-name'>o</span>
                </Link>
            </div>
            <section className='all-game-items'>
                <GameLink to="rpg" url="./img/rpg.png" name="RPG" detail={rpgDetail}/>
                <GameLink to="snake" url="./img/snake.png" name="Snake Game" detail={snakeDetail}/>
                <GameLink to="quiz" url="./img/rpg.png" name="Quiz-Game" detail={quizDetail}/>
            </section>
        </div>
    </main>
    ) 
    
}