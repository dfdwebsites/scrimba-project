import React, {useEffect, useRef} from "react";
import Navbar from "../../components/Navbar";

function PacMan(){

    const pacManCanvasRef = useRef(null)
    
    useEffect(()=>{
        
        const ctx = pacManCanvasRef.current.getContext("2d")

        const CANVAS_WIDTH = pacManCanvasRef.current.width = ctx.width = 1120
        const CANVAS_HEIGHT = pacManCanvasRef.current.height = ctx.height  = 1120
        //const ghost.ghostSpeed = 1
        const speed = 2
        const pacImg = new Image()
        pacImg.src = "../img/pac-manAtlas.png"
        const gameWidth =CANVAS_WIDTH / 28
        const gameHeight =CANVAS_HEIGHT / 28
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
            redGhostFrame.push({x:336,y:145}, {x:352, y:145})
            let arr=[]
            arr["movingRight"]=[redGhostFrame[0],redGhostFrame[1]]
            arr["movingLeft"]=[redGhostFrame[2],redGhostFrame[3]]
            arr["movingUp"]=[redGhostFrame[4],redGhostFrame[5]]
            arr["movingDown"]=[redGhostFrame[6],redGhostFrame[7]]
            arr["scared"]=[redGhostFrame[8],redGhostFrame[9]]

            return arr
        }



        const redGhostAnim= createAnims(81)
        const yellowGhostAnim= createAnims(129)
        const pinkGhostAnim= createAnims(97)
        const blueGhostAnim = createAnims(113)
        const pacmanAnimation =[]
        const states=[{
                name:"eatingRight",
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

    //game arrays and classes
    const allfoods= []
    const allWalls =[]
    const powerUps=[]
    const ghosts=[]
    
    

    class Player {
       constructor(x,y,arr){
           this.x= x + gameWidth / 2
           this.y= y + gameWidth / 2
           this.radius = gameWidth / 2.678571428571429
           this.width= this.radius * 2
           this.height= this.radius * 2
           /* this.width= gameWidth * 0.95
           this.height= gameHeight * 0.95
           this.x=14*gameWidth+speed
           this.y=17*gameHeight+speed
           this.radius = 10 */

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
        //ctx.drawImage(pacImg, frameX , frameY, 14, 15, this.x, this.y ,this.width, this.height)
        ctx.drawImage(pacImg, frameX , frameY, 14, 15, this.x-this.radius , this.y-this.radius ,this.width, this.height)
       }
    }
  
    class Ghost {
        constructor(x,y,arr,speed){
            this.x= x + gameWidth / 2
            this.y= y + gameWidth / 2
            this.starterX = x + gameWidth / 2
            this.starterY = y + gameWidth / 2
            this.ghostSpeed = speed
            this.radius = gameWidth / 2.678571428571429
            this.width= this.radius*2
            this.scared = false
            this.height= this.radius*2
            this.dir={
                x:0,
                y:-this.ghostSpeed 
             }
            this.stateFrame= "movingRight"
            this.prevCollisions = []
            this.arr = arr
        } 
        update(pos){
            this.draw(this.arr[this.stateFrame][pos].x,this.arr[this.stateFrame][pos].y)
            this.x = this.x + this.dir.x
            this.y = this.y + this.dir.y
            if (this.x > CANVAS_WIDTH){
                this.x = gameWidth
            }
            if (this.x < gameWidth-1){
                this.x = CANVAS_HEIGHT + 1 
            }
            if (this.scared){
                this.stateFrame = "scared"
            }
            //this.draw()
        }
        beScared(){
            this.scared = true
            setTimeout(()=>{
                this.scared = false
                if (this.dir.x === this.ghostSpeed) this.stateFrame = "movingRight"
                else if(this.dir.x === -this.ghostSpeed) this.stateFrame = "movingLeft"
                else if (this.dir.y === -this.ghostSpeed) this.stateFrame = "movingUp"      
                else if(this.dir.y === this.ghostSpeed)this.stateFrame = "movingDown"
                else this.stateFrame = "movingUp"
            },5000)
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
            this.radius= width/16
            this.width= width
            this.height= height
        }
        drawf(){
            ctx.beginPath()
            ctx.fillStyle="orange"
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
            ctx.fill() 
            ctx.closePath()         
        }
    }


    class Power{
        constructor(x,y,width,height){
            this.x = x + (width/2)
            this.y = y + (height/2)
            this.radius= width/4
            this.width= width
            this.height= height
        }
        drawf(){
            ctx.beginPath()
            ctx.fillStyle="red"
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
            ctx.fill() 
            ctx.closePath()         
        }
    }

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
                ["|"," "," "," "," ","|","!","[","]"," ","1","=","=","=","=","=","=","2"," ","[","]","!","|"," "," "," "," ","|"],//
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

    const PacMan = new Player(gameWidth,gameHeight,pacmanAnimation)

    const Pinky = new Ghost(gameWidth*15,gameHeight*15,pinkGhostAnim,1)
    const Blinky = new Ghost(gameWidth*12,gameHeight*15,redGhostAnim,1)
    const Clide = new Ghost(gameWidth*15,gameHeight*13,yellowGhostAnim,1)
    const Inky = new Ghost(gameWidth*12,gameHeight*13,blueGhostAnim,1)
    ghosts.push(Pinky,Blinky,Clide,Inky)

    function createImage(src){
        const image = new Image()
        image.src = src
         return image
        
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
    
        //// 
        /* function detectColusion({
            rect1,
            rect2
        }){
            return (
                rect1.x + rect1.dir.x <= rect2.x + rect2.width &&
                rect1.x + rect1.dir.x + rect1.width >= rect2.x  &&
                rect1.y + rect1.dir.y <= rect2.height + rect2.y  &&
                rect1.y + rect1.dir.y + rect1.height >= rect2.y )
        } */
        
        function detectColusionwithCircle({
            circle,
            rect2
        }){
            const padding = gameWidth / 2 - circle.radius - 1
            return (
                circle.dir.y -circle.radius + circle.y <= rect2.y + rect2.height + padding &&
                circle.dir.x + circle.radius + circle.x >= rect2.x - padding &&
                circle.dir.y +circle.radius + circle.y >= rect2.y -padding  &&
                circle.dir.x -circle.radius + circle.x <= rect2.x + rect2.width + padding )
        }
 
        //frame manipulation
        /* 
        
        let lastTime = 0
        const fps = 20
        const nextFrame = 1000/fps
        let timer = 0 


        function animate(timeStamp){
            const deltaTime = timeStamp - lastTime
            lastTime = timeStamp
            if(timer > nextFrame){
            ....animation will run
            }
            else{
                timer += deltaTime
            }

            requestAnimationFrame(animate)
        }
        
        and when you call animate you need to do it like
        animate(0)
        */
        
        let pacmanAnimId
        function animate(){
            pacmanAnimId = requestAnimationFrame(animate)
            ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
            if(keys.up.pressed && lastkey === "up"){
                for( let i =0; i<allWalls.length; i++){
                    const wall = allWalls[i]
                    if(
                        detectColusionwithCircle({
                            circle: {
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
                        detectColusionwithCircle({
                            circle: {
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
                        detectColusionwithCircle({
                            circle: {
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
                        PacMan.stateFrame= "eatingRight"
                        PacMan.dir.x = speed
                    }
                }
               
            }else if(keys.left.pressed && lastkey === "left"){
                for( let i =0; i<allWalls.length; i++){
                    const wall = allWalls[i]
                    if(
                        detectColusionwithCircle({
                            circle: {
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
                if (
                    Math.hypot(
                        food.x-PacMan.x,
                        food.y-PacMan.y)<
                        food.radius+PacMan.radius
                ){
                   allfoods.splice(i,1)  
                }  
            } 
 
            for ( let j = 0; j < powerUps.length; j++){
                const pellet = powerUps[j]
                pellet.drawf()
                if (Math.hypot(
                    pellet.x-PacMan.x,
                    pellet.y-PacMan.y)<
                    pellet.radius+PacMan.radius
                    ){
                    powerUps.splice(j,1)
                    ghosts.forEach(ghost=>ghost.beScared())
                }   
            } 
               
            allWalls.forEach(bountry=>{
                bountry.draw()
                if(detectColusionwithCircle({
                    circle:PacMan,
                    rect2:bountry
                })){
                    PacMan.dir.x = 0
                    PacMan.dir.y = 0
               }
            })

            let position = Math.floor(gameFrame/staggerFrammes) % pacmanAnimation[PacMan.stateFrame].loc.length
            let ghostPosition = Math.floor(gameFrame/staggerFrammes) % 2
            PacMan.update(position)
            ghosts.forEach((ghost)=>{
                ghost.update(ghostPosition)
                if(Math.hypot(ghost.x-PacMan.x,ghost.y-PacMan.y) < ghost.radius+PacMan.radius){
                    if (ghost.scared){
                        console.log("fired")
                        ghost.x = ghost.starterX
                        ghost.y = ghost.starterY
                        ghost.dir.x= 0
                        ghost.dir.y= 0
                        ghost.prevCollisions = []
                        setTimeout(()=>{
                            ghost.dir.y = -ghost.ghostSpeed
                        },1000)
                    }
                    else cancelAnimationFrame(pacmanAnimId)
                }
                const collisions = []
                allWalls.forEach(bountry=>{
                    if(
                        !collisions.includes("left") &&
                        detectColusionwithCircle({
                            circle: {
                                ...ghost,
                                dir: {
                                    x:-ghost.ghostSpeed,
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
                                    x:ghost.ghostSpeed,
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
                                    y:-ghost.ghostSpeed
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
                                    y:ghost.ghostSpeed
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
                            ghost.dir.x= ghost.ghostSpeed
                            ghost.dir.y= 0
                            ghost.stateFrame = "movingRight"
                        break
                        case "left":
                            ghost.dir.x= -ghost.ghostSpeed
                            ghost.dir.y= 0
                            ghost.stateFrame = "movingLeft"
                        break
                        case "top":
                            ghost.dir.y= -ghost.ghostSpeed
                            ghost.dir.x= 0
                            ghost.stateFrame = "movingUp"
                        break
                        case "down":
                            ghost.dir.y= ghost.ghostSpeed
                            ghost.dir.x= 0
                            ghost.stateFrame = "movingDown"
                        break
                    }
                    ghost.prevCollisions=[]
                }// end of if coli != prev.coli

            }) // end of ghost for each

            gameFrame++
            
        } //end of animate
        animate() 

        
    
    return ()=>{
        
        cancelAnimationFrame(pacmanAnimId)
    }
   },[])// end of useEffect

    return<>
    <Navbar />
    <div style={{marginTop:"90px", backgroundColor:"black", maxHeight: "calc(100vh - 90px)", display:"flex", justifyContent:"center"}}>
     <canvas style={{transform:"scale(0.7)",transformOrigin:"top"}} ref={pacManCanvasRef}></canvas>
    </div>
    </>
}
export default PacMan