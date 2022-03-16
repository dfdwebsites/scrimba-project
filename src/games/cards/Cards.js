import React from "react";
import { Link} from 'react-router-dom'
import Navbar from "../../Navbar";


export default function Cards(){
    return (
        <>
        <Navbar />
        <div className="snake-page-options black">

            <Link className="black-btn" to="/games/cards/blackJack"> BlackJack </Link>
            <Link className="uno-btn" to="/games/cards/uno">UNO</Link>
            <Link to="/games/cards/war"> War </Link>
        
        
        </div>
        </>
    )
}