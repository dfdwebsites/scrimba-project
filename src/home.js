import React, {useRef} from 'react'
import Navbar from './Navbar'
import Matrix from './Matrix'
import { gsap } from "gsap"


export default function Home(){
    const imgRef = useRef();
    const navbarRef = useRef()
    const hasPlayed = sessionStorage.getItem("hasMyAnimationPlayed")
    
    React.useLayoutEffect(()=>{
        if (!hasPlayed){
            gsap.to(imgRef.current,{
                left:"50%",
                delay:3,
                duration:1,
            })
            gsap.to(imgRef.current,{
                opacity:0,
                delay:5,
                duration:1,
            })
            gsap.from(navbarRef.current, {
                y:-100,
                delay:5
            })
            gsap.from((".hero-title"), {
                opacity:0,
                delay:6,
                onComplete: function() {
                    sessionStorage.setItem("hasMyAnimationPlayed", true);
                  }
            })
        }
        
    },)

return (
    <>
        <header className="App-header">
        <Navbar ref={navbarRef} />
        </header>
        <main>
        <img ref={imgRef} className='logo-anim' src="./img/logo.png" alt='logo of DRD'/>
        <Matrix />
        <h1 className='hero-title'>Welcome to Srimba<br/>Showcase!
        </h1>
        <section className='home-content'>
        <h2>lets talk about web learning</h2>
        </section>

    </main>

    </> )        
}