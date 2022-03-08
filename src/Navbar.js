import React, {useEffect} from "react";
import { NavLink} from 'react-router-dom'



function Navbar(props,ref){
    const [click,setClick]= React.useState(false)
       function clickNav(){
           setClick(prev=> !prev)
       }
    useEffect(()=>{
        const navBar = document.getElementById("nav") 
         click ? navBar.classList.add("clicked"):
         navBar.classList.remove("clicked")
    },[click])
   
    let path = window.location.pathname
    return(
            <div ref={ref} id="nav" className={`navbar-container clicked ${path==="/scrimba-project/"? "homepage": ""}`}>
                    <img className="nav-logo" src="./img/logo.png" alt="logo"/>
                     < div onClick={clickNav} id="navBtn" className="nav-toggle">
                         <span className="hamburgerLine line1"></span>
                         <span className="hamburgerLine line2"></span>
                         <span className="hamburgerLine line3"></span>
                         </div>  
                <nav >
                    <ul>
                        <NavLink onClick={clickNav} to="/">Home</NavLink>
                        <NavLink onClick={clickNav} to="/css">Css</NavLink>
                        <NavLink onClick={clickNav} to="/js">Javascript</NavLink>
                        <NavLink onClick={clickNav} to="/games">Games</NavLink>
                    </ul>
                </nav>
            </div>
        
    )
}
export default React.forwardRef(Navbar)