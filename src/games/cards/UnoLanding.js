import React, { useState } from 'react'
import { Link } from 'react-router-dom'





const UnoLanding = () => {
    
    
    
    
    function makeid(length) {
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const [roomCode, setRoomCode] = useState('')
    return (
        <div className='uno-homepage'>
            <div className='uno-homepage-menu'>
                <img src={require('../../uno-img/uno-logo.png')} width='200px' />
                <div className='uno-homepage-form'>
                    <div className='uno-homepage-join'>
                        <input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                        <Link to={`./play?roomCode=${roomCode}`}><button className="uno-game-button green">JOIN GAME</button></Link>
                    </div>
                    <h1>OR</h1>
                    <div className='uno-homepage-create'>
                        <Link to={`./play?roomCode=${makeid(5)}`}><button className="uno-game-button orange">CREATE GAME</button></Link>
                    </div>
                </div>
                <a href='/scrimba-project/games/cards'><button className="uno-game-button Red">Back to Card Games</button></a>
            </div>
        </div>
    )
}

export default UnoLanding