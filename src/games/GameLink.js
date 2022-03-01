import React from 'react'
import {Link} from 'react-router-dom'

function GameLink(props){

    return (
        <div className={`game-item game-item-${props.to}`}>
            <h2 className='game-title'>{props.name}</h2>
            <img className='game-img' src={props.url} alt="of the creation" />
            <p className='game-description'>{props.detail}</p>
            <Link className="game-btn" to={`/games/${props.to}`}>Check out the game</Link>
        </div>
    )
}

export default GameLink