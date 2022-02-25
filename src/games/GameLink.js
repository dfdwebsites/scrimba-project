import React from 'react'
import {Link} from 'react-router-dom'

function GameLink(props){

    return (
        <div className='game-item'>
            <img className='game-img' src={props.url} />
            <div className='game-details'>
                <h2 className='game-title'>{props.name}</h2>
                <p className='game-description'>{props.detail}</p>
                <Link to={`/games/${props.to}`}><p className="game-btn">Check out the game</p></Link>
            </div>
        </div>
    )
}

export default GameLink