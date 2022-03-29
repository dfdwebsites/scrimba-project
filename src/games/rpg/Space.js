import React from "react";
import Navbar from "../../components/Navbar";



export default function Space(){
   React.useEffect(()=>{
    const canvas = document.getElementById("space")
    const ctx = canvas.getContext("2d")


canvas.width = window.innerWidth
canvas.height = window.innerHeight
const game = {
    over:false
}

class Player{
    constructor(){
        this.velocity = {
            x:0,
            y:0
        }
        const scale = 0.15
        const image = new Image()
        image.src ="../img/spaceship.png"
        image.onload = ()=>{
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position={
                x : canvas.width / 2,
                y : canvas.height - this.height * 2
            }
        }
        this.rotation = 0
        this.opacity = 1
    }
    update(){
        if(this.image){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }
    }
    draw(){
            ctx.save()
            ctx.globalAlpha = this.opacity
            ctx.translate(this.position.x+ this.width/2,this.position.y+ this.height/2)
            ctx.rotate(this.rotation)
            ctx.translate(-this.position.x- this.width/2,-this.position.y - this.height/2) 
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
            ctx.restore() 
    

    }
}
class Enemy {
    constructor({position}){
        const scale = 1
        const image = new Image()
        image.src ="../img/invader.png"
        image.onload = ()=>{
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
                }
        }
        this.rotation = 0
    }
    update({velocity}){
        if(this.image){
        this.position.x +=  velocity.x
        this.position.y +=  velocity.y 
        this.draw()
        }
    }
    draw(){
          ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)     
    }

    shoot(enemiesFire){
        enemiesFire.push(new EnemyFire({position:{
            x: this.position.x + this.width/2,
            y: this.position.y + this.height
        }}))
    }

}
class Grid{
    constructor(){
        this.velocity={
            x:1,
            y:0
        }
        this.position = {
            x:0,
            y:0
        }
        this.enemies = []
        const columns = Math.floor(Math.random()*5 + 5)
        const rows = Math.floor(Math.random()*5 + 2)
        this.width = columns * 30
        this.height = rows * 30
         for (let x = 0 ; x < columns; x++){
            for (let y = 0 ; y < rows; y++){
                this.enemies.push(new Enemy({position:{
                    x: x * 30,
                    y: y * 30 + this.position.y
                }}))
        }}
    } 
    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0
        if (this.position.x + this.width >= canvas.width || this.position.x < 0){
            this.velocity.y = 30
            this.velocity.x = -this.velocity.x
        }
    }
}
   
