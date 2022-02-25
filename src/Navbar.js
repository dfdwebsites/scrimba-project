import React from "react";
import {Link, NavLink} from 'react-router-dom'
/* import {logo} from "./logo.png" */



function Navbar(){



    return(
        
            <nav>
                <img className="nav-logo" src="./img/logo.png"/>
                <ul>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/css">Css</NavLink>
                    <NavLink to="/js">Javascript</NavLink>
                    <NavLink to="/games">Games</NavLink>
                </ul>
            </nav>
        
    )
}
export default Navbar