import React, {useEffect, useRef} from "react";
import kaboom from "kaboom";
import Navbar from "../../components/Navbar";

function PacMan(){

    const pacManCanvasRef = useRef(null)
    
    useEffect(()=>{
        pacManCanvasRef.current.width=window.innerWidth
        pacManCanvasRef.current.height=window.innerHeight

        const p = kaboom({
            canvas:pacManCanvasRef.current,
            global:false,
            fullscreen:false,
            background:"black",
            scale:1,
            width:window.innerWidth,
            height:window.innerHeight

        })



        const MAP=[
            [
                    '============================',
                    '=!!!!!!!!!!!!==!!!!!!!!!!!!=',
                    '=!====!=====!==!=====!====!=',
                    '=@====!=====!==!=====!====@=',
                    '=!====!=====!==!=====!====!=',
                    '=!!!!!!!!!!!!!!!!!!!!!!!!!!=',
                    '=!====!==============!====!=',
                    '=!====!==============!====!=',
                    '=!!!!!!!!!!!!==!!!!!!!!!!!!=',
                    '======!=====!==!=====!======',
                    '======!==          ==!======',
                    '======!== ===++=== ==!======',
                    '======!== =+^++<+= ==!======',
                    '      !!! =++++++= !!!      ',
                    '======!== =+-++>+= ==!======',
                    '======!== ======== ==!======',
                    '======!== ======== ==!======',
                    '=!!!!!!!!     c    !!!!!!!!=',
                    '=!====!=====!==!=====!====!=',
                    '=!====!=====!==!=====!====!=',
                    '=@!!==!!!!!!!!!!!!!!!!==!!@=',
                    '===!==!==!========!==!==!===',
                    '===!==!==!========!==!==!===',
                    '=!!!!!!==!!!!==!!!!==!!!!!!=',
                    '=!==========!==!==========!=',
                    '=!==========!==!==========!=',
                    '=!!!!!!!!!!!!!!!!!!!!!!!!!!=',
                    '============================' 
            ]
        ]
        p.loadSpriteAtlas("../img/pac-manAtlas.png",{

            "pinky":{
                x:337,
                y:97,
                width:126,
                height:13,
                sliceX:8
            },
            "blinky":{
                x:337,
                y:81,
                width:126,
                height:13,
                sliceX:8
            },
            "inky":{
                x:337,
                y:113,
                width:126,
                height:13,
                sliceX:8
            },
            "clide":{
                x:337,
                y:129,
                width:126,
                height:13,
                sliceX:8
            },
            "pacman":{
                x:337,
                y:32,
                width:93,
                height:31,
                sliceX:3,
                anims:{
                    eatingRight:{from:0, to:2, loop:true, pingpong:true,speed:20}
                }
            },
            "food":{
                x:156,
                y:27,
                width:2,
                height:2,
            },
            "power":{
                x:154,
                y:18,
                width:6,
                height:6
            },
            "wall":{
                x:140,
                y:1,
                width:6,
                height:5

            }


        })

        const levelConf={
            width:20,
            height:20,
            pos: p.vec2(0, 0),
            "^":()=>[
                p.sprite("pinky",{frame:0}),
                p.scale(1.53),
                p.area(20,20),
                p.origin("center")

            ],
            "<":()=>[
                p.sprite("inky",{frame:0}),
                p.scale(1.53),
                p.area(20,20),
                p.origin("center")
            ],
            ">":()=>[
                p.sprite("blinky",{frame:0}),
                p.scale(1.53),
                p.area(20,20),
                p.origin("center")
            ],
            "-":()=>[
                p.sprite("clide",{frame:0}),
                p.scale(1.53),
                p.area(20,20),
                p.origin("center")
            ],
            "c":()=>[
                p.sprite("pacman",{anim:"eatingRight"}),
                p.scale(0.64),
                p.origin("center"),
                p.area(20,20)
            ],
            "@":()=>[
                p.sprite("power"),
                p.scale(2),
                p.origin('center'),
                p.area()
            ],
            "!":()=>[
                p.sprite("food"),
                p.scale(2,4),
                p.origin('center'),
                p.area()
            ],
            "=":()=>[
                p.sprite("wall"),
                p.scale(3),
                p.origin("center"),
                p.area()

            ]
        }



        p.scene("game", ()=>{
            p.addLevel(MAP[0],levelConf)
        })


        p.go("game")


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })

    return<>
    <Navbar />
    <div style={{marginTop:"90px"}}>
     <canvas ref={pacManCanvasRef}></canvas>
    </div>
    </>
}
export default PacMan