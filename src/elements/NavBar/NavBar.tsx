import { useLayoutEffect , useRef } from 'react';

import gsap from 'gsap';
import "./NavBar.css";
import { Link } from "react-router-dom";

interface NavBarProps {
  onMenuClick?: () => void;
}

export const NavBar = ({ onMenuClick }: NavBarProps) => {
  const comp = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const t1 = gsap.timeline()
        
        // Initial state - hide navbar
        t1.set(".navbar-container", {
          y: -100,
          opacity: 0,
        })
        // Animate in
        .to(".navbar-container", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: "Power3.easeOut"
        })

        // Hover animations for nav items
        const createHoverAnimation = (selector: string) => {
          const tl = gsap.timeline({ paused: true });
          // Set initial state
          tl.set(`${selector} .nav-item-underline`, {
            scaleX: 0
          })
          .to(`${selector} .nav-item-text`, {
            y: -2,
            duration: 0.2,
            ease: "Power2.easeOut"
          })
          .to(`${selector} .nav-item-underline`, {
            scaleX: 1,
            duration: 0.3,
            ease: "Power2.easeOut"
          }, 0);

          const element = document.querySelector(selector);
          element?.addEventListener('mouseenter', () => tl.play());
          element?.addEventListener('mouseleave', () => tl.reverse());
        };

        createHoverAnimation('.nav-brand');
        createHoverAnimation('.nav-contact');

    }, comp);

    return () => ctx.revert();
}, [])

  return (
    <nav ref={comp} className='navbar-container'>
      <div className='navbar-content'>
        <Link to="/" className="nav-brand nav-item">
          <div className="nav-item-text">
            <img src="/dark-theme-icon.svg" className="nav-logo" />
            <span className="nav-initial">R</span>
            <span className="nav-name">ay Solans</span>
          </div>
          <div className="nav-item-underline" />
        </Link>
        
        <div className='navbar-actions'>
          <Link to="/contact" className="nav-contact nav-item">
            <div className="nav-item-text font-special-elite">Contacto</div>
            <div className='nav-item-underline'></div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="nav-menu-btn" 
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <div className="menu-lines-wrapper">
              <div className="menu-line menu-line-1"></div>
              <div className="menu-line menu-line-2"></div>
            </div>
          </button>
        </div>      
      </div>
    </nav>
  );
};