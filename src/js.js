import React from 'react'
import Navbar from './Navbar'


export default function JavaScript(){
    React.useEffect(()=>{
        window.scrollTo(0,0)
    },[])

return <>
    <header className="App-header">
    <Navbar />
    </header>
    <section className='js-main'>
     <div className='section-hero js-page'>
        <h2 className='page-title'>JavaScript</h2>
    </div>
    </section>
    </>
}