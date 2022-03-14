import React , { useState} from 'react'
import Navbar from '../../Navbar'

function Quiz(){
    const [question, setQuestion] = useState({})
    const [gameStarted, setGamesStarted] = useState(false)
    const [answersArray, setAnswersArray] = useState([])
    const [points, setPoints] = useState(0)
    const [timeLeft, setTimeLeft] = useState(20)
    /* const [timerOn, setTimerOn] = useState(false) */
    let allAnswers = []
    function startQuizGame(){
        setGamesStarted(true)
        setTimeLeft(20)
        getQuestions()
      
    }
    function getQuestions(){
        fetch("https://opentdb.com/api.php?amount=1&difficulty=easy")
        .then(res=>res.json())
        .then(data=>{
            setQuestion(data.results[0])
            
        })
    }
    function selectAnswer(e){
        if (e.target.innerHTML===question.correct_answer){
            setPoints(prev=>prev+1)
            setTimeLeft(20)
            getQuestions()
        }
        else {
            gameOver()
        }
    }

    function gameOver(){
        setPoints(0)
        /* setTimerOn(false) */
        setGamesStarted(false)
    }

    function clear(ctx) { ctx.clearRect(0, 0, 200, 200); }

    function setTrack(ctx) {
      ctx.strokeStyle = 'hsla(2, 8%, 46%, 0.45)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(100, 100, 80, 0, Math.PI*2);
      ctx.stroke();
    }
  
    function setTimeOuter(ctx, until, now, total) {
        ctx.strokeStyle = 'green';
        if (now <= total/2){
            ctx.strokeStyle = "orange"
        }
        if (now <= total/4){
            ctx.strokeStyle = "red"
        }
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(
        100,
        100,
        80,
        Math.PI/-2,
        ( Math.PI * 2 ) * (( until - now % total ) / total ) + ( Math.PI / -2 ),
        true
      );
      ctx.stroke();
    }


    React.useEffect(()=>{
        const timerCanvas = document.getElementById("timerCanvas")
        const timerCtx = timerCanvas.getContext('2d')
        timerCtx.width = timerCanvas.width = 200
        timerCtx.height = timerCanvas.height = 200
        clear(timerCtx)
        setTrack(timerCtx)
        setTimeOuter(timerCtx, 20, timeLeft , 20)

    },[timeLeft])

    React.useEffect(()=>{
        let timerInterval = null
       
        if (gameStarted){
            timerInterval= setInterval(()=>{
                setTimeLeft(prev=>{
                    
                    if (prev===0){
                       return gameOver()
                    }
                    else return prev - 1
                })               
            },1000)
        }
        else clearInterval(timerInterval)

        return ()=>clearInterval(timerInterval)
    },[gameStarted])

     function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
     }
     
     React.useEffect(()=>{
       
        function suffle(arr){
            let shuffled = arr
            .map(value => ({ value, sort: Math.random() })) // making the items of the array into onjs giving them random rumber 
            .sort((a, b) => a.sort - b.sort) // then sort them in order of the random number
            .map(({ value }) => value) //then destructure the objects to just the value they had before
            return shuffled   //return the suffled array
        }
         if (question){

             if (question.type ===  "multiple"){
                 allAnswers = [question.correct_answer,question.incorrect_answers[0],question.incorrect_answers[1],question.incorrect_answers[2]]
                setAnswersArray(suffle(allAnswers))
                document.querySelector("#question div:nth-child(4)").style.display= "flex"
                 document.querySelector("#question div:nth-child(5)").style.display= "flex"
             }
             else if(question.type ===  "boolean"){
                 allAnswers = [question.correct_answer,question.incorrect_answers[0]]
                 setAnswersArray(suffle(allAnswers)) 
                 document.querySelector("#question div:nth-child(4)").style.display= "none"
                 document.querySelector("#question div:nth-child(5)").style.display= "none"
             }
         }
       

    },[question]) 
    
    return (<>
    
        <Navbar />
        <section className='quiz-game'>
            <h2 className='quiz-page-title'>DrD's Quiz Game</h2>
            <button className='start-quiz-btn' onClick={startQuizGame} style={{display:gameStarted?"none":"block"}}>Start Game</button>
            <div id="question" style={{display:gameStarted?"grid":"none"}}>
                <h2 dangerouslySetInnerHTML={{__html: question.question}} />
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[0]}}></div>
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[1]}}></div>
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[2]}}></div>
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[3]}}></div> 
                <h3>Correct answers : {points}</h3>
            </div>
            <div style={{display:gameStarted?"block":"none"}} id='timer'>
                <div className="base-timer">
                    <canvas id='timerCanvas'></canvas>
                    <span id="base-timer-label" className="base-timer__label">{formatTime(timeLeft)}</span>
                </div>
            </div>
        </section>
        
    </>
    )
}

export default Quiz