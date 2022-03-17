import React from 'react'

function Matrix(){
    const matrixRef = React.useRef(null)
    React.useEffect(()=>{
    const matrixCanvas = matrixRef.current
    matrixCanvas.height = window.innerHeight
    matrixCanvas.width = window.innerWidth
    

    const matCtx = matrixCanvas.getContext("2d")
    let gradient = matCtx.createLinearGradient(0,0,matrixCanvas.width,matrixCanvas.height)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.2, 'yellow')
    gradient.addColorStop(0.4, 'green')
    gradient.addColorStop(0.6, 'cyan')
    gradient.addColorStop(0.8, 'blue')
    gradient.addColorStop(0.9, 'magenta')

    class Symbol{
        constructor(x,y,fs,canvasHeigth){
            this.chars = `アァカサタナハマヤャラワガザダバパイ
            ィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォ
            コソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`
            this.x = x
            this.y = y
            this.fs = fs
            this.text= ''
            this.canvasHeigth = canvasHeigth    
        }
        draw(context){
            this.text = this.chars.charAt(Math.floor(Math.random()*this.chars.length))
            /* context.fillStyle = '#0aff0a' */
            context.fillText(this.text, this.x * this.fs, this.y * this.fs)
            if(this.y * this.fs > this.canvasHeigth  && Math.random() > 0.98 )this.y = 0
            else this.y ++
        }

    }
    class Effect{
        constructor(canvasWidth, canvasHeigth){
            this.canvasWidth= canvasWidth
            this.canvasHeigth = canvasHeigth
            this.fs = 25
            this.columns = this.canvasWidth / this.fs
            this.symbols = []
            this.#initialize()
        }
        #initialize(){
            for (let i = 0 ; i < this.columns; i++){
                this.symbols[i] = new Symbol( i, 0 , this.fs, this.canvasHeigth)
            }
        }
        resize(width, height){
            this.canvasWidth = width
            this.canvasHeigth = height
            this.columns = this.canvasWidth / this.fs
            this.symbols = []
            this.#initialize()
        }
    }
    const effect = new Effect(matrixCanvas.width, matrixCanvas.height)
    let lastTime = 0
    const fps = 20
    const nextFrame = 1000/fps
    let timer = 0 
    
 
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        if(timer > nextFrame){
            
            matCtx.fillStyle = 'rgba(0,0,0,0.1)'
            matCtx.textAlign = 'center'
            matCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height)
            matCtx.fillStyle = gradient //'#0aff0a'
    
            matCtx.font = effect.fs+"px monospace"
            effect.symbols.forEach(symbol=>symbol.draw(matCtx))
            timer = 0
        }
        else timer += deltaTime
        requestAnimationFrame(animate)
    }
    animate(0)
   
    window.addEventListener("resize", function(){
        matrixCanvas.width = window.innerWidth
        matrixCanvas.height = window.innerHeight
        effect.resize( matrixCanvas.width, matrixCanvas.height)
    })
    return ()=>{
        window.removeEventListener("resize", function(){
            matrixCanvas.width = window.innerWidth
            matrixCanvas.height = window.innerHeight
            effect.resize( matrixCanvas.width, matrixCanvas.height)
        })
    }
    },[]) 
  
    return <canvas ref={matrixRef} id='matrix'></canvas>
}
export default Matrix