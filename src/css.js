import React from 'react'
import Navbar from './Navbar'


export default function Css(){

return (<>
     <Navbar />
   
    <section className='css-main'>
    <div className='section-hero css-page'>
        <h2 className='page-title'>CSS & HTML</h2>
    </div>
    <section className='css-content'>
        <h2 className='css-content-title'> The beggining of the journey </h2>
        <p className='css-content-p main'>In the start of the course we take our first look on the magical world of HTML and CSS. We start simple with the very basics so people like me that had no idea what is HTML and CSS
            can understand and achive the goals and complete the challenges. The amazing Scrimba platform let you expirement and play around with the code so you understand what is going on. </p>
        <div className='img-p-container'>
            <p className='css-content-p'>As the lessons continued and we were getting more comfortable with our new skills, we started to create more complex projects, with flexbox we started to create columns and started to create a mindset
                of how we can imagine everything divided in boxes</p>
            <img className='css-content-img' src='./img/css-02.png' alt='second creating of css in scrimba' />    
        </div>
        <div className='img-p-container reverse'>
            <p className='css-content-p'>After that, we started to think responsive, meaning that our goal was to get a new mindset of how our projects will look or small and big screens, first we started to set a maximum width
                for our projects our layout stay as we wanted </p>
            <img className='css-content-img' src='./img/css-challenge-one.png' alt='first challenge of css in scrimba' />
        </div>
        <p className='css-content-p long'>Then we level up our game changing our layout depending on the screen size</p>
        <div className='img-p-container'>
            <div className='long-img-container'>
                <img /* className='css-content-img' */ src='./img/responsive-mobile.png' alt='first challenge of css in scrimba' />
            </div>
            <div className='img-container-withLong'>
                <img className='css-content-img' src='./img/responsive-wide.png' alt='first challenge of css in scrimba' />
            </div>
        </div>
        
        
    </section>
    
    </section>
    </>
)
}