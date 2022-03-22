
import kaboom  from "kaboom"
import React from "react"
import Navbar from "../../components/Navbar"




class JoystickController
{
	// stickID: ID of HTML element (representing joystick) that will be dragged
	// maxDistance: maximum amount joystick can move in any direction
	// deadzone: joystick must move at least this amount from origin to register value change
	constructor( stickID, maxDistance, deadzone )
	{
		this.id = stickID;
		let stick = document.getElementById(stickID);

		// location from which drag begins, used to calculate offsets
		this.dragStart = null;

		// track touch identifier in case multiple joysticks present
		this.touchId = null;
		
		this.active = false;
		this.value = { x: 0, y: 0 }; 

		let self = this;

		function handleDown(event)
		{
		    self.active = true;

			// all drag movements are instantaneous
			stick.style.transition = '0s';

			// touch event fired before mouse event; prevent redundant mouse event from firing
			event.preventDefault();

		    if (event.changedTouches)
		    	self.dragStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
		    else
		    	self.dragStart = { x: event.clientX, y: event.clientY };

			// if this is a touch event, keep track of which one
		    if (event.changedTouches)
		    	self.touchId = event.changedTouches[0].identifier;
		}
		
		function handleMove(event) 
		{
		    if ( !self.active ) return;

		    // if this is a touch event, make sure it is the right one
		    // also handle multiple simultaneous touchmove events
		    let touchmoveId = null;
		    if (event.changedTouches)
		    {
		    	for (let i = 0; i < event.changedTouches.length; i++)
		    	{
		    		if (self.touchId === event.changedTouches[i].identifier)
		    		{
		    			touchmoveId = i;
		    			event.clientX = event.changedTouches[i].clientX;
		    			event.clientY = event.changedTouches[i].clientY;
		    		}
		    	}

		    	if (touchmoveId == null) return;
		    }

		    const xDiff = event.clientX - self.dragStart.x;
		    const yDiff = event.clientY - self.dragStart.y;
		    const angle = Math.atan2(yDiff, xDiff);
			const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
			const xPosition = distance * Math.cos(angle);
			const yPosition = distance * Math.sin(angle);

			// move stick image to new position
		    stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;

			// deadzone adjustment
			const distance2 = (distance < deadzone) ? 0 : maxDistance / (maxDistance - deadzone) * (distance - deadzone);
		    const xPosition2 = distance2 * Math.cos(angle);
			const yPosition2 = distance2 * Math.sin(angle);
		    const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
		    const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));
		    
		    self.value = { x: xPercent, y: yPercent };
		  }

		function handleUp(event) 
		{
		    if ( !self.active ) return;

		    // if this is a touch event, make sure it is the right one
		    if (event.changedTouches && self.touchId !== event.changedTouches[0].identifier) return;

		    // transition the joystick position back to center
		    stick.style.transition = '.2s';
		    stick.style.transform = `translate3d(0px, 0px, 0px)`;

		    // reset everything
		    self.value = { x: 0, y: 0 };
		    self.touchId = null;
		    self.active = false;
		}

		stick.addEventListener('mousedown', handleDown);
		stick.addEventListener('touchstart', handleDown);
		document.addEventListener('mousemove', handleMove, {passive: true});
		document.addEventListener('touchmove', handleMove, {passive: true});
		document.addEventListener('mouseup', handleUp);
		document.addEventListener('touchend', handleUp);
	}
}

const Mario = () => {

	const canvasRef = React.useRef(null)
	const [gameOver, setGameOver ]= React.useState(false)

	// just make sure this is only run once on mount so your game state is not messed up
	React.useEffect(() => {

		
		let joystick1 = new JoystickController("stick1", 64, 8);	
		let w =canvasRef.current.widht = window.innerWidth
		let h= canvasRef.current.height = window.innerHeight/3 *2
		


		const k = kaboom({
			// if you don't want to import to the global namespace
			global: false,
			debug: true,
			background: [134, 135, 247],
			width: w,
			height: 400,
			scale: 1,
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
				ducking:14,
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
				'=============================================     ============',
				'=============================================     ============',
				'=============================================     ============'
			]
		]
			const level = k.addLevel(LEVELS[levelId ?? 0], levelConf)
		
		
		let MOVE_SPEED = 200
		let JUMP_FORCE = 500
		const FALL_DEATH = 2400
		
		
		
		
		
			
			
			document.getElementById("mmm").addEventListener("touchstart", (e)=>{
				document.getElementById("mmm").active=true
				e.preventDefault()
				if(player.isGrounded()){
					player.jump(JUMP_FORCE)
				}
			},{passive:false})
			document.getElementById("mmm").addEventListener("touchmove", (e)=>{
				e.preventDefault()
				if(player.isGrounded()){
					player.jump(JUMP_FORCE)
				}
			},{passive:false})
			document.getElementById("mmm").addEventListener("touchend", (e)=>{
				e.preventDefault()
				if(player.isGrounded()){
					player.jump(JUMP_FORCE)
				}
			},{passive:false})


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
			k.onKeyDown("down", ()=>{
				player.ducker()
			})
			k.onKeyRelease("down", ()=>{
				player.standUp()
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
			/* 	if (movingLeft){
					player.move(MOVE_SPEED,0)
				} */
				if(joystick1.value.x>0.2){
					player.flipX(false)
					player.moving = true
					player.move(MOVE_SPEED, 0)
				}
				if(joystick1.value.x<-0.2){
					player.flipX(true)
					player.moving = true
					player.move(-MOVE_SPEED, 0)
				}
				if(joystick1.value.x > -0.2 && joystick1.value.x < 0.2){
					player.moving = false
				}
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
			setGameOver(true)
			k.add([
				k.text("GAME OVER",{
					size:52
				}),
				k.pos(k.width()/4,k.height()/4)
			])
			k.onKeyPress(() => {
				setGameOver(false)
				k.go("game")
			})
			document.getElementById("reset").addEventListener("click", ()=>{
				setGameOver(false)
				k.go("game")
			})
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
				ducking:14,
				moving:false,
				smallJumpFrame: 5,
				bigJumpFrame: 13,
				isBig: false,
				isAlive: true,
				isDucking: false,
				hp:1,
				update(){
					if(!this.isGrounded()){
						this.jumping()
					}
					else{
						if(k.isKeyDown("left") || k.isKeyDown("right") ||this.moving ){
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
				},
				smaller() {
					this.area.width = 16;
					this.area.height = 16
					
					if (this.isBig){
						this.area.width = 16;
						this.area.height = 16
						k.wait(1, ()=>{
							
							this.isBig = false; 
						})}
					else k.go("lose")
				},
				standing() {
					this.stop();
					this.frame = this.isBig ? this.isDucking? this.ducking: this.bigStopFrame : this.smallStopFrame;
				},
				ducker(){
					if(this.isBig){
						this.isDucking = true
						this.area.height = 16
					}
				},
				standUp(){
					if(this.isBig){
					this.isDucking = false
					this.area.height = 32
					}
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

		
































		return ()=>{
		
		}


	},[])

	
		




		
		return <>
			<Navbar />
		<div style={{width:"100%",display:"flex",justifyContent:"center",position:"relative",alignItems:"center", marginTop:"90px"}}>
			<canvas className="mario-board"ref={canvasRef}></canvas>
			<div style={{width: "128px", position: "absolute", left:"10px", bottom:"0", transform:"translateY(50%)"}}>
				<img src="../img/joystick-base.png" alt="joystick base"/>
				<div id="stick1" style={{position: "absolute", left:"32px", top:"32px"}}>
				<img src="../img/joystick-red.png" alt="joystick stick"/>		
				</div>
			</div>
			{!gameOver &&<button id="mmm" className="arcade-btn"></button>}
			{gameOver && <button id="reset" className="arcade-btn"> reset</button>}
		</div>
		</>

}
export default Mario