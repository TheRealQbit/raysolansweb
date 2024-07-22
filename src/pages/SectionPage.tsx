import React, { useLayoutEffect , useRef } from 'react';
import gsap from 'gsap';
import { NavBar } from "../elements/NavBar/NavBar";
import { ImageType1, ImageType2 } from '../elements/Gallery/displays';

export default function SectionPage({props}) {
    const comp = useRef(null);
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const t1 = gsap.timeline()

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
            }).set(".title",{
                opacity: 0
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
            }).to(".title",{
                opacity: 1,
                duration: 1,
                ease: "Power4.easeInOut",
                delay: .8
            }).set(".loading-screen .rounded-div-wrap.bottom", { 
                height: "0vh"
            })
        }, comp)

        return() => ctx.revert()
    }, [])
    return(
        <div className='bg-black' ref={comp}>
            <div className='loading-container'>
                    <div className='loading-screen' id="loading-screen">
                        <text className='loading-words'>{props.nombre}</text>
                        <div className='rounded-div-wrap top'>
                            <div className='rounded-div'></div>                                
                        </div>
                        <div className='rounded-div-wrap bottom'>
                            <div className='rounded-div'></div>
                        </div>
                    </div>
                </div>            
            <div id="Page">
                <NavBar/>
                <div className='main-section-image-div'>
                    <div className='main-section-image-gradient'/>
                    <img src={props.imagenes[0]} className='main-section-image'/>
                    <h1 className='absolute inset-x-0 bottom-10 text-center text-8xl'>{props.nombre}</h1>
                    <div className='flex flex-col items-center relative bg-black'>
                        <h1 className='text-white p-0 pl-20 pt-32 pr-80 h-96 text-3xl text-left'>{props.descripcion}</h1>
                        {props.imagenes.map((item, index) => (
                                <div key={index}>
                                    {props.tipoGalería[index] === 1 ? (
                                        <ImageType1 image={item} />
                                    ) : (
                                        <ImageType2 image={item} />
                                    )}
                                </div>
                            ))}
                    </div>                  
                </div>                      
            </div>            
        </div>
    )
}