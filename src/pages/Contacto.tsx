import { useLayoutEffect , useRef } from 'react';
import gsap from 'gsap';

import { withBase } from '../functions';
import { NavBar } from '../elements/NavBar/NavBar';
import Contact from '../elements/Forms/Forms';
import LoadingContainer from '../elements/loadingContainer';
import Footer from '../elements/Footer/Footer';
import { AnimatedBrand } from '../elements/AnimatedBrand/AnimatedBrand';

export default function Contacto() {
    const comp = useRef(null);

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
        <div className='relative w-screen' ref={comp} >
            <LoadingContainer text='Contacto'/>
            <div id="Page" className="page">
                <NavBar />
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-40">
                    <AnimatedBrand onClick={handleLogoClick} />
                </div>
                <div className='gradient'/>
                <div className='h-screen'>                    
                    <div className='flex flex-col items-end '>
                        <img loading='eager' src={withBase('/assets/Ray/bg.png')} alt='bg' className='ray-image-background'/>
                        <img loading='eager' src={withBase('/assets/Ray/Subject.png')} alt='subject' className='ray-image-subject'/>
                    </div>
                    <h1 className='contact-form-text'>Trabajemos</h1>
                    <div className='contact-form'>
                        <Contact/>
                    </div>                      
                </div> 
                <Footer />
                           
            </div>
        </div>
    )
}
