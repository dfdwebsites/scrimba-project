import React from 'react'


export default function RpgMainGame(){

    const hero={
        name:"Wizard",
        hp:100,
        attack:3,
        img:"../img/wizard.png"
    }
    const monster={
        name:"Orc",
        hp:10,
        attack:1,
        img:""
    }

    function rollTheDice(a){
        const allDice = new Array(a).fill(0).map(item=> {
        return (
            <div className='attack'>
                {Math.floor(Math.random()*6 + 1)}
            </div>
        )})
        
       
        console.log(allDice)
        return allDice
    }


    return (
        <div>
            <div className='char-box'>
                <h3>{hero.name}</h3>
                <img src={hero.img} />
                <p>health: {hero.hp}</p>
                <div className='all-attacks'>
                 { rollTheDice(hero.attack)}
                </div>
            </div>
            <button className='rpg-attack-btn'>attack</button>
        </div>
    )
}