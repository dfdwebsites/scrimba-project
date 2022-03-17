import React from 'react'

export default function MemeGenerator(){

    const [meme,setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
      })
      
      const [allMemes,setallMemes] = React.useState([])
      
      React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>{
          setallMemes(data.data.memes)
        })
      },[])
      
      function getImage(){
            
            const randomNumer = Math.floor(Math.random()* allMemes.length + 1)
            const  newUrl = allMemes[randomNumer].url
            
            setMeme(prev=>{
                  return { ...prev,
                  randomImage: newUrl}
                })
            console.log(randomNumer)
        }
    
        function changeMeme(event){
          setMeme(prevState=>{
            return{
                ...prevState,
                [event.target.name]:event.target.value
            }
    
          })
    
        }
    
    
      return (
        <>
            <h3>How to create a meme Generator </h3> 
            <div className="memes-form">
                <input 
                type="text" 
                placeholder='text up' 
                name='topText' 
                onChange={changeMeme}
                value={meme.topText}
                />
                <input 
                type="text" 
                placeholder='text down'
                 name='bottomText' 
                 onChange={changeMeme}
                 value={meme.bottomText}
                 />
                <button onClick={getImage} className='memes-btn'>Get a new meme image 🖼</button>
            </div>
            <div className='memes-img-container'>
                <img className='meme-img' src={meme.randomImage}/>
                <h2 className='meme-text top'>{meme.topText}</h2>
                <h2 className='meme-text bottom'>{meme.bottomText}</h2>
            </div>
        </>
      );
    }