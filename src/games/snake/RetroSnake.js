
import React, {useEffect} from "react";


function RetroSnake(){
        const width = 15
    useEffect(()=>{
        const test = document.getElementById("test")
        const scorehtml = document.getElementById("score")
        let score = 0
        let gameOver = false
        let speed = 100
        const box =[]
        let apple=[78]
        let snake = [32,33,34]
        let direction = 1
        
        for (let i=0; i<width*width; i++){
            let cell= document.createElement("div")
            cell.classList.add("grid")
            test.append(cell)
            box.push(cell)
        }
        function update(){
            snake.forEach(cell=>{
                box[cell].classList.add("snake")   
            })
            box[apple[0]].classList.add("apple")
            scorehtml.innerHTML=`Score: ${score}`
        }
        function move(){
            let snakeHead = snake[snake.length - 1]
            let newSnakeHead = snakeHead + direction
            if ((snakeHead % width === width - 1) && direction=== 1){
                newSnakeHead = snakeHead - (width -1)
            }
            else if ((snakeHead % width === 0) && direction=== -1){
                newSnakeHead = snakeHead + (width-1)
            }
            else if((snakeHead+width > width*width) && direction ===width){
                newSnakeHead = snakeHead - width*(width-1) 
            }
            else if((snakeHead-width < 0)&& direction=== -width){
                newSnakeHead = snakeHead +  width*(width-1) 
            }
            isAppleEaten(newSnakeHead)
            isGameOver(newSnakeHead)
            snake.push(newSnakeHead)
            box[snake[0]].classList.remove("snake")
            snake.shift()
            update()
        }
        update()
        let start = setInterval(move, speed)
        
        document.addEventListener("keydown", setDirection)
        function setDirection(e){
            if(e.key==="ArrowUp"){
              direction= direction===width? width:-width
            }
            if(e.key==="ArrowDown"){
              direction= direction===-width? -width: width
            }
            if(e.key==="ArrowLeft"){
              direction= direction===1?1:-1
            }
            if(e.key==="ArrowRight"){
              direction= direction===-1?-1:1
            }
        }
        function isAppleEaten(a){
            if (box[a].classList.contains("apple")){
                    score ++
                    box[a].classList.remove("apple")
                    snake.push(apple)
                    speed = speed*.95
                    clearInterval(start)
                    start = setInterval(move, speed)
                    apple=[getRandom()] 
            }
        }
        function isGameOver(a){
            if (box[a].classList.contains("snake")){
                    gameOver=true
                    clearInterval(start)
            }
        }

        function getRandom(){
            let random = Math.floor(Math.random()*(width*width))
            while (box[random].classList.contains("snake")){
                random =  Math.floor(Math.random()*(width*width))
            }
            return random
        }







        
       return(()=>{
           clearInterval(start)
           console.log("stoped")
       })
    },[])





    return <div>
                <h2>Retro snake with only js</h2>
            <div style={{width:width*30, height:width*30}} id="test" className="board"></div>
                <p id="score">score:</p>
             </div>
}




export default RetroSnake