import { useLayoutEffect , useRef } from 'react';

import gsap from 'gsap';
import "./NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const comp = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const t1 = gsap.timeline()
        t1.add("side")
        t1.set(".bar",{
          opacity: 0,
        }).set(".bar2",{
          opacity: 0,
        }).set(".bar3",{
          opacity: 0,
        }).set(".title",{
          transform: "translateY(-2rem)",
          opacity: 0,
        }).set(".title2",{
          transform: "translateY(-2rem)",
          opacity: 0,
        }).set(".title3",{
          transform: "translateY(-2rem)",
          opacity: 0,
        })
        .to(".title",{
          transform: "translateY(0rem)",
          delay: 1,
          opacity: 1,          
          duration: .5,
        }).to(".title2",{
          transform: "translateY(0rem)",
          opacity: 1,
          duration: .5,
        },"side").to(".title3",{
          transform: "translateY(0rem)",
          opacity: 1,
          duration: .5,
        },"side")

        const t2 = gsap.timeline()
        t2.pause();
        t2.add("side")
        .to(".title",{
          transform: "translateY(-.5rem)",          
          duration: .5,
        },"side").to(".bar",{
          opacity: 1,
          duration: .5,
        },"side")

        const t3 = gsap.timeline()

        t3.pause();
        t3.add("side")
        .to(".title2",{
          transform: "translateY(-.5rem)",          
          duration: .5,
        },"side").to(".bar2",{
          opacity: 1,
          duration: .5,
        },"side")

        const t4= gsap.timeline()

        t4.pause();
        t4.add("side")
        .to(".title3",{
          transform: "translateY(-.5rem)",          
          duration: .5,
        },"side").to(".bar3",{
          opacity: 1,
          duration: .5,
        },"side")

        const title = document.querySelector('.title')

        title?.addEventListener('mouseover', () => {
          t2.play()
        })
        title?.addEventListener('mouseleave', () => {
          t2.reverse()
        })

        const title2 = document.querySelector('.title2')

        title2?.addEventListener('mouseover', () => {
          t3.play()
        })
        title2?.addEventListener('mouseleave', () => {
          t3.reverse()
        })

        const title3 = document.querySelector('.title3')

        title3?.addEventListener('mouseover', () => {
          t4.play()
        })
        title3?.addEventListener('mouseleave', () => {
          t4.reverse()
        })

    }, comp)

    return() => ctx.revert()
}, [])
  return (
    <nav ref={comp}>
      <Link to="/" className="title">
        <div className='flex flex-row gap-.5 items-center'>
          <text className="-scale-x-100">R</text>
          <text>ay Solans</text>
        </div>
        <div className='bar'>          
          <div className='bg-slate-50 absolute w-full h-1 rounded'/>
        </div>
      </Link>
      <div className='flex flex-row items-end'>
        <Link to="/bio" className="title3">
          Biografía
          <div className='bar3'>
          <div className='bg-slate-50 w-full h-1 rounded '/>         
          </div>
        </Link>
        <Link to="/contact" className="title2">
          Contacto
          <div className='bar2'>
          <div className='bg-slate-50 w-full h-1 rounded '/>         
          </div>
        </Link>
      </div>      
    </nav>
  );
};