import { useLayoutEffect , useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Gallery from '../elements/Gallery/gallery';
import IGallery1 from '../../public/assets/RaySolans_Onboarding_IGallery_1.jpg';
import IGallery2 from '../../public/assets/RaySolans_Onboarding_IGallery_2.jpg';
import IGallery3 from '../../public/assets/RaySolans_Onboarding_IGallery_3.jpg';
import { NavBar } from '../elements/NavBar/NavBar';
import Section from "../elements/Section/section";
import { Link } from "react-router-dom";
import { Button } from '../elements/Button/Button';
import { Item } from '../App';

export default function Onboarding() {
    const imgArray = [IGallery1, IGallery2, IGallery3];
    const comp = useRef(null);
    const page = useRef(null);
    const menu = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [data, setData] = useState<Item[]>([]);
    useEffect(()=>{
        fetch('./secciones.json')
            .then((response) => {
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    
    useGSAP(() =>{
        if(isMenuOpen){
            gsap.to(page.current,{
                x: 300,
                duration: .8,
                top: "-100%",
                ease: "Power4.easeInOut",
                
            });
        }else{
            gsap.to(page.current,{
                x: 0,
                duration: .8,
                top: "-100%",
                ease: "Power4.easeInOut",
            });
        }    
    },[isMenuOpen]);
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

            const t2 = gsap.timeline()

            t2.pause()            
            t2.to(".text-white text-9xl",{
                transform: "translateX(10rem)",          
                duration: .5,
            })

            const title = document.querySelector('.text-white text-9xl')

            title?.addEventListener('mouseover', () => {
            t2.play()
            })
            title?.addEventListener('mouseleave', () => {
            t2.reverse()
            })
        }, comp)

        return() => ctx.revert()
    }, [])
    return (
            <div className=' relative w-screen' ref={comp} >
                <div className='loading-container'>
                    <div className='loading-screen' id="loading-screen">
                        <div className='flex flex-row gap-5 items-center'>
                            <text className='r'>R</text>
                            <text className='loading-words'>ay Solans</text>
                        </div>
                        <div className='rounded-div-wrap top'>
                            <div className='rounded-div'></div>                                
                        </div>
                        <div className='rounded-div-wrap bottom'>
                            <div className='rounded-div'></div>
                        </div>
                    </div>
                </div>
                <Button onClick={toggleMenu} isMenuOpen={isMenuOpen} />
                <div id="Page" className="page" ref={page}>
                    <NavBar />
                    <div className='gradient'/>
                    <Gallery imgArray={imgArray}/>
                    <div className='flex flex-col items-left w-screen'>
                        <div className='bg-black pt-10 pl-20'>
                            <div className='flex flex-col justify-center'>
                                <text className='text-white text-9xl font-bold'>
                                    IMÁGENES
                                </text><div className="w-full h-0.5 bg-white-500 my-4"></div>
                                <text className='text-white text-4xl'>
                                    que
                                </text>
                                <text className='text-white text-9xl font-bold'>
                                    TRANSCIENDEN
                                </text>
                            </div>
                        </div>
                    </div>
                    <Section/>
                </div>
                <div className={`side-menu ${isMenuOpen ? 'open' : ''}`} ref={menu}>
                    <button className="close-button" onClick={toggleMenu}>
                    &times;
                    </button>
                    <div className="menu-content" ref={menu}> 
                        <Link to="/contact" className="text-white text-xl">
                            Contacto
                        </Link>
                        {data.map((item) =>(
                            <Link to={`/${item.nombre}`} className='text-white text-9xl'>
                                <p>{item.nombre}</p>
                            </Link>
                            ))}
                        
                    </div>
                </div>
        </div>
    )
}