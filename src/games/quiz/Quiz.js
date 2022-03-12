import React , { useState} from 'react'
import Navbar from '../../Navbar'

function Quiz(){
    const [question,setQuestion] = useState({})
    const [gameStarted,setGamesStarted] = useState(false)
    const [answersArray, setAnswersArray] = useState([])
    const [points,setPoints] = useState(0)
    let allAnswers = []
   /*  let timer  */
    function startQuizGame(){
        setGamesStarted(true)
        getQuestions()
        /* timer=setTimeout(gameOver,25000) */
    }
    async function getQuestions(){
        fetch("https://opentdb.com/api.php?amount=1&difficulty=easy")
        .then(res=>res.json())
        .then(data=>{
            setQuestion(data.results[0])
            
        })
    }
    function selectAnswer(e){
        if (e.target.innerHTML===question.correct_answer){
            
            setPoints(prev=>prev+1)
            getQuestions()
           /*  clearTimeout(timer)
            timer=setTimeout(gameOver,25000) */
        }
        else {
            gameOver()
        }
    }

    function gameOver(){
        setPoints(0)
        setGamesStarted(false)
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
             }
             else if(question.type ===  "boolean"){
                 allAnswers = [question.correct_answer,question.incorrect_answers[0]]
                 setAnswersArray(suffle(allAnswers)) 
             }
         }
       
    },[question]) 
    
    return (<>
    
        <Navbar />
        <section className='quiz-game'>
            <h2>DrD's Quiz Game</h2>
            <button onClick={startQuizGame} style={{display:gameStarted?"none":"block"}}>Start Game</button>
            <div id="question" style={{display:gameStarted?"grid":"none"}}>
                <h2 dangerouslySetInnerHTML={{__html: question.question}} />
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[0]}}></div>
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[1]}}></div>
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[2]}}></div>
                <div className='quiz-answer' onClick={selectAnswer} dangerouslySetInnerHTML={{__html: answersArray[3]}}></div>
                <h3>Correct answers : {points}</h3>
            
            

            </div>
        
        </section>
        
    </>
    )
}

export default Quiz