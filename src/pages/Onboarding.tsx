import React, { useLayoutEffect , useRef } from 'react';
import gsap from 'gsap';
import Gallery from '../elements/Gallery/gallery';
import IGallery1 from '../../public/assets/RaySolans_Onboarding_IGallery_1.jpg';
import IGallery2 from '../../public/assets/RaySolans_Onboarding_IGallery_2.jpg';
import IGallery3 from '../../public/assets/RaySolans_Onboarding_IGallery_3.jpg';
import { NavBar } from '../elements/NavBar/NavBar';
import Section from "../elements/Section/section";
export default function Onboarding() {
    const imgArray = [IGallery1, IGallery2, IGallery3];
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
    return (
            <div className='bg-black relative' ref={comp} >
                <div className='loading-container'>
                    <div className='loading-screen' id="loading-screen">
                        <text className='loading-words'>RAY SOLANS</text>
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
                    <Gallery imgArray={imgArray} imgCount={imgArray.length} />
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row gap-40 items-center bg-black pt-10 px-20'>
                            <div className='flex flex-col justify-center'>
                                <text className='text-white text-9xl font-bold'>
                                    IMÁGENES
                                </text>
                                <text className='text-white text-4xl'>
                                    con un significado que
                                </text>
                                <text className='text-white text-9xl font-bold'>
                                    TRANSCIENDE
                                </text>
                            </div>
                            <text className='text-white text-xl self-start'>
                                La combinación de mi pasión por la fotografía y el cine me posiciona en un lugar único en el mundo del reportaje. (Texto genérico)
                            </text>
                        </div>
                    </div>
                    <Section/>
                </div>
            </div>
    )
}