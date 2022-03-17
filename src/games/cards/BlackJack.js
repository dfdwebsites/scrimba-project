import React, {useState} from "react";


export default function BlackJack(){
    
    const [deckId, setDeckId] = useState(null)
    const [gameStarted,setGameStarted] = useState(false)
    const [playerHand,setPlayerHand] = useState([])
    const [croupier,setCroupier] = useState([])
    React.useEffect(()=>{

        
    })


    function getValue(value){
        switch(value){
            case "2": value=2
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
    }

    
    function test(){
         drawTwo(playerHand)
         getTotal(playerHand)
        }
        function getTotal(arr){
            arr.map(val=>getValue(val))
            let total = arr.reduce((a,b)=>{
               return a+b
            })
            console.log(total)   
        }
    function getDeck(){
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res=>res.json())
        .then(data=>{
            console.log(data.deck_id)
            setDeckId(data.deck_id)
            setGameStarted(true)
        })
    }
   async function drawTwo(hand){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            hand.push(data.cards[0])
            hand.push(data.cards[1])
            
        })
    }
    function draw(hand){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            hand.push(data.cards[0])
        })   
    }

    return (<>
    <div className="blackJack-container">
        <button disabled={gameStarted} onClick={getDeck}>Start Game</button>
        {gameStarted &&<div>
            <h3>Croupier</h3>
            <div></div>
            <button onClick={draw}>draw 1</button>
            <button onClick={test}>test</button>
            <button onClick={drawTwo}>draw 2</button>
        </div>}
    </div>
    </>)
}