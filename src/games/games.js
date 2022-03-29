import React from 'react'
import {Link} from "react-router-dom"
import GameLink from './GameLink'
import Canvas from '../components/Canvas'
import Navbar from '../components/Navbar'


export default function Games(){
    React.useEffect(()=>{
        window.scrollTo(0,0)
    },[])
const rpgDetail=`A fun game the used advanced js functions to build like map(),
 reduce() also a big step to understant about Constractor functions and Classes and an introduction
 for how to use a "data-base" that you get all the info from.
 As all the other games its not about creating a full animated game but learning
 functions and methods you have to use to create even this state. And as always 
 you can always push your self and make it GREAT. `
 const quizDetail=`An amazing quiz game with a very nice API that you can scale it a LOT.
 By that time you had learn  the basics of the amazing React library that will open a whole new world
 to you. This game was the final challenge of the React module but with the previous lessons we learn how we can 
 handle with API calls and we had all the tools with js and css to make it GREAT.
 Later in the course you will see more advanced tools in the React world that will make you go back and 
 upgrade your game and you know what.. DO IT! Practice makes perfect, this is the whole reason I am 
 making this website anyway ;)
 `
 const snakeDetail =` Classic game from Nokia phones brings a nostagic touch giving use the 
 ability to understand the basic js functions, arrays and SetIntenals. Nice challenges for you
 to upgrade the game using event listeners for key press and even for buttons if you create ones for
 a mobile aproach.It will seem very dificult to understand at first since its gonna be your first
 impressions on JS but then you will realise that there are a lot of ways that you can achive the same result and by the end of 
 the hole course i promise you that you wont be able to decide what way to use since you will be 
 able to create it with at least more than 3 ways.`
 const marioDetail=`SUPER MARIO!!!! What else can we say about it, jokes aside although there isnt a specific
 course teaching you how to create a Mario game, with the Knowledge you are getting from the course you can
 research and use diferent things on the internet, witch is the most important skill you can get.
 Since everyone teaching here on Scrimba have the same principle to search and try on your own you are getting this skill.
 In this case I am using a new library called "Kaboom.js"`
 const pacManDetail=`All time classic game Pac-Man, With the creation of this game we started to understand better DOM manipulation through JS,
 creating elements and appending them to their parent creating a grid that represents the game. A lot of "if" statments and arrays methods like map
 forEach reduce and splice. Event listeners used to move PacMan and class manipulation to prevent going out of the grid. There are a lot of ways to 
 create this game, I used HTML Canvas so the methods i used is a little different than the Scrimba's course but this is the magic "After you udenstand 
 the methods you can do whatever you want"`
const cardDetails = `We created some of Card games through the course, some using just numbers represending the cards and later we started to use 
API calls so we can get the cards with the images. We learned a lot about functions and arrays while creating these games.  I went one step further and made 
a Multiplayer game using Socket.io for the server communication
and at the end of each player's turn plus the power of React server is sending the data and changing the state of the game `
return (<>
    <header className="App-header">
    <Navbar />
    </header>
    <main>
        <Canvas />
        <div className='section-hero games-page'>
            <h2 className='page-title'>GAMES</h2>
        </div>
        <div className='games-main'>
            <h3 className='games-main-title'>Creating mini-games with JS</h3>
            <p className='games-main-p'>In many modules through the course we were creating small games in order to 
                learn specific commands /properties /values while creating an example. Scrimba's amazing workspace made each challenge , challenging in the same time
                very important since all the teachers aggreed in the same principle that "You 
                learn code by practicing".</p> 
            <p className='games-main-p second'>Here is a small list of the games we created in the course. You can navigate below or check
                them in details further in the page
            </p>
            <div className='games-nav'>
                <Link className='game-item-cards' to="/games/cards">Card Games</Link>
                <Link className='game-item-snake' to="/games/snake">Snake</Link>
                <Link className='game-item-space' to="/games/space">Space</Link>
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
                <GameLink to="cards" url="./img/cards.png" name="Card-games" detail={cardDetails}/>
                <GameLink to="snake" url="./img/snake.png" name="Snake Game" detail={snakeDetail}/>
                <GameLink to="space" url="./img/space.png" name="Space" detail={rpgDetail}/>
                <GameLink to="pacman" url="./img/pac-man.png" name="Pac-Man" detail={pacManDetail}/>
                <GameLink to="quiz" url="./img/quiz.png" name="Quiz-Game" detail={quizDetail}/>
                <div className='game-item game-item-superMario'>
                    <h2 className='game-title'>  
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
                    </h2>
                    <Link className='img-link' to={`/games/mario`}>
                        <img className='game-img' src="./img/mario-img.png" alt="of the creation" />
                    </Link>
                    <p className='game-description'>{marioDetail}</p>
                    <Link className="game-btn" to={`/games/mario`}>
                        <span className='super-mario-link'>C</span>
                        <span className='super-mario-link'>h</span>
                        <span className='super-mario-link'>e</span>
                        <span className='super-mario-link'>c</span>
                        <span className='super-mario-link'>k </span>
                        <span className='super-mario-link'>o</span>
                        <span className='super-mario-link'>u</span>
                        <span className='super-mario-link'>t </span>
                        <span className='super-mario-link'>t</span>
                        <span className='super-mario-link'>h</span>
                        <span className='super-mario-link'>e </span>
                        <span className='super-mario-link'>g</span>
                        <span className='super-mario-link'>a</span>
                        <span className='super-mario-link'>m</span>
                        <span className='super-mario-link'>e</span>
                      
                    </Link>
                 </div>
                
            </section>
        </div>
    </main>
   </> 
   ) 
    
}