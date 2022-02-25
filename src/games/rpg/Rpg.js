import React from "react";
import RpgMainGame from "./RpgMainGame";



export default function RpgGame(){
    const [startGame,setStartGame]= React.useState(false)
    const [words,setWords] = React.useState("Long time ago...")
    const [intro,setIntro] =React.useState(true)
    
    function loading(){
    
    setTimeout(()=>{
        setWords("There was a little man")
        setTimeout(()=>{
            setWords("that became a LEGEND...")
        },3000)
        },3000)
    setTimeout(()=>setIntro(false),9000)
    }
    
    console.log(intro)
    return (
        <div className="rpg">
          {startGame ? intro?<p className="rpg-intro">{words}{loading()}</p>:<RpgMainGame />:
          <button className="rpg-start-btn" onClick={()=>setStartGame(prev=>!prev)}>
              Start Game</button> }
        </div>
    )
}