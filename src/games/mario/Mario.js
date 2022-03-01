import kaboom  from "kaboom"
import React from "react"

const Mario = () => {

	const canvasRef = React.useRef(null)

	// just make sure this is only run once on mount so your game state is not messed up
	React.useEffect(() => {

		
			
		 
		
		const k = kaboom({
			// if you don't want to import to the global namespace
			global: false,
			debug: true,
			scale:1.6,
			fullscreen:true,
			canvas: canvasRef.current,
			background: [ 0, 0, 0, 1],
			
		})

			
		function Animations() {
			k.layers([
				"bg",
				"game",
				"ui",
			], "game")
			const level1= [
				'= =  = =                                                   ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                                          ',
				'=                                       +-     =           ',
				'=                                       ()     =           ',
				'==========================================     ============'
			]
		k.addLevel(level1, {
				
				width:16,
				height:16,
				pos: k.vec2(0, 0),
				"=": ()=>[
					k.sprite("floor"),
					k.origin("center"),
					k.area(),
					k.solid()
				],
				"-": ()=>[
					k.sprite("pipe", {frame:1}),
					k.origin("center"),
					k.scale(1),
					k.area(),
					k.solid(),
				],
				"+": ()=>[
					k.sprite("pipe",{frame:0}),
					k.origin("center"),
					k.scale(1),
					k.area(),
					k.solid()
				],
				"(": ()=>[
					k.sprite("pipe",{frame:2}),
					k.origin("center"),
					k.scale(1),
					k.area(),
					k.solid()
				],
				")": ()=>[
					k.sprite("pipe",{frame:3}),
					k.origin("center"),
					k.scale(1),
					k.area(),
					k.solid()
				] 
			})
			let MOVE_SPEED = 200
			let JUMP_FORCE = 500
			const player = k.add([
				k.sprite('mario', {
					frame: 0,
				}),
				k.pos(k.width() * 0.2, k.height() * 0.2),
				k.origin('center'),
				k.scale(1),
				big(),
				{isBig:false,
				isJumping:false},
				k.area({ width: 20, height: 20, offset: k.vec2(0, 6) }),
				k.body()
			])
			 k.add([
				k.text("dev mode ",{
					size:20
				}),
				k.color(0, 0, 255),
				k.pos(0,-100),
				k.layer('ui')
			])
		
			// basic key press logic to change animations
			k.onKeyDown('left', () => {
				player.move(-MOVE_SPEED,0)
			})
		
			k.onKeyDown('right', () => {
				player.move(MOVE_SPEED,0)
				
			})
			k.onKeyPress('left', () => {
				player.flipX(true)
				player.isBig? player.play("bigRun"):player.play("smallRun")
			})
		
			k.onKeyPress('right', () => {
				player.flipX(false)
				player.isBig? player.play("bigRun"):player.play('smallRun')
			})
			k.onKeyPress('space', ()=>{
				if(player.isGrounded()){
					player.isBig? player.play('bigJump') : player.play('smallJump')
					player.jump(JUMP_FORCE)
					player.isJumping = true
				}
			})
			k.onKeyRelease('left', () => {
				player.isBig? player.play('bigMario') :player.play('smallMario')
			})
		
			k.onKeyRelease('right', () => {
				player.isBig? player.play('bigMario') :player.play('smallMario')
			})
			k.onKeyPress('b', () => {
				player.biggify(2)
			})
			k.onKeyPress("r",()=>{
				k.go('animations')
			})
			player.onUpdate(() => {
				k.camPos(player.pos.x+150, k.height()/5 )
				if(player.isGrounded()) {
				  player.isJumping = false
				}
			  })

			
		}
		
		k.loadSprite("items", "../img/items.png",{
			sliceX:7,
			sliceY:6
		})
		k.loadSprite("pipe", "../img/pipe.png",{
			sliceX:2,
			sliceY:2,
			
		})
		k.loadSprite("mario", "../img/mario.png",{
			sliceX:26,
			sliceY:1,
			anims:{
				smallMario:{from:0, to:0},
				bigMario:{from:8, to:8},
				smallJump:{from:5, to:5},
				bigJump:{from:13, to:13},
				smallRun:{from:1, to:3, loop:true, speed:25},
				bigRun:{from:9, to:11, loop:true, speed:25}
			}
		})

		k.loadSpriteAtlas("../img/spritesheet.png",{
			"pipe":{
				x:614,
				y:46,
				width:32,
				height:32,
				sliceX:2,
				sliceY:2
			},
			"floor":{
				x:373,
				y:124,
				width:16,
				height:16
			}


		} )
		function big() {
			let timer = 0
			
		
			return {
				update() {
					if (this.isBig) {
						timer -= k.dt()
						if (timer <= 0) {
							this.smallify()
						}
					}
				},
				isBig() {
					return this.isBig
				},
				smallify() {
					timer = 0
					this.play("smallMario")
					this.isBig = false
				},
				biggify(time) {
				
					this.play("bigMario")	
					timer = time
					this.isBig = true
				},
			}
		}
	
		
		k.scene('animations', Animations)

		k.go('animations')
	
		
	},[])
		
		return <div style={{margin:0, height:"90vh",overflow:"hidden"}}>
			<canvas ref={canvasRef}></canvas>
			</div>

}
export default Mario