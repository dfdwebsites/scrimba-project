import React from "react";
import { Link} from 'react-router-dom'
import Navbar from "../../components/Navbar";


export default function Cards(){
    return (
        <>
        <Navbar />
        <div className="allCards">

            <Link className="black-btn-main" to="/games/cards/blackJack"> BlackJack </Link>
            <Link className="uno-btn" to="/games/cards/uno">UNO</Link>
            <Link className="war-btn"to="/games/cards/war"> War </Link>
        
        </div>
        </>
    )
}