import React from 'react'
import Navbar from './components/Navbar'
import MemeGenerator from './components/MemeGenerator'

export default function JavaScript(){
    
    const [advanceNumber, setAvdanceNumber] = React.useState("0")
    const [advanceTotal,setAdvanceTotal] = React.useState(0)
    const imagesArray= ['./img/1.jpg','./img/2.jpg','./img/3.jpg' ]
    const [activeImage,setActiveImage] = React.useState(0)

    function adIncrease(){
        setAdvanceTotal(prev=>prev+1)
     }
    function adDecrease(){
        setAdvanceTotal(prev=>prev-1)
     }
     function swipeLeft(){
         setActiveImage(prev=> prev-1)
         if (activeImage === 0){
            setActiveImage((imagesArray.length - 1))
         }
     }
     function swipeRight(){
        setActiveImage(prev=> prev+1)
         if (activeImage === imagesArray.length - 1 ){
           setActiveImage(0)
         }
     }
    React.useEffect(()=>{
        window.scrollTo(0,0)  
    },[])
    
    React.useEffect(()=>{
        if (advanceTotal!==0 && (advanceTotal % 3 === 0) && (advanceTotal % 5 === 0)){
            setAvdanceNumber("fizz&fuzz")
         }
        else if (advanceTotal!==0 && advanceTotal % 3 === 0){
             setAvdanceNumber("fizz")
         }
        else if (advanceTotal!==0 && advanceTotal % 5 === 0){
             setAvdanceNumber("fuzz")
         }
         else setAvdanceNumber(`${advanceTotal}`)

    },[advanceTotal])
    React.useEffect(()=>{
        const seiresBody = document.getElementById("series-body")
        const submit = document.getElementById("form")
        


        async function getShow(query){
            let result = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
            let data = await result.json()
            return data
        }


        submit.addEventListener("submit", event =>{
            event.preventDefault()
            let ourFormData = new FormData(event.target)
            let searchShow = ourFormData.get("show")
            getShow(searchShow).then(show =>{
            let newShow = show.map(show=> {return show.show})
            displayAllShows(newShow)
           

            }).catch(e=>{
            console.log(e)
            seiresBody.innerHTML= `Something went wrong with the search, try diferent name`
            })
        document.getElementById("text").value = ""
        })
        function displayShow(show){
            if(show.image){
                return`<div class="show">
                <div class="series-title">${show.name}</div>
                <div class="series-img"><a href="${show.url}" target="_blank"><img src="${show.image.original}"></a></div>
                <div class="series-summary">${show.summary}</div>
                </div>`}
            else { 
                return`<div class="show">
                <div class="series-title">${show.name}</div>
                <div class="series-img"><a href="${show.url}" target="_blank"><img src="https://picsum.photos/200/300"></a></div>
                <div class="series-summary">${show.summary}</div>
                </div>`
            }       
        }

        function displayAllShows(allShows){
        seiresBody.innerHTML= `${allShows.map(displayShow).join("")}`}
    })
return <>
    <Navbar />
    <div className='section-hero js-page'>
        <h2 className='page-title'>JavaScript</h2>
    </div>
    <section className='js-content'>
    <h2>The amazing World of JS</h2>
    <p>Limit is the sky and your imagination of what you can do with this 
        programming language.In Front-End Carrieer Path we took a deep dive in 
        JS and learn the basic functions and methods.
    </p>
    <div className='counter-container'>
        <h3>We learn how to create a single counter app </h3> 
        <div className='counter'>
            {advanceNumber}
            <button onClick={adIncrease} className='counter-btn plus'>+</button>
            <button onClick={adDecrease} className='counter-btn minus'>-</button>
        </div>
        <p>that displays fiz if the division with number 3 is perfect division or fuzz for the division with number 5 learning this way that you can manipulate the DOM however you like.</p>
    </div>
    <div className='carousel-container'>
        <h3>How to make a carrousel of images</h3>
        <div className='carousel-img-container'>
            <img src={imagesArray[activeImage]} alt='image of a movie' />
            <button onClick={swipeLeft} className='carousel-btn left'>{"<"} </button>
            <button onClick={swipeRight} className='carousel-btn right'> {">"} </button>
        </div>
    </div>
    <MemeGenerator />
    <div className='form-container'>
        <br/>
        <h3>How to get data from APIs</h3>
        <p className='api-description'>Seach for a Tv Series below</p>
        <form className='seriesSearchForm'id="form" action="#" method="post">
        <input name="show" id ="text" type="text" placeholder="Search for a Show" />
        <button type="submit" >search</button>
        </form>
        <div id="series-body"></div>
    </div>
    
    
    <div className='react'>
        <h2>React</h2>
        <p>Then we jump to the limitless world of js libraries with one of them is fantastic ReactJS API</p>
        <p>A complete course learning you the basics to create a React App but also advance classes that help you build
            full multy page Website/ applications. I dont think I need to show any examples of React since this hole website is created by it
        </p>
    </div>
    </section>
    </>
}