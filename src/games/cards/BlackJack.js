import React, {useState, useRef} from "react";


export default function BlackJack(){
    const croupierRef = useRef(null)
    const playerRef = useRef(null)
    const [deckId, setDeckId] = useState(null)
    const [gameStarted,setGameStarted] = useState(false)
    const [playerHand,setPlayerHand] = useState([])
    const [croupier,setCroupier] = useState([])
    const [message , setMessage] = useState('')
    const [total,setTotal] = useState(0)
    //const [croupierTotal,setCroupierTotal] = useState([])
    const [croupierTotalPoints,setCroupierTotalPoints] = useState(0)
    const [playerTurn,setPlayerTurn] = useState(true)
    const [roundOver, setRoundOver] = useState(false)
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

    //init game
    React.useEffect(()=>{
        if (gameStarted){
            croupierDraw()
            playerDraw()
        }
    },[gameStarted])

    function restart(){
        document.querySelector(".blackCroupierCards").innerHTML=""
        document.querySelector(".blackPlayerCards").innerHTML=""
        for(let i=0; i=playerHand.length; i++){
            playerHand.pop()
        }
        for(let j=0; j=croupier.length; j++){
            croupier.pop()
        }
        setMessage('')
        setTotal(0) 
        setCroupierTotalPoints(0)
        setPlayerTurn(true)
        setRoundOver(false)
        croupierDraw()
        playerDraw()
    }
    //hide croupiers second card
    React.useEffect(()=>{
    if (croupier.length>0){
        document.querySelector(".blackCroupierCards img:nth-child(2)").style.display=playerTurn? "none" : "inline-block"
    }  
    },[playerTurn])
     
    //get deck
    function getDeck(){
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res=>res.json())
        .then(data=>{
            
            setDeckId(data.deck_id)
            setGameStarted(true)
        })
    }


     function croupierDraw(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
 
            croupier.push(data.cards[0])
            croupier.push(data.cards[1])
            let newvalue = getValue(data.cards[0].value) + getValue(data.cards[1].value)
            
            let croupierHtml = croupier.map((card)=>{
               return `<img src=${card.image} />`
             })
           
             croupierRef.current.innerHTML= croupierHtml.join("")
            //setCroupierTotalPoints(croupierTotal.reduce((prev,cur)=>prev+cur))
            setCroupierTotalPoints(newvalue)
            document.querySelector(".blackCroupierCards img:nth-child(2)").style.display="none" 
            
            
        }).catch(err=>console.log(err))
    }


    function croupierDrawOne(a){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res=>res.json())
        .then(data=>{
            
            croupier.push(data.cards[0])
            let newvalue = getValue(data.cards[0].value)
            let newTotal = a + newvalue
            let croupierHtml = croupier.map((card)=>{
               return `<img src=${card.image} />`
             })
           
             croupierRef.current.innerHTML= croupierHtml.join("")
            setCroupierTotalPoints(newTotal)

            if(newTotal <=16){
                croupierDrawOne(newTotal)
            }
            else if( newTotal>21){
                setRoundOver(true)
                setMessage("Player Wins!")
                console.log("player WINS")
            }
            else{
                setRoundOver(true)
                checkWinner(total,newTotal)
            }
        }).catch(err=>console.log(err))
    }
    function playerDraw(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
 
            playerHand.push(data.cards[0])
            playerHand.push(data.cards[1])
            let newvalue = getValue(data.cards[0].value) + getValue(data.cards[1].value)
            let imgHtml = playerHand.map((card)=>{
               return `<img src=${card.image} />`
             })
           
             playerRef.current.innerHTML= imgHtml.join("")
            setTotal(newvalue)
        }).catch(err=>console.log(err))
    }
    function draw(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res=>res.json())
        .then(data=>{
            playerHand.push(data.cards[0])
            let newvalue = getValue(data.cards[0].value)
            let newTotal = total + newvalue
            let imgHtml = playerHand.map((card)=>{
               return `<img src=${card.image} />`
             })
           
            playerRef.current.innerHTML= imgHtml.join("")
            setTotal(newTotal)
            if (newTotal>21){
                setRoundOver(true)
                setMessage("House Wins")
                console.log("House Wins")
            }
        }).catch(err=>console.log(err))      
    }
    function changeTurn(){
        setPlayerTurn(false)
        if (croupierTotalPoints <= 16){
            croupierDrawOne(croupierTotalPoints)
        }
        else{
            setRoundOver(true)
            checkWinner(total, croupierTotalPoints)
        }
    }

    function checkWinner(total, croupierTotalPoints){
         if(total>croupierTotalPoints){
            setMessage("Player Wins!")
           return console.log("Player Wins")
        }
        else if(croupierTotalPoints===total){
            setMessage("House Wins")
           return console.log("House Wins")
        }
        else if(croupierTotalPoints>total){
            setMessage("House Wins")
           return console.log("House Wins")
        }
    }
    return (<>
    <div className="blackJack-container">
        <button disabled={gameStarted} onClick={getDeck}>Start Game</button>
        {gameStarted &&<div>
           {playerTurn &&<div>
               <button onClick={draw}>draw 1</button>
               <button onClick={changeTurn}>stay</button>
             </div>}
            <div className="blackCroupierInfo">
            <h3>Croupier</h3>
            <div ref={croupierRef} className="blackCroupierCards"></div>
            {!playerTurn && <p>total: {croupierTotalPoints}</p>}
            </div>
            <div className="blackPlayerInfo">
            <h3>Player</h3>
            <div ref={playerRef} className="blackPlayerCards"></div>
            <p>total: {total}</p>
            {roundOver && <div>
                
                <h1>{message}</h1>
                <button onClick={restart}>New Round</button>
                
                
                </div>}
            </div>
        </div>}
    </div>
    </>)
}