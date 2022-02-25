import React from "react";
import {Link} from "react-router-dom"

function SnakePage(){
    return    <div className="snake-page-options">
            <Link to="/games/snake/snake">Modern snake</Link>
            <Link to="/games/snake/retro">Retro Snake</Link>
            </div>
}

export default SnakePage