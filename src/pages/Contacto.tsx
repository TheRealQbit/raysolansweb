import { useLayoutEffect , useRef } from 'react';
import gsap from 'gsap';

import subject from '/assets/Ray/Subject.png';
import bg from '/assets/Ray/bg.png';
import { NavBar } from '../elements/NavBar/NavBar';
import Contact from '../elements/Forms/Forms';
export default function Contacto() {
    const comp = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const t1 = gsap.timeline()
            
            const h1 = document.querySelector('h1')
            if (window.innerWidth > 540) { 
                t1.set(".loading-screen .rounded-div-wrap.bottom", { 
                  height: "10vh",
                });	
              } else {
                t1.set(".loading-screen .rounded-div-wrap.bottom", { 
                    height: "5vh",
                  });	
            }
            t1.set(".loading-screen", { 
                top: "0",
            }).set(".ray-image-subject",{
                opacity: 0,
                transform: "translateX(2rem)",
            }).set(h1,{
                opacity: 0,
                transform: "translateX(8rem)",
            }).set(".formInput", { 
                transform: "translateY(-2rem)",
                width: "30vw",
                opacity: 0,
            }).set(".center",{
                transform: "translateY(-2rem)",
                opacity: 0,
            }).to(".loading-screen", {
                duration: .8,
                top: "-100%",
                ease: "Power4.easeInOut",
                delay: .8
            }).to(".loading-screen .rounded-div-wrap.bottom", {
                duration: 1,
                height: "0vh",
                ease: "Power4.easeInOut"
            },"=-.8").set(".loading-screen", { 
                top: "calc(-100%)" 
            }).set(".loading-screen .rounded-div-wrap.bottom", { 
                height: "0vh"
            }).to(".ray-image-subject",{
                opacity: 1,
                transform: "translateX(0rem)",
                duration: 1,
                ease: "Power4.easeInOut",
            },"start").to(h1,{
                opacity: 1,
                duration: 1,
                transform: "translateX(0rem)",
                ease: "Power4.easeInOut",
            },"start").to(".formInput", {
                duration: .8,
                transform: "translateY(0rem)",
                opacity: 1,
                ease: "Power4.easeInOut",
            }).to(".center", {
                duration: .8,
                transform: "translateY(0rem)",
                opacity: 1,
                ease: "Power4.easeInOut",
            })
        }, comp)

        return() => ctx.revert()
    }, [])
    return (
        <div className='bg-black relative w-screen h-screen' ref={comp} >
            <div className='loading-container'>
                <div className='loading-screen' id="loading-screen">
                    <div className='flex flex-row gap-5 items-center'>
                        <text className='r'>C</text>
                        <text className='loading-words'>ontacto</text>
                    </div>
                    <div className='rounded-div-wrap top'>
                        <div className='rounded-div'></div>                                
                    </div>
                    <div className='rounded-div-wrap bottom'>
                        <div className='rounded-div'></div>
                    </div>
                </div>
            </div>
            <div id="Page">
                <NavBar />                
                <div className='gradient'/>
                <div className='h-screen'>                    
                    <div className='flex flex-col items-end '>
                        <img loading='lazy' src={bg} alt='bg' className='ray-image-background'/>
                        <img loading='lazy' src={subject} alt='subject' className='ray-image-subject'/>
                    </div>
                    <h1 className='contact-form-text'>Trabajemos</h1>
                    <div className='contact-form'>
                        <Contact/>
                    </div>                      
                </div> 
                           
            </div>
        </div>
    )
}