class Projectile{
    constructor(x,y){
        this.velocity={
            x:0,
            y:-7
        }
        this.x = x
        this.y = y
        this.radius = 3
    }
    update(){
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.draw()
    }
    draw(){
        ctx.fillStyle = "blue"
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2)
        ctx.fill()
        ctx.closePath()
    }
}
class EnemyFire{
    constructor({position}){
        this.velocity={
            x:0,
            y:3
        }
        this.position = {
            x: position.x,
            y: position.y
        } 
        this.width = 3
        this.height = 10
    }
    update(){
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
        this.draw()
    }
    draw(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Particle {
    constructor({position,velocity,radius,color,fade}){
        this.velocity=velocity
        this.position = position
        this.color = color
        this.radius = radius
        this.opacity = 1
        this.fade = fade
    }
    update(){
        this.draw()
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
        if(this.fade)
        this.opacity -= 0.01
    }
    draw(){
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.position.x,this.position.y,this.radius,0,Math.PI *2)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
}

const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    space:{
        pressed:false
    }
}
document.addEventListener("keydown", (e)=>{
    switch(e.key){
        case "a":
            keys.a.pressed = true
        break
        case "d":
            keys.d.pressed = true
        break
        case " ":
            if (!game.over){
                projectiles.push(new Projectile(player.position.x + player.width/2, player.position.y))
            }
            
        break
    }
})
document.addEventListener("keyup", (e)=>{
    switch(e.key){
        case "a":
            keys.a.pressed = false
        break
        case "d":
            keys.d.pressed = false
        break
    }
})

const projectiles = []
const particles = []
const grids = []
const enemiesFire = []
const explosions = []
const player = new Player()
let score = 0
let frames = 0
let randomNumber = Math.floor((Math.random()* 500) + 500) 
 for( let i=0; i<60 ; i++){
        explosions.push(new Particle({
            position:{
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            },
            velocity:{
                x:0,
                y:0.3
            },
            radius:Math.floor(Math.random() * 2  + 1,),
            color:"white",
            fade:false
        }
        ))
    }

function createExplosion(object,color,fade){
    for( let i=0; i<15 ; i++){
        explosions.push(new Particle({
            position:{
                x: object.position.x + object.width/2,
                y: object.position.y + object.height/2
            },
            velocity:{
                x:(Math.random() - 0.5) * 2,
                y:(Math.random() - 0.5) * 2
            },
            radius:Math.floor(Math.random() * 2 + 1,),
            color,
            fade
        }
        ))
    }
}

let spaceAnimateId

function animate(){
    ctx.fillStyle="black"
    ctx.fillRect(0,0,canvas.width,canvas.height) 
    player.update()
    //explosions
    explosions.forEach((explosion, i )=>{

        if (explosion.position.y - explosion.radius >= canvas.height){
            explosion.position.x = Math.random() * canvas.width
            explosion.position.y = - explosion.radius
        }


        if (explosion.opacity<=0){
            setTimeout(()=>{
                explosions.splice(i,1)
            },0)
        }
        else explosion.update()
     
    })
    enemiesFire.forEach((shot, i)=>{
       
        if (shot.position.y >= canvas.height){
            setTimeout(()=>{
                enemiesFire.splice(i,1)
            },0)
        }
        else  shot.update()
        //player dies
        if (
            shot.position.y + shot.height >= player.position.y &&
            shot.position.y <= player.position.y + player.height&&
            shot.position.x + shot.width >= player.position.x &&
            shot.position.x <= player.position.x + player.width
        ){
            createExplosion(player, "white",true)
            setTimeout(()=>{
                enemiesFire.splice(i,1)
                player.opacity = 0
                game.over = true
            },0)
            setTimeout(()=>{
                 cancelAnimationFrame(spaceAnimateId)
            },1000)
        }
    })
    grids.forEach((grid, gridIndex)=>{
        grid.update()
        if (frames % 200 === 0 && grid.enemies.length > 0 ){
            grid.enemies[Math.floor(Math.random()*grid.enemies.length)].shoot(enemiesFire)
        }
        //enemies movement
        grid.enemies.forEach((enemy, j)=>{
            enemy.update({velocity:grid.velocity})  
            //enemies collision 
            projectiles.forEach((projectile, i)=>{
             if (
                        projectile.y - projectile.radius <= enemy.position.y + enemy.height &&
                        projectile.y + projectile.radius >= enemy.position.y &&
                        projectile.x - projectile.radius <= enemy.position.x +enemy.width &&
                        projectile.x + projectile.radius >= enemy.position.x 
                    ){
                        setTimeout(()=>{
                            const enemyFound = grid.enemies.find(
                                (enemy2) => enemy2 === enemy)
                            const projectileFound = projectiles.find(
                                (projectile2) => projectile2 === projectile)
                            if(enemyFound && projectileFound){
                               createExplosion(enemy,"#BAA0DE",true)
                                grid.enemies.splice(j,1)
                                projectiles.splice(i,1)
                                score += 100
                                document.getElementById("score").innerHTML = score
                            if (grid.enemies.length > 0){
                                const firstEnemy = grid.enemies[0]
                                const lastEnemy = grid.enemies[grid.enemies.length - 1]
                                grid.width = lastEnemy.position.x + lastEnemy.width - firstEnemy.position.x
                                grid.position.x = firstEnemy.position.x
                            }
                            else grids.splice(gridIndex,1)
                            }
                        },0)
                    }
                        
            })    
            
        })
    })
    
    if(keys.a.pressed && player.position.x > 0){
        player.velocity.x = -5
        player.rotation = -0.15
    }
    else if(keys.d.pressed && player.position.x + player.width < canvas.width){
        player.velocity.x = 5
        player.rotation = 0.15
    }
    else{
        player.velocity.x = 0
        player.rotation = 0
    }
    projectiles.forEach((proj, i)=>{
        if (proj.y < 0){
            setTimeout(()=>{
                projectiles.splice(i,1)
            },0) // use setTimeout to prevent flashing
        } 
        else proj.update()
    })
    
    if (frames % randomNumber === 0){
        grids.push(new Grid()) 
        frames = 0
        randomNumber = Math.floor((Math.random()* 500) + 1000) 
    }
    frames ++

   spaceAnimateId=requestAnimationFrame(animate)
}
animate()
   },[])
    return (
        <>
        <div style={{position:"absolute", top:"4px",right:"4px"}}>
        <a href='/scrimba-project/games'><i style={{fontSize:"25px", color:"white"}} className="fa-solid fa-arrow-right-from-bracket"></i></a>
        </div>
        <div style={{position:"absolute", top:"4px",left:"4px"}}>
            <p style={{color:"white", fontSize:"15px"}}>Score: <span id="score"></span></p>
        </div>
        <div className="space-container">
            <canvas style={{display:"block"}} id="space" ></canvas>
        </div>
        </>
    )
}