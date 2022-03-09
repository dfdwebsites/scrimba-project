import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
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
       
        function getColorBackground(){
            if (window.scrollY > window.innerHeight- (window.innerHeight * 0.2)){
                navbarRef.current.classList.add("getcolor")
            }
            else navbarRef.current.classList.remove("getcolor")
        }
        window.addEventListener("scroll",getColorBackground)   
        
         

       return ()=>{
           window.removeEventListener("scroll",getColorBackground)
       }
    },)
return (
    <>
       
        <Navbar ref={navbarRef} />
        
        <main>
        <img ref={imgRef} className='logo-anim' src="./img/logo.png" alt='logo of DRD'/>
        <Matrix />
        <h1 className='hero-title'>Welcome to,<br/>  Srimba Showcase!
        </h1>
        <section className='home-content'>
        <h2>Lets talk about web learning</h2>
        <p>There are many ways to use the internet in our days, you can learn skills that can help you from an ordinary daily problem that you may have at that time 
        to qualify for a job at that area. There are many sources to learn code online but Scrimba's courses have a <strong>massive</strong> advandange over the others and this is their amazing platform
        </p>
        <div>
        <img src='./img/scrimba-platform.png' alt='scrimba platform' />
        <p className='img-details'>This is how scrimba platform is looking</p>
        </div>
        <p>Scrimba's platform allows the students to interact live with the code and watching live the changes that they apply. This gives the oportunity to play around and test untill you fully understand the project before you go on
            since people are learning in different speeds.</p>
            <h2> HTML5 && CSS3</h2>
            <p>These 2 make the main structure for all websites. HTML is the language that shows the data and CSS is the one that determines of their looks (color,size, etc..)</p>
            <Link to="/css"><img className='img-link' src='./img/css-title.png' alt='code of css in the background and logo '/> </Link>
            <p>In the awsome <strong>Front-End Carrier Path</strong> course you learn everything you need to know so you can start working with HTML and CSS
                you can take a closer look what you can achive <Link className='link-to-css' to="/css">here</Link>.
            </p>
            <h2> JavaScript </h2>
            <p>JavaScript often abbreviated JS is bread and butter of websites that interact with the user. JS can  can calculate, manipulate and validate data ,update and change both HTML and CSS  </p>
            <Link to="/js"> <img className='img-link' src='./img/js-title.png' alt='code of js in the background and logo '/></Link>
            <p><strong>Front-End Carrier Path</strong> will provide you with the basic skills you need so you can 
            create impresive interactions with the user on your project and create a dynamic website overall</p>
            <p>You can check few of the skills <Link className='link-to-css' to="/js">here</Link>.</p>
            <h2> Games </h2>
            <p>This is where the fun begins and why I think <strong>Front-End Carrier Path</strong> of Scrimba has amazing results.
             We are creating little fun games using JS in order to learn and understand more complex fuctions and methods of the language and since we are doing it in this fun way keeps the learing fun and 
             easy. </p>
             <p><Link className='link-to-css' to="/games">Here</Link> is some of the projects we did in the course and more</p>
        </section>

    </main>

    </> )        
}