import React from 'react'

function Canvas(){
    const canvasRef=React.useRef(null)
        
    React.useEffect(()=>{
        

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        canvas.width= window.innerWidth
        canvas.height = document.documentElement.scrollHeight
       

        let particalsArray;

        let mouse = {
            x:null,
            y:null,
            radius:(canvas.height/95) * (canvas.width/95)/2
        }
        function getMousePos(event) {
            mouse.x= event.x
            mouse.y = event.y

        }
        function removeMousePos(){
            mouse.x=undefined
            mouse.y=undefined
        }
        function changeWindonSize(){
            canvas.width= window.innerWidth
            canvas.height =document.documentElement.scrollHeight
            mouse.radius= ((canvas.height/95) * (canvas.width/95))/2
            init()
        }
        window.addEventListener('resize',changeWindonSize)
        window.addEventListener('mousemove',getMousePos)
        window.addEventListener('mouseout',removeMousePos)
     
        //create particle
        class Particle{
            constructor(x,y,directionX,directionY,size,color){
                this.x = x
                this.y = y
                this.directionX = directionX
                this.directionY = directionY
                this.size = size
                this.color = color
            }
            //method to draw individual particle
            draw(){
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false)
                ctx.fillStyle = 'rgba(31,31,31,.4)'
                ctx.fill()
            }
            //check particle position, check mouse position, move the particle,
            //draw the particle
            update(){
                //check if particle is still within canvas
                if (this.x> canvas.width || this.x < 0 ){
                    this.directionX = -this.directionX
                }
                if (this.y > canvas.height || this.y <0 ){
                    this.directionY = -this.directionY
                }
                //check collision detection - mouse position / particle position
                let dx = mouse.x - this.x
                let dy = mouse.y - this.y
                let distance = Math.sqrt(dx*dx + dy*dy)
                if (distance < mouse.radius + this.size){
                    if(mouse.x < this.x && this.x < canvas.width - this.size * 100){
                        this.x += 5
                    }
                    if (mouse.x > this.x && this.x > this.size * 100){
                        this.x -= 5
                    }
                    if(mouse.y < this.y && this.y < canvas.height - this.size * 100){
                        this.y += 5
                    }
                    if (mouse.y > this.y && this.y >this.size * 100){
                        this.y -= 5
                    }
                }
                //move particle
                this.x += this.directionX
                this.y += this.directionY
                //draw particle
                this.draw()
            }
        }

        function init(){
            particalsArray = []
            let numberOfParticles = /* (canvas.height * canvas.width) / 40000 */ 100
            for ( let i = 0; i < numberOfParticles; i++){
                let size = (Math.random()* 5) +1
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2)
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2)
                let directionX = Math.random() - 1
                let directionY = Math.random() - 1
                let color = 'rgba(31,31,31,.4)'

                particalsArray.push(new Particle(x, y, directionX, directionY, size, color))
            }
        }
        // animation loop
        function animate(){
            window.requestAnimationFrame(animate)
            ctx.clearRect(0,0,canvas.width, canvas.height)
            for(let i = 0; i < particalsArray.length; i++){
                particalsArray[i].update()
            }
            connect()
            
        }

        function connect(){
            for(let a = 0; a < particalsArray.length; a++){
                for(let b = a; b < particalsArray.length; b++) {
                    let distance = (( particalsArray[a].x - particalsArray[b].x) * (particalsArray[a].x - particalsArray[b].x )) + (( particalsArray[a].y - particalsArray[b].y) * (particalsArray[a].y - particalsArray[b].y ))
                    if (distance < (canvas.width/10) * (canvas.height/25)) {
                        ctx.strokeStyle = 'rgba(31,31,31,.4)'
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particalsArray[a].x, particalsArray[a].y)
                        ctx.lineTo(particalsArray[b].x, particalsArray[b].y)
                        ctx.stroke()
                    }


                }
            }
        }
        
        init()
        animate()
        

        return ()=>{
            window.removeEventListener("mousemove" , getMousePos)
            window.removeEventListener("mouseout" , removeMousePos)
            window.removeEventListener("resize" , changeWindonSize)
            window.cancelAnimationFrame(animate)
            console.log("clear")
        }
    },[])

       





    return <canvas ref={canvasRef} id='canvas1'></canvas>
}
export default Canvas