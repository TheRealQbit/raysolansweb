import { useLayoutEffect , useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Gallery from '../elements/Gallery/gallery';
import { NavBar } from '../elements/NavBar/NavBar';
import Section from "../elements/Section/section";
import { Link } from "react-router-dom";
import { Button } from '../elements/Button/Button';
import { Item } from '../App';
import Footer from '../elements/Footer/Footer';
import { withBase } from '../functions';

const images = import.meta.glob('../../public/assets/Onboarding/*.{png,jpg,jpeg,svg,js,ts,tsx}', { eager: true });

const imgArray = Object.keys(images).map((file: string) => withBase(file.replace('../../public', '')));

export default function Onboarding() {
    const comp = useRef(null);
    const page = useRef(null);
    const menu = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
            <div className='bg-black w-screen' ref={comp}>
            <div className="loading-container h-screen flex justify-center items-center">
                <div className="loading-screen">
                    <div className="flex flex-row items-center p">
                        <text className="r">R</text>
                        <text className="loading-words">ay Solans</text>
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
                    <NavBar />
                    <div className='gradient'/>
                    <Gallery imgArray={imgArray}/>
                    <div className="flex flex-col items-start w-screen">
                        <div className="bg-black pt-12 pl-10 md:pl-20">
                            <div className="flex flex-col justify-center">
                                <p className="text-white hero-heading-large font-bold font-special-elite">
                                    IMÁGENES
                                </p>
                                <p className="text-white hero-heading-small font-special-elite">
                                    que
                                </p>
                                <p className="text-white hero-heading-large font-special-elite">
                                    TRANSCIENDEN
                                </p>
                            </div>
                        </div>
                    </div>
                    <Section/>
                    <Footer />
                </div>
                <div className={`side-menu ${isMenuOpen ? 'open' : ''}`} ref={menu}>
                    <button className="close-button" onClick={toggleMenu}>
                    &times;
                    </button>
                    <div className="menu-content"> 
                        <Link to="/contact" className="text-white">
                            Contacto
                        </Link>
                        {data.map((item) =>(
                            <Link to={`/${item.nombre}`} className='text-white'>
                                <p>{item.nombre}</p>
                            </Link>
                            ))}
                        
                    </div>
                </div>
        </div>
    )
}