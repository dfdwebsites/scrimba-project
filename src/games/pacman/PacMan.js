import React, {useEffect, useRef} from "react";
import Navbar from "../../components/Navbar";

function PacMan(){

    const pacManCanvasRef = useRef(null)
    
    useEffect(()=>{
        
        const ctx = pacManCanvasRef.current.getContext("2d")

        const CANVAS_WIDTH = pacManCanvasRef.current.width = 900
        const CANVAS_HEIGHT = pacManCanvasRef.current.height  = 900
        ctx.width = CANVAS_WIDTH
        ctx.height = CANVAS_HEIGHT
        const ghostSpeed=1
        const speed = 1
        const pacImg = new Image()
        pacImg.src = "../img/pac-manAtlas.png"
        const gameWidth =CANVAS_WIDTH/28
        const gameHeight =CANVAS_HEIGHT/28
        let gameFrame = 0
        const staggerFrammes = 20
        
        
        //frame animations
        
        function createAnims(ny){
            const redGhostFrame=[]
            for (let i=0; i<8; i++){
                let loc={
                    x: 336 + 16 * i,
                    y: ny
                }
                redGhostFrame.push(loc)
            }    
            let arr=[]
            arr["movingRight"]=[redGhostFrame[0],redGhostFrame[1]]
            arr["movingLeft"]=[redGhostFrame[2],redGhostFrame[3]]
            arr["movingUp"]=[redGhostFrame[4],redGhostFrame[5]]
            arr["movingDown"]=[redGhostFrame[6],redGhostFrame[7]]

            return arr
        }



        const redGhostAnim= createAnims(81)
        const yellowGhostAnim= createAnims(129)
        const pinkGhostAnim= createAnims(97)
        const blueGhostAnim = createAnims(113)
        const pacmanAnimation =[]
        const states=[{
                name:"eating",
                frames:{
                    loc:[{
                            x:338,
                            y:16
                        },
                        {
                            x:338,
                            y:0
                        },
                        {
                            x:354,
                            y:0
                        }
                        ]
                    }
            },
            {
                name:"eatingLeft",
                frames:{
                    loc:[{
                            x:338,
                            y:16
                        },
                        {
                            x:402,
                            y:0
                        },
                        {
                            x:418,
                            y:0
                        }
                        ]
                    }
            },
            {
                name:"eatingTop",
                frames:{
                    loc:[{
                            x:338,
                            y:16
                        },
                        {
                            x:370,
                            y:0
                        },
                        {
                            x:386,
                            y:0
                        }
                ]
                }
            },
            {
                name:"eatingBot",
                frames:{
                    loc:[{
                            x:338,
                            y:16
                        },
                        {
                            x:434,
                            y:0
                        },
                        {
                            x:450,
                            y:0
                        }
                ]
                }
            } 
    ]
    states.map((state,index)=>{
        pacmanAnimation[state.name] = state.frames
    })
    const allfoods= []
    const allWalls =[]
    const powerUps=[]
    const ghosts=[]
    
    

    class Player {
       constructor(arr){
           this.width= gameWidth * 0.95
           this.height= gameHeight * 0.95
           this.x=14*gameWidth+speed
           this.y=17*gameHeight+speed
           this.radius = 10

           this.dir={
               x:0,
               y:0 
            }
            this.stateFrame= "eatingLeft"
            this.arr = arr
       } 
       update(pos){
           this.x = this.x + this.dir.x
           this.y = this.y + this.dir.y
           if (this.x >= CANVAS_WIDTH){
               this.x = 0
           }
           if (this.x < 0){
               this.x = CANVAS_HEIGHT
           }

           this.draw(this.arr[this.stateFrame].loc[pos].x,this.arr[this.stateFrame].loc[pos].y)
       }
       draw(frameX, frameY){
        ctx.drawImage(pacImg, frameX , frameY, 14, 15, this.x, this.y ,this.width, this.height)
       }
    }
  
    class Ghost {
        constructor(x,y,arr){
            this.x= x + gameWidth / 2
            this.y= y + gameWidth / 2
            this.radius = 12
            this.width= 24
            this.height= 24
            this.dir={
                x:0,
                y:-1 
             }
            this.stateFrame= "movingRight"
            this.prevCollisions = []
            this.arr = arr
        } 
        update(pos){
            this.draw(this.arr[this.stateFrame][pos].x,this.arr[this.stateFrame][pos].y)
            this.x = this.x + this.dir.x
            this.y = this.y + this.dir.y
            if (this.x >= CANVAS_WIDTH){
                this.x = 0
            }
            if (this.x < 0){
                this.x = CANVAS_HEIGHT
            }
            //this.draw()
        }
        draw(frameX, frameY){
            //draw(){
         ctx.drawImage(pacImg, frameX , frameY, 16, 13, this.x-this.radius , this.y-this.radius ,this.width, this.height)
       /*   ctx.beginPath()
         ctx.fillStyle="orange"
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
         ctx.fill() 
         ctx.closePath()    */
        }
     }

     const Pinky = new Ghost(gameWidth*15,gameHeight*15,pinkGhostAnim)
     const Blinky = new Ghost(gameWidth*12,gameHeight*15,redGhostAnim)
     const Clide = new Ghost(gameWidth*15,gameHeight*13,yellowGhostAnim)
     const Inky = new Ghost(gameWidth*12,gameHeight*13,blueGhostAnim)
     ghosts.push(Pinky,Blinky,Clide,Inky)
     
    const PacMan = new Player(pacmanAnimation)
    const keys ={
        up:{
            pressed:false
        },
        down:{
            pressed:false
        },
        right:{
            pressed:false
        },
        left:{
            pressed:false
        }
    }
    let lastkey = ""
    window.addEventListener("keydown", (e)=>{
        if(e.key==="ArrowUp"){
            keys.up.pressed = true
            
            lastkey = "up"
        }
        if(e.key==="ArrowDown"){
            keys.down.pressed = true
           
            lastkey = "down"
        }
        if(e.key==="ArrowLeft"){
            keys.left.pressed = true
            
            lastkey = "left"
        }
        if(e.key==="ArrowRight"){
            keys.right.pressed = true
            
            lastkey = "right"
        }
    })
    window.addEventListener("keyup", (e)=>{
        if(e.key==="ArrowUp"){
            keys.up.pressed = false
        }
        if(e.key==="ArrowDown"){
            keys.down.pressed = false
        }
        if(e.key==="ArrowLeft"){
            keys.left.pressed = false
        }
        if(e.key==="ArrowRight"){
            keys.right.pressed = false
        }
    })
    const pacManMap=[
                ["1","=","=","=","=","=","=","=","=","=","=","=","=","^","^","=","=","=","=","=","=","=","=","=","=","=","=","2"],//
                ["|","!","!","!","!","!","!","!","!","!","!","!","!","[","]","!","!","!","!","!","!","!","!","!","!","!","!",'|'],//
                ['|',"!","1","=","=","2","!","1","=","=","=","2","!","[","]","!","1","=","=","=","2","!","1","=","=","2","!",'|'],//
                ['|',"@","|"," "," ","|","!","|"," "," "," ","|","!","[","]","!","|"," "," "," ","|","!","|"," "," ","|","@",'|'],//
                ['|',"!","3","=","=","4","!","3","=","=","=","4","!","3","4","!","3","=","=","=","4","!","3","=","=","4","!","|"],//
                ['|',"!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!",'|'],//
                ['|',"!","1","^","^","2","!","1","^","^","^","^","^","^","^","^","^","^","^","^","2","!","1","^","^","2","!","|"],//
                ["|","!","3",".",".","4","!","3",".",".",".",".","."," "," ",".",".",".",".",".","4","!","3",".",".","4","!","|"],//
                ['|',"!","!","!","!","!","!","!","!","!","!","!","!","[","]","!","!","!","!","!","!","!","!","!","!","!","!",'|'],//
                ["[","=","=","=","=","2","!","1","^","=","=","=","!","3","4","!","=","=","=","^","2","!","1","=","=","=","=","]"],//
                ["|"," "," "," "," ","|","!","[","]"," "," "," "," "," "," "," "," "," "," ","[","]","!","|"," "," "," "," ","|"],//
                ["|"," "," "," "," ","|","!","[","]"," ","1","+","+","+","+","+","+","2"," ","[","]","!","|"," "," "," "," ","|"],//
                ["3","=","=","=","=","4","!","3","4"," ","|","+","+","+","+","+","+","|"," ","3","4","!","3","=","=","=","=","4"],//
                [" "," "," "," "," "," ","!","!","!"," ","|","+","+","+","+","+","+","|"," ","!","!","!"," "," "," "," "," "," "],//
                ["1","=","=","=","=","2","!","1","2"," ","|","+","+","+","+","+","+","|"," ","1","2","!","1","=","=","=","=","2"],
                ["|"," "," "," "," ","|","!","[","]"," ","|","+","+","+","+","+","+","|"," ","[","]","!","|"," "," "," "," ","|"],
                ["[","=","=","=","=","4","!","3","4"," ","3","=","=","=","=","=","=","4"," ","3","4","!","3","=","=","=","=","]"],
                ["|","!","!","!","!","!","!","!","!"," "," "," "," "," ","c"," "," "," "," ","!","!","!","!","!","!","!","!","|"],
                ["|","!","1","^","^","2","!","1","^","^","^","2","!","1","2","!","1","^","^","^","2","!","1","^","^","2","!","|"],
                ["|","!","3","."," ","]","!","3",".",".",".","4","!","3","4","!","3",".",".",".","4","!","["," ",".","4","!","|"],
                ["|","@","!","!","[","]","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","[","]","!","!","@","|"],
                ["[","^","2","!","[","]","!","1","2","!","1","^","^","^","^","^","^","2","!","1","2","!","[","]","!","1","^","]"],
                ["[",".","4","!","3","4","!","[","]","!","3",".","."," "," ",".",".","4","!","[","]","!","3","4","!","3",".","]"],
                ["|","!","!","!","!","!","!","[","]","!","!","!","!","[","]","!","!","!","!","[","]","!","!","!","!","!","!","|"],
                ["|","!","1","^","^","^","^"," "," ","^","^","2","!","[","]","!","1","^","^"," "," ","^","^","^","^","2","!","|"],
                ["|","!","3",".",".",".",".",".",".",".",".","4","!","3","4","!","3",".",".",".",".",".",".",".",".","4","!","|"],
                ["|","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","!","|"],
                ["3","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","4"] 
        
    ]


    function createImage(src){
        const image = new Image()
        image.src = src
         return image
        
    }


    class Wall {
        constructor(x,y,image){
            this.x = x 
            this.y = y
            this.width = gameWidth
            this.height = gameHeight
            this.image = image
        }
        draw(){
                ctx.drawImage(this.image, this.x, this.y,gameWidth,gameHeight)                
        }
    }



    class Food{
        constructor(x,y,width,height){
            this.x = x + (width/2)
            this.y = y + (height/2)
            this.width= width
            this.height= height
        }
        drawf(){
            ctx.beginPath()
            ctx.fillStyle="orange"
            ctx.arc(this.x, this.y, 2, 0, Math.PI*2)
            ctx.fill() 
            ctx.closePath()         
        }
    }
    class Power{
        constructor(x,y,width,height){
            this.x = x + (width/2)
            this.y = y + (height/2)
            this.width= width
            this.height= height
        }
        drawf(){
            ctx.beginPath()
            ctx.fillStyle="red"
            ctx.arc(this.x, this.y, 8, 0, Math.PI*2)
            ctx.fill() 
            ctx.closePath()         
        }
    }


    pacManMap.forEach((row,i)=>{
        row.forEach((symbol,j)=>{
            switch(symbol){
                case "=":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/orizontal.png")))
                break
                case "|":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/vertical.png")))
                break
                case "2":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/top-left-corner.png")))
                break
                case "1":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/top-right-corner.png")))
                break
                case "3":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/bottom-left-corner.png")))
                break
                case "4":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/bottom-right-corner.png")))
                break
                case "[":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/only-left.png")))
                break
                case "]":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/only-right.png")))
                break
                case ".":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/only-bot.png")))
                break
                case "^":
                    allWalls.push(new Wall(gameWidth * j ,gameHeight * i, createImage("../img/pac-man-img/only-top.png")))
                break
                case "!":
                    allfoods.push(new Food(gameWidth * j ,gameHeight * i, gameWidth, gameHeight))
                break
                case "@":
                    powerUps.push(new Power(gameWidth * j ,gameHeight * i, gameWidth, gameHeight))
                break
            }
        })
    })
    
      
        function detectColusion({
            rect1,
            rect2
        }){
            return (
                rect1.x + rect1.dir.x <= rect2.x + rect2.width &&
                rect1.x + rect1.dir.x + rect1.width >= rect2.x  &&
                rect1.y + rect1.dir.y <= rect2.height + rect2.y  &&
                rect1.y + rect1.dir.y + rect1.height >= rect2.y )
        }
        function detectColusionwithCircle({
            circle,
            rect2
        }){
            const padding = gameWidth / 2 - circle.radius - .5
            return (
                circle.dir.y -circle.radius + circle.y <= rect2.y + rect2.height + padding &&
                circle.dir.x + circle.radius + circle.x >= rect2.x - padding &&
                circle.dir.y +circle.radius + circle.y >= rect2.y -padding  &&
                circle.dir.x -circle.radius + circle.x <= rect2.x + rect2.width + padding )
        }
 
        
        
        let pacmanAnimId
        function animate(){
            ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
            if(keys.up.pressed && lastkey === "up"){
                for( let i =0; i<allWalls.length; i++){
                    const wall = allWalls[i]
                    if(
                        detectColusion({
                            rect1: {
                                ...PacMan,
                                dir: {
                                    x:0,
                                    y:-speed
                                }
                            },
                            rect2: wall
                        })
                    ){
                        PacMan.dir.y = 0
                        break
                    }else{
                        PacMan.stateFrame= "eatingTop"
                        PacMan.dir.y = -speed
                    }
                }
            }else if(keys.down.pressed && lastkey === "down"){
                for( let i =0; i<allWalls.length; i++){
                    const wall = allWalls[i]
                    if(
                        detectColusion({
                            rect1: {
                                ...PacMan,
                                dir: {
                                    x:0,
                                    y:speed
                                }
                            },
                            rect2: wall
                        })
                    ){
                        PacMan.dir.y = 0
                        break
                    }else{
                        PacMan.stateFrame= "eatingBot"
                        PacMan.dir.y = speed
                    }
                }
            }else if(keys.right.pressed && lastkey === "right"){
                for( let i =0; i<allWalls.length; i++){
                    const wall = allWalls[i]
                    if(
                        detectColusion({
                            rect1: {
                                ...PacMan,
                                dir: {
                                    x:speed,
                                    y:0
                                }
                            },
                            rect2: wall
                        })
                    ){
                        PacMan.dir.x = 0
                        break
                    }else{
                        PacMan.stateFrame= "eating"
                        PacMan.dir.x = speed
                    }
                }
               
            }else if(keys.left.pressed && lastkey === "left"){
                for( let i =0; i<allWalls.length; i++){
                    const wall = allWalls[i]
                    if(
                        detectColusion({
                            rect1: {
                                ...PacMan,
                                dir: {
                                    x:-speed,
                                    y:0
                                }
                            },
                            rect2: wall
                        })
                    ){
                        PacMan.dir.x = 0
                        break
                    }else{
                        PacMan.stateFrame= "eatingLeft"
                        PacMan.dir.x = -speed
                    }
                }
            }

            for ( let i = allfoods.length - 1 ; i >= 0;  i--){
                const food = allfoods[i]
                food.drawf()
                if (PacMan.x <= food.x + 2 &&
                PacMan.x + PacMan.width >= food.x - 2 &&
                PacMan.y <= 2 + food.y + 2 &&
                PacMan.y + PacMan.height >= food.y -2){
                   allfoods.splice(i,1)  
               }  
            } 
 
            for ( let j = 0; j < powerUps.length; j++){
                const pellet = powerUps[j]
                pellet.drawf()
                if (PacMan.x <= pellet.x + 2 &&
                PacMan.x + PacMan.width >= pellet.x - 2 &&
                PacMan.y <= 2 + pellet.y + 2 &&
                PacMan.y + PacMan.height >= pellet.y -2){
                   powerUps.splice(j,1)
            }   
        } 
               
            allWalls.forEach(bountry=>{
                bountry.draw()
                if (detectColusion({
                    rect1:PacMan,
                    rect2:bountry
                })){
                    PacMan.dir.x = 0
                    PacMan.dir.y = 0
               }
            })

            let position = Math.floor(gameFrame/staggerFrammes) % pacmanAnimation[PacMan.stateFrame].loc.length
            let ghostPosition = Math.floor(gameFrame/staggerFrammes) % 2

            PacMan.update(position)
          /*   Pinky.update(ghostPosition)
            Blinky.update(ghostPosition)
            Clide.update(ghostPosition)
            Inky.update(ghostPosition) */
            ghosts.forEach((ghost)=>{
                ghost.update(ghostPosition)
                const collisions = []
                allWalls.forEach(bountry=>{
                    if(
                        !collisions.includes("left") &&
                        detectColusionwithCircle({
                            circle: {
                                ...ghost,
                                dir: {
                                    x:-ghostSpeed,
                                    y:0
                                }
                            },
                            rect2: bountry
                        })
                    ){
                        collisions.push("left")
                    }
                    if(
                        !collisions.includes("right") &&
                        detectColusionwithCircle({
                            circle: {
                                ...ghost,
                                dir: {
                                    x:ghostSpeed,
                                    y:0
                                }
                            },
                            rect2: bountry
                        })
                    ){
                        collisions.push("right")
                    }
                    if(
                        !collisions.includes("top") &&
                        detectColusionwithCircle({
                            circle: {
                                ...ghost,
                                dir: {
                                    x:0,
                                    y:-ghostSpeed
                                }
                            },
                            rect2: bountry
                        })
                    ){
                        collisions.push("top")
                    }
                    if(
                        !collisions.includes("down") &&
                        detectColusionwithCircle({
                            circle: {
                                ...ghost,
                                dir: {
                                    x:0,
                                    y:ghostSpeed
                                }
                            },
                            rect2: bountry
                        })
                    ){
                        collisions.push("down")
                    }
                })
                if (collisions.length > ghost.prevCollisions.length){
                    ghost.prevCollisions = collisions
                }
                
                if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
        
                    
                    if(ghost.dir.x > 0) {ghost.prevCollisions.push("right")}
                    else if(ghost.dir.x<0){ ghost.prevCollisions.push("left")}
                    else if(ghost.dir.y>0) {ghost.prevCollisions.push("down")}
                    else if(ghost.dir.y<0) {ghost.prevCollisions.push("top")}
                    
                    const pathways = ghost.prevCollisions.filter(collision=>{
                        return !collisions.includes(collision) })
                    
                    const direction = pathways[Math.floor(Math.random()*pathways.length)]
                    
                    switch (direction) {
                        case "right":
                            ghost.dir.x= ghostSpeed
                            ghost.dir.y= 0
                            ghost.stateFrame = "movingRight"
                        break
                        case "left":
                            ghost.dir.x= -ghostSpeed
                            ghost.dir.y= 0
                            ghost.stateFrame = "movingLeft"
                        break
                        case "top":
                            ghost.dir.y= -ghostSpeed
                            ghost.dir.x= 0
                            ghost.stateFrame = "movingUp"
                        break
                        case "down":
                            ghost.dir.y= ghostSpeed
                            ghost.dir.x= 0
                            ghost.stateFrame = "movingDown"
                        break
                    }
                    ghost.prevCollisions=[]
                }

            })
           
            gameFrame++
            pacmanAnimId = requestAnimationFrame(animate)
        }
        animate() 

        
    
    return (pacmanAnimId)=>{
        cancelAnimationFrame(pacmanAnimId)
    }
    
    
    
    
    
    })

    return<>
    <Navbar />
    <div style={{marginTop:"90px", backgroundColor:"black"}}>
     <canvas ref={pacManCanvasRef}></canvas>
    </div>
    </>
}
export default PacMan