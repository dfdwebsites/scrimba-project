import React from "react";


export default function Answers(props){

    if (props.answers.length = 4){
        return(<>
                <div className='quiz-answer' onClick={props.selectAnswer} dangerouslySetInnerHTML={{__html: props.answers[0]}}></div>
                <div className='quiz-answer' onClick={props.selectAnswer} dangerouslySetInnerHTML={{__html: props.answers[1]}}></div>
                <div className='quiz-answer' onClick={props.selectAnswer} dangerouslySetInnerHTML={{__html: props.answers[2]}}></div>
                <div className='quiz-answer' onClick={props.selectAnswer} dangerouslySetInnerHTML={{__html: props.answers[3]}}></div>
               </> 
        )
    }
    else if (props.answers.length = 2){
        return(<>
            <div className='quiz-answer' onClick={props.selectAnswer} dangerouslySetInnerHTML={{__html: props.answers[0]}}></div>
            <div className='quiz-answer' onClick={props.selectAnswer} dangerouslySetInnerHTML={{__html: props.answers[1]}}></div>
           </> 
    )
    }
}