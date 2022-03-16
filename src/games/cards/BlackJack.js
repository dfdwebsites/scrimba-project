import React from "react";


export default function BlackJack(){
    let deckId

    React.useEffect(()=>{

        
    })
    function getDeck(){
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
        .then(res=>res.json())
        .then(data=>{
            console.log(data.deck_id)
            deckId = data.deck_id
        })
    }
    function drawTwo(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            
        })
    }
    function draw(){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            
        })   
    }

    return (<>
    <div className="blackJack-container">
        <button onClick={getDeck}>get Deck</button>
        <button onClick={draw}>draw 1</button>
        <button onClick={drawTwo}>draw 2</button>
    </div>
    </>)
}