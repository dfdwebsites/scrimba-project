import React, { useState } from 'react'
import { Link } from 'react-router-dom'





const UnoLanding = () => {
    
    
    const [roomCode, setRoomCode] = useState('')
    const [username,setUserName] = useState(localStorage.getItem("storedUserName")? localStorage.getItem("storedUserName"): '')
    return (
        <div className='uno-homepage'>
            <div className='uno-homepage-menu'>
                <img src={require('../../uno-img/uno-logo.png')} width='200px' alt=''/>
                <div className='uno-homepage-form'>
                    <div className='uno-homepage-join'>
                        <input type='text' placeholder="Username" value={localStorage.getItem("storedUserName")? localStorage.getItem("storedUserName"):""} onChange={(event) =>{
                            localStorage.setItem("storedUserName", event.target.value)
                            setUserName(event.target.value)
                        }}  />
                        <input type='text' placeholder='Room Code' onChange={(event) => setRoomCode(event.target.value)} />
                        <Link to={`./play?roomCode=${roomCode}&username=${username}`}><button className="uno-game-button green">JOIN GAME</button></Link>
                    </div>
                   {/*  <h1>OR</h1>
                    <div className='uno-homepage-create'>
                        <Link to={`./play?roomCode=${makeid(5)}`}><button className="uno-game-button orange">CREATE GAME</button></Link>
                    </div> */}
                </div>
                <div className='uno-homepage-back'>

                <a href='/scrimba-project/games/cards'><button className="uno-game-button red">Back to Card Games</button></a>
                </div>
            </div>
        </div>
    )
}

export default UnoLanding