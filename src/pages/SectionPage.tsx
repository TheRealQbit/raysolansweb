import  { useLayoutEffect , useRef } from 'react';
import gsap from 'gsap';
import { NavBar } from "../elements/NavBar/NavBar";
import { Display } from '../elements/Gallery/displays';
import { Item } from '../App';

const SectionGallery = ({video, imagenes} :Item) => {
    if(video != '') {
        console.log(video)
        return(<video autoPlay loop muted className='main-section-image'>
            <source src={video} type='video/mp4'/>
        </video>)
        
    } else{
        let random = Math.random() * (imagenes.length - 1)
        random = Math.floor(random)
        return(
        <img loading='lazy'src={imagenes[random]} className='main-section-image'/>
    )
        
    }
}
export default function SectionPage(props:Item) {
    const comp = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
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
        <div className='bg-black w-screen' ref={comp}>
            <div className='loading-container'>
                    <div className='loading-screen' id="loading-screen">
                    <div className='flex flex-row gap-5 items-center'>
                                <text className='r'>{props.nombre.substring(0,1)}</text>
                                <text className='loading-words'>{props.nombre.substring(1)}</text>
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
                <NavBar/>
                <div className='main-section-image-div'>
                    <div className='main-section-image-gradient'/>
                    <SectionGallery {...props}/>                    
                    <h1 className='absolute inset-x-0 bottom-10 text-center text-8xl'>{props.nombre}</h1>
                    <div className='flex flex-col items-stretch relative bg-black'>
                        <h1 className='text-white p-0 pl-20 pt-32 pr-80 h-96 text-3xl text-left'>{props.descripcion}</h1>
                        <Display images={props.imagenes}/>
                    </div>                  
                </div>                      
            </div>            
        </div>
    )
}