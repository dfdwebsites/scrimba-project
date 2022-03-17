import React, {useState} from "react";


export default function BlackJack(){
    
    const [deckId, setDeckId] = useState(null)
    const [gameStarted,setGameStarted] = useState(false)
    const [playerHand,setPlayerHand] = useState([])
    const [croupier,setCroupier] = useState([])
    const [playerTotal,setPlayerTotal] = useState([])
    const [total,setTotal] = useState(0)
    const [croupierTotal,setCroupierTotal] = useState([])
    const [croupierTotalPoints,setCroupierTotalPoints] = useState(0)
    const [playerTurn,setPlayerTurn] = useState(true)
    function getValue(value){ 
        switch(value){
            case "2": value= 2
            break
            case "3": value=3
            break
            case "4": value=4
            break
            case "5": value=5
            break
            case "6": value=6
            break
            case "7": value=7
            break
            case "8": value=8
            break
            case "9": value=9
            break
            case "10": value=10
            break
            case "JACK": value=10
            break
            case "QUEEN": value=10
            break
            case "KING": value=10
            break
            case "ACE": value=11
            break
        }
        return value
    }
    React.useEffect(()=>{
        croupierDraw()
        playerDraw()
    },[gameStarted])
    React.useEffect(()=>{
    if (croupier.length>0){
        document.querySelector(".blackCroupierCards img:nth-child(2)").style.display=playerTurn? "none" : "inline-block"
    }  
    if (!playerTurn){
     croupierDrawOne()   
    }
    },[playerTurn])
     
    
    function getDeck(){
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res=>res.json())
        .then(data=>{
            
            setDeckId(data.deck_id)
            setGameStarted(true)
        })
    }
    async function croupierDraw(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
 
            croupier.push(data.cards[0])
            croupier.push(data.cards[1])
            croupier.map((card, i)=>{
                croupierTotal[i] = (getValue(card.value))   
            })
            let croupierHtml = croupier.map((card)=>{
               return `<img src=${card.image} />`
             })
           
            document.querySelector(".blackCroupierCards").innerHTML= croupierHtml.join("")
            setCroupierTotalPoints(croupierTotal.reduce((prev,cur)=>prev+cur))
            document.querySelector(".blackCroupierCards img:nth-child(2)").style.display=playerTurn? "none" : "inline-block"
            
        }).catch(err=>console.log(err))
    }
    async function croupierDrawOne(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res=>res.json())
        .then(data=>{
 
            croupier.push(data.cards[0])
            croupier.push(data.cards[1])
            croupier.map((card, i)=>{
                croupierTotal[i] = (getValue(card.value))   
            })
            let croupierHtml = croupier.map((card)=>{
               return `<img src=${card.image} />`
             })
           
            document.querySelector(".blackCroupierCards").innerHTML= croupierHtml.join("")
            setCroupierTotalPoints(croupierTotal.reduce((prev,cur)=>prev+cur))
            let points = croupierTotalPoints
        }).catch(err=>console.log(err))
    }
    async function playerDraw(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
 
            playerHand.push(data.cards[0])
            playerHand.push(data.cards[1])
            playerHand.map((card, i)=>{
                playerTotal[i] = (getValue(card.value))   
            })
            let imgHtml = playerHand.map((card)=>{
               return `<img src=${card.image} />`
             })
           
            document.querySelector(".blackPlayerCards").innerHTML= imgHtml.join("")
            setTotal(playerTotal.reduce((prev,cur)=>prev+cur))
        }).catch(err=>console.log(err))
    }
    function draw(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res=>res.json())
        .then(data=>{
            playerHand.push(data.cards[0])
            playerHand.map((card, i)=>{
                playerTotal[i] = (getValue(card.value))   
            })
            let imgHtml = playerHand.map((card)=>{
               return `<img src=${card.image} />`
             })
           
            document.querySelector(".blackPlayerCards").innerHTML= imgHtml.join("")
            setTotal(playerTotal.reduce((prev,cur)=>prev+cur))
        }).catch(err=>console.log(err))      
    }
    function changeTurn(){
        setPlayerTurn(false)
    }
    
    return (<>
    <div className="blackJack-container">
        <button disabled={gameStarted} onClick={getDeck}>Start Game</button>
        {gameStarted &&<div>
            <button onClick={draw}>draw 1</button>
            <button onClick={changeTurn}>stay</button>
            <div className="blackCroupierInfo">
            <h3>Croupier</h3>
            <div className="blackCroupierCards"></div>
            {!playerTurn && <p>total: {croupierTotalPoints}</p>}
            </div>
            <div className="blackPlayerInfo">
            <h3>Player</h3>
            <div className="blackPlayerCards"></div>
            <p>total: {total}</p>
            </div>
        </div>}
    </div>
    </>)
}