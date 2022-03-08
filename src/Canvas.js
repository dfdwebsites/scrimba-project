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
        function getMousePos(evt) {
            let rect = canvas.getBoundingClientRect();
            mouse.x= (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width
            mouse.y=(evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
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
                if (mouse.x!==undefined && distance < canvas.width/7) {
                    ctx.strokeStyle = 'rgba(31,31,31,.4)'
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(mouse.x, mouse.y)
                    ctx.lineTo(this.x, this.y)
                    ctx.stroke()
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
            let numberOfParticles = Math.floor((canvas.height * canvas.width) / 100000 )
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
                    if (distance < canvas.width/15) {
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