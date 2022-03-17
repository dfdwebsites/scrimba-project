import React from "react";
import {Link} from "react-router-dom"
import Navbar from "../../components/Navbar"

function SnakePage(){
    return   <>
                 <Navbar />
            <div className="snake-page-options">
                <Link to="/games/snake/snake">Modern snake</Link>
                <Link to="/games/snake/retro">Retro Snake</Link>
            </div>
    </> 
}

export default SnakePage