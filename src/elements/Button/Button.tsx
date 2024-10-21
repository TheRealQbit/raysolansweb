import { useEffect, useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import "./button.css"
interface ButtonProps {
    onClick: () => void,
    isMenuOpen: boolean
}

export const Button = ({onClick , isMenuOpen}:ButtonProps) => {
    const comp = useRef(null);
    useEffect(() => {
        const el = comp.current;
        gsap.fromTo(el, { scale: 0 }, {
            scale: 1, duration: 1, scrollTrigger: {
                start: '+=100wh',
                scrub: 1,
                trigger: el                
            }
        })
    }, [])
    useLayoutEffect(()=>{
        const ctx = gsap.context(() => {
            const t1 = gsap.timeline()
            const schize = document.querySelectorAll('#schize');
            const schize1 = document.querySelectorAll('#schize1');
            
            t1.add("shize");
            if(isMenuOpen){
                t1.to(schize,{
                duration: .8,
                rotation: 45,
                translateY: "0.75rem",
                ease: "Power4.easeInOut",
                delay: .2
                },"shize").to(schize1,{
                    duration: .8,
                    rotation: -45,
                    translateY: "-0.75rem",
                    ease: "Power4.easeInOut",
                    delay: .2
                    },"shize")
            }else{
                t1.to(schize,{
                    duration: .8,
                    rotation: 0,
                    translateY: "0rem",
                    ease: "Power4.easeInOut",
                    delay: .2
                    },"shize").to(schize1,{
                        duration: .8,
                        rotation: 0,
                        translateY: "0rem",
                        ease: "Power4.easeInOut",
                        delay: .2
                    },"shize")
            }
        })
        return() => ctx.revert()
    })
    return(
        <div className='menu-btn' onClick={onClick} ref={comp}>
            <div className="w-20 h-20 flex justify-center items-center">
                <div className="flex justify-center items-center w-14 h-7">
                    <div className="flex flex-col justify-between gap-4 h-full w-full">
                        <div className="h-1 bg-white" id="schize"></div>
                        <div className="h-1 bg-white" id="schize1"></div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}