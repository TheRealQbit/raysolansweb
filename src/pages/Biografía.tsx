import { useLayoutEffect , useRef } from 'react';
import gsap from 'gsap';

import { NavBar } from '../elements/NavBar/NavBar';

import subject from '/assets/BIO/sujeto.png';
import bg from '/assets/BIO/bg.png';
import luz from '/assets/BIO/luz.png';

export default function Biografia() {
    const comp = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const t1 = gsap.timeline()

            const R = document.querySelector('.biography-name-r')

            const page = document.querySelector('#Page')
            
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
            }).set(".loading-screen", { 
                top: "0",
            }).set(page, { 
                scaleX: 1,
            }).set(".ray-image-subject",{
                opacity: 0,
            }).set(h1,{
                opacity: 0,
                transform: "translateX(8rem)",
            }).set(".ray-image-light", { 
                transform: "translateY(1rem)",
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
            },"start").to(".ray-image-light",{
                opacity: 1,
                duration: 0.4,
                transform: "translateY(0rem)",
                ease: "Quad.easeInOut",
            })

            const t2 = gsap.timeline()
            
            

            t2.pause()
            t2.set(R, { 
                scaleX: 1,
            }).to(R,{
                duration: 1,
                scaleX: -1,
                ease: "Power4.easeInOut",
            })
            R?.addEventListener('mouseover', () => {
                t2.play()
            })
            R?.addEventListener('mouseout', () => {
                t2.reverse()
            })
        }, comp)

        return() => ctx.revert()
    }, [])
    return (
        <div className='bg-black relative w-screen h-screen' ref={comp} >
            <div className='loading-container'>
                <div className='loading-screen' id="loading-screen">
                    <div className='flex flex-row gap-1 items-center'>
                        <text className='r'>B</text>
                        <text className='loading-words'>iografía</text>
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
                        <img loading='lazy' src={luz} alt='luz' className='ray-image-light'/>
                    </div> 
                    <div className='flex flex-row gap-5 items-center pl-14 pt-52 '>
                        <text className='biography-name-r'>R</text>
                        <text className='biography-name'>ay Solans</text>
                    </div>
                    <div className='justify-start pl-14 pt-10 w-3/4 flex flex-col gap-5'>
                        <h1 className='text-white text-3xl font-normal text-left'>
                        Fotógrafo, Artista Visual, Pintor. Técnico de Telecomunicaciones. Fotógrafo Profesional.
                        Publicidad y Moda. Producción y realización cinematográfica, videográfica. 
                        Asesoramiento y asistencia diversos Estudios. Master de Fotografía PhotoEspaña.
                        </h1>
                        <h1 className='text-white text-3xl font-normal text-left'>
                            En 2019 publica su primer libro “Tentoria” basado en el diálogo de objetos y poesía.  
                        </h1>
                        <h1 className='text-white text-3xl font-normal text-left'>
                            En 2022 publica un libro de relatos, colectivo, “Punto y Sentido”.
                            Exposiciones individuales y colectivas en Bodegas Portia (Burgos),
                        </h1>
                        <h1 className='text-white text-3xl font-normal text-left z-10'>
                        Centro de Arte Alcobendas, Conde Duque, Guadalajara, Majadahonda
                        </h1>
                    </div>                    
                </div> 
                           
            </div>
        </div>
    )
}