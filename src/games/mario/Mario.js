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
			background: [134, 135, 247],
			width: 500,
			height: 340,
			scale: 2,
			fullscreen:false,
			canvas: canvasRef.current,		
		})
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
				smallMario:0,
				bigMario:8,
				smallJump:5,
				bigJump:13,
				Running:{from:1, to:3, loop:true, speed:25},
				RunningBig:{from:9, to:11, loop:true, speed:25}
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
			},
			"surpise":{
				width:52,
				height:16,
				x:372,
				y:160,
				sliceX:3,
				anims:{
					idle:{from:0, to :2, loop:true, speed:4}
				}
			},
			"unboxed": {
				x:373,
				y:65,
				width:16,
				height:16
			},
			"coin":{
				x:426,
				y:162,
				height:16,
				width:36,
				sliceX:3,
				anims:{
					coin:{from:0, to :2, loop:true, speed:20}
				}
			},
			"evil-mushroom":{
				x:957,
				y:187,
				width:54,
				height:16,
				
				sliceX:3,
				anims:{
					evilMushroom:{from:1, to:2,loop:true, speed:2},
				}
			},
			"mushroom":{
				x:71,
				y:43,
				height:16,
				width:16,
			},
			"hill":{
				x:98,
				y:160,
				width:82,
				height:35
			},
			"cloud":{
				x:96,
				y:198,
				width:64,
				height:24
			},
			"shrubbery":{
				x:51,
				y:253,
				width:32,
				height:16
			}

		} )
			
	 	const levelConf = {
				
			width:16,
			height:16,
			pos: k.vec2(0, 0),
			"=": ()=>[
				k.sprite("floor"),
				k.origin("bot"),
				k.area(),
				k.solid()
			],
			"-": ()=>[
				k.sprite("pipe", {frame:1}),
				k.origin("bot"),
				k.scale(1),
				k.area(),
				k.solid(),
			],
			"+": ()=>[
				k.sprite("pipe",{frame:0}),
				k.origin("bot"),
				k.scale(1),
				k.area(),
				k.solid()
			],
			"(": ()=>[
				k.sprite("pipe",{frame:2}),
				k.origin("bot"),
				k.scale(1),
				k.area(),
				k.solid()
			],
			")": ()=>[
				k.sprite("pipe",{frame:3}),
				k.origin("bot"),
				k.scale(1),
				k.area(),
				k.solid()
			] ,
			"?": ()=>[
				k.sprite("surpise", {anim:"idle"}),
				k.area(),
				k.origin("bot"),
				
				k.solid(),
				"coin-surpise",
				"box"
			],
			"#": ()=>[
				k.sprite("surpise", {anim:"idle"}),
				k.area(),
				k.origin("bot"),
				
				k.solid(),
				"mushroom-surpise",
				"box"
			],
			"!": ()=>[
				k.sprite("unboxed"),
				k.area(),
				k.solid(),
				bump(4,6),
				k.origin("bot"),
				"unboxed"
			],
			"$":()=>[
				k.sprite("coin",{anim:"coin"}),
				k.area(),
				bump(32,8),
				k.cleanup(),
    			k.lifespan(0.4, { fade: 0.01 }),
				k.origin("bot"),
				"coin"
			],
			"@":()=>[
				k.sprite("mushroom"),
				k.area(),
				k.body(),
				k.origin("bot"),
				"mushroom"
				
			],
			"^": ()=>[
				k.sprite("evil-mushroom",{anim:"evilMushroom"}),
				k.origin("bot"),
				k.area(),
				k.body(),
				evilMushroom(),
				patrol(),
				k.solid(),
				"evil-mushroom",
				"danger"
			]
		}


	k.scene("game", ({ levelId, score } = { levelId: 0, score: 0 }) => {
			k.layers([
				"bg",
				"game",
				"ui",
			], "game")
			const LEVELS =[ 
				[
				'= =  = =                                                      ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                                                             ',
				'=                     #??                                     ',
				'=                                                             ',
				'=                                                             ',
				'=                                          +-     =           ',
				'=                               ^       ^  ()     =           ',
				'=============================================     ============',
				'=============================================     ============',
				'=============================================     ============'
			]
		]
			const level = k.addLevel(LEVELS[levelId ?? 0], levelConf)
		
		
		let MOVE_SPEED = 200
		let JUMP_FORCE = 500
		const FALL_DEATH = 2400

			
			k.onUpdate("block", (b) => {
				
				b.solid = b.pos.dist(player.pos) <= 64
			})

			k.add([
				k.sprite("cloud"),
				k.pos(210, 50),
				k.layer("bg")
			  ]);
			
			  k.add([
				k.sprite("hill"),
				k.pos(132, 304),
				k.layer("bg"),
				k.origin("bot")
			  ])
			
			  k.add([
				k.sprite("shrubbery"),
				k.pos(300, 304),
				k.layer("bg"),
				k.origin("bot")
			  ])
			







			const player = k.add([
				k.sprite('mario'),
				k.pos(k.width() * 0.2, k.height() * 0.2),
				k.origin('bot'),
				k.scale(1),
				mario(),
				k.area({ width: 16, height: 16, }),
				k.body()
			])
			 k.add([
				k.text("dev mode ",{
					size:20
				}),
				k.color(255, 255, 255),
				k.pos(k.width()/5,k.height()/30),
				k.layer('ui')
			])
		
			// basic key press logic to change animations
			k.onKeyDown('left', () => {
				player.flipX(true)
				if(k.toScreen(player.pos).x > 20){
					player.move(-MOVE_SPEED,0)
				}
			})
		
			k.onKeyDown('right', () => {
				player.flipX(false)
				player.move(MOVE_SPEED,0)
				
			})
			k.onKeyPress('space', ()=>{
				if(player.isGrounded()){
					player.jump(JUMP_FORCE)

				}
			})
			k.onKeyPress('b', () => {
				player.bigger()
			})
			k.onKeyPress("r",()=>{
				k.go('game')
			})

			//general game rules
			player.onUpdate(() => {
				var currCam = k.camPos();
    			if (currCam.x < player.pos.x) {
      				k.camPos(player.pos.x, currCam.y);
   				 }
				if (player.pos.y >= FALL_DEATH) {
					k.go("lose")
				}
			  })

			
		  player.onHeadbutt((obj) => {
			  if (obj.is("box")){
				if (obj.is('coin-surpise')) {
					let coin = level.spawn('$', obj.gridPos.sub(0, 1))
					coin.play("coin")
					coin.bump(8)
					score++	 
				  }
				if (obj.is('mushroom-surpise')){
					let mushroom = level.spawn("@", obj.gridPos.sub(0,1))
					mushroom.jump(200)
					k.onUpdate("mushroom",(c)=>{
						c.move(30,0)
					})
					mushroom.pushOut("evil-mushroom")
				  }
				let pos = obj.gridPos;
				k.destroy(obj);
				let box = level.spawn("!", pos);
				box.bump();
				}
			})
			
			player.onGround((obj) =>{
				if (obj.is('evil-mushroom')){
					player.jump(300)
					obj.squash()
				}
			})	
			player.onCollide("danger", (e,col) => {
				// if it's not from the top, die
				if (!col.isBottom()) {
					player.smaller()
				}
			})
			player.onCollide("coin",(c)=>{
				k.destroy(c)
			})
			player.onCollide("mushroom",(m)=>{
				k.destroy(m)
				player.bigger()
			})
			
		})
		
		
	

		k.scene("lose", () =>{
			k.add([
				k.text("GAME OVER",{
					size:52
				}),
				k.pos(k.width()/4,k.height()/4)
			])
			k.onKeyPress(() => k.go("game"))
		})



		k.go('game')
	
		function patrol(distance=100 , speed = 10, dir=-1){
			return{
				id:"patrol",
				require:["area", "pos"],
				startingPos: k.vec2(0,0),
				add(){
					this.startingPos = this.pos;
					this.on("collide", (obj, side) => {
						if (side === "left" || side === "right") {
						dir = dir*(-1)
						}
					})
   			 	},
				update(){
					if(Math.abs(this.pos.x-this.startingPos.x) >= distance){
						dir = dir*(-1)
					}
					this.move(speed*dir,0)
				}	
				

			}
		}

		function evilMushroom(){
			return{
				id:"evilMushroomId",
				require:["area","pos","sprite","patrol"],
				isAlive:true,
				update(){

				},
				squash(){
					this.isAlive = false
					this.frame=0
					this.unuse("patrol")
					this.stop()
					this.area.width = 16
					this.area.height = -1
					this.use(k.lifespan(0.5, { fade: 0.1 }))
				}
			}
		}
		function bump(offset=8, speed=2, stopAtOrigin = true){
			return{
				id:"bump",
				require: ["pos"],
				bumpOffset: offset,
				speed: speed,
				bumped: false,
				origPos: 0,
   				direction: -1
			,
				update(){
					if (this.bumped) {
						this.pos.y = this.pos.y + this.direction * this.speed;
						if (this.pos.y < this.origPos - this.bumpOffset) {
							this.direction = 1;
						}
						if (stopAtOrigin && this.pos.y >= this.origPos) {
							this.bumped = false;
							this.pos.y = this.origPos;
							this.direction = -1;
						}
					}
			  },
			  bump() {
				this.bumped = true;
				this.origPos = this.pos.y;
			  }
			};
		}
		function mario(){
			return{
				id:"mario",
				require:["area","sprite","body"],
				smallAnimation: "Running",
				bigAnimation: "RunningBig",
				smallStopFrame: 0,
				bigStopFrame: 8,
				smallJumpFrame: 5,
				bigJumpFrame: 13,
				isBig: false,
				isAlive: true,
				hp:1,
				update(){
					if(!this.isGrounded()){
						this.jumping()
					}
					else{
						if(k.isKeyDown("left") || k.isKeyDown("right")){
							this.running()
						}
						else{
							this.standing()
						}
					}
				},
				bigger() {
					this.isBig = true;
					this.area.width = 24;
					this.area.height = 32;
					this.hp ++
				},
				smaller() {
					this.isBig = false;
					this.area.width = 0;
					this.area.height = 0;
					
					k.wait(1.5, () => {
					this.area.width = 16;
					this.area.height = 16
						this.hp --
						if (this.hp <= 0 ){
							k.go("lose")
						}
					})
				},
				standing() {
					this.stop();
					this.frame = this.isBig ? this.bigStopFrame : this.smallStopFrame;
				},
				jumping() {
					this.stop();
					this.frame = this.isBig ? this.bigJumpFrame : this.smallJumpFrame;
				},
				running() {
					const animation = this.isBig ? this.bigAnimation : this.smallAnimation;
					if (this.curAnim() !== animation) {
						this.play(animation);
					}
				}





			}
		}








































	},[])
		
		return <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center", margin:"0", overflow:"hidden"}}>
			<canvas className="mario-board"ref={canvasRef}></canvas>
			</div>

}
export default Mario