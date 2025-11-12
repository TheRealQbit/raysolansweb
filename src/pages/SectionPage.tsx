import  { useLayoutEffect , useRef, useEffect, useState } from 'react';
import { withBase } from '../functions';
import gsap from 'gsap';
import { NavBar } from "../elements/NavBar/NavBar";
import { Display } from '../elements/Gallery/displays';
import { Item } from '../App';
import Footer from '../elements/Footer/Footer';
import { Button } from '../elements/Button/Button';
import { useGSAP } from '@gsap/react';
import { Link } from "react-router-dom";


const SectionGallery = ({video, imagenes,nombre} :Item) => {
    const name = useRef(null);
    useEffect(() => {
        const el = name.current;
        if (el) {
            gsap.fromTo(el, {
                y: 0,
                opacity: 1
            }, {
                y: -100, // Much smaller movement
                opacity: 0.8,
                duration: 1, 
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
        }
    }, [])
    
    if(video != '') {
        console.log(video)
        return(<video autoPlay loop muted className='main-section-image'>
            <source src={withBase(video)} type='video/mp4'/>
        </video>)
        
    } else{
        let random = Math.random() * (imagenes.length - 1)
        random = Math.floor(random)
        return(
            <div className='relative'>          
                <img src={withBase(imagenes[random])} alt='gallery' loading='eager' className='h-[80vh] object-cover w-screen'/>
                <h1 
                    className='absolute inset-x-0 bottom-4 md:bottom-10 text-center text-white font-bold text-2xl font-special-elite sm:text-4xl md:text-6xl lg:text-8xl z-10 px-4' 
                    style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}
                    ref={name}
                >
                    {nombre}
                </h1>
                <div className='absolute bottom-4 right-4 md:bottom-10 md:right-10 text-white text-opacity-70 text-sm md:text-base lg:text-lg z-10 pointer-events-none'>
                  <p className='italic tracking-wider'>Nikon D70</p>
                </div>
                <div className='absolute inset-0 bg-black bg-opacity-20'></div>
            </div>
        )
        
    }
}
export default function SectionPage(props:Item) {
    const comp = useRef(null);
    const page = useRef(null);
    const menu = useRef(null);
    const [data, setData] = useState<Item[]>([]);
    useEffect(()=>{
        fetch(withBase('secciones.json'))
            .then((response) => {
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "Power4.easeInOut" } });
    
        if (isMenuOpen) {
            tl.to(page.current, { x: 300 })  
              .to(menu.current, { x: 0, opacity: 1 }, "-=0.4"); 
        } else {
            tl.to(menu.current, { x: -100, opacity: 0 })
              .to(page.current, { x: 0 }, "-=0.4");
        }
    }, [isMenuOpen]);

    useEffect(() => {
        // Remove conflicting GSAP animation - let SectionGallery handle its own title
        // This was causing the title to be moved too far and become invisible
    }, [])
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
            <div className="loading-container h-screen flex justify-center items-center">
                <div className="loading-screen">
                    <div className="flex flex-row items-center p">
                        <text className="r">{props.nombre.substring(0,1)}</text>
                        <text className="loading-words">{props.nombre.substring(1)}</text>
                    </div>
                    <div className="rounded-div-wrap top">
                        <div className="rounded-div"></div>
                    </div>
                    <div className="rounded-div-wrap bottom">
                        <div className="rounded-div"></div>
                    </div>
                </div>
            </div>
            <Button onClick={toggleMenu} isMenuOpen={isMenuOpen} />
            <div id="Page" className="page" ref={page}>
                <NavBar/>
                <div className='gradient'/>
                <SectionGallery {...props}/>
                <div className='flex flex-col items-stretch relative bg-black'>
                        <h1 className='text-white p-0 pl-[10vw] pt-8 pr-[10vw] pb-[10vh] text-l font-special-elite sm:text-2xl md:text-3xl text-left w-full overflow-visible whitespace-normal'>{props.descripcion}</h1>
                        <Display images={props.imagenes.map((p) => withBase(p))}/>
                </div>  
        <Footer />
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
                            <Link to={`/${item.nombre}`} className='text-white text-9xl font-special-elite'>
                                <p>{item.nombre}</p>
                            </Link>
                            ))}
                        
                    </div>
                </div>
        </div>
    )
}

