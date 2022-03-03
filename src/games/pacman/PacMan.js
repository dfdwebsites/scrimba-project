import React, {useEffect, useRef} from "react";
import kaboom from "kaboom";

function PacMan(){

    const pacManCanvasRef = useRef(null)


    useEffect(()=>{

        const p = kaboom({
            canvas:pacManCanvasRef.current,
            global:false,
            fullscreen:false,
            scale:1,
            width:640,
            height:640,
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
        p.loadSpriteAtlas("../img/pacmanAtlas.png",{

            "pinky":{
                x:101,
                y:4,
                width:35,
                height:385,
                sliceY:8
            },
            "pacman":{
                x:852,
                y:5,
                width:35,
                height:585,
                sliceY:12,
                anims:{
                    eatingRight:{from:0, to:2, loop:true,speed:20}
                }
            }




        })

        const levelConf={
            width:16,
            height:16,
            pos: p.vec2(0, 0),
            "^":()=>[
                p.sprite("pinky",{frame:0}),
                p.scale(1)

            ],
            "c":()=>[
                p.sprite("pacman",{anim:"eatingRight"}),
                p.scale(1),
                p.origin("center")
            ]
        }



        p.scene("game", ()=>{
            p.addLevel(MAP[0],levelConf)
        })


        p.go("game")


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })

    return <canvas style={{marginLeft:"5rem"}}ref={pacManCanvasRef}></canvas>
}
export default PacMan