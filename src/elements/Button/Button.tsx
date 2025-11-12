import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "./button.css";

interface ButtonProps {
  onClick: () => void;
  isMenuOpen: boolean;
}

export const Button = ({ onClick, isMenuOpen }: ButtonProps) => {
  const comp = useRef(null);
  const schize = useRef(null);
  const schize1 = useRef(null);

  // Scale animation on scroll
  useEffect(() => {
    const el = comp.current;
    gsap.fromTo(
      el,
      { scale: 0 },
      {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          start: "+=100wh",
          scrub: 1,
          trigger: el,
        },
      }
    );
  }, []);

  // Line animation on menu toggle
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({ defaults: { duration: 0.8, ease: "Power4.easeInOut" } });

      t1.add("toggleMenu");

      if (isMenuOpen) {
        t1.to(schize.current, { rotation: 45, y: 10 }, "toggleMenu").to(
          schize1.current,
          { rotation: -45, y: -10 },
          "toggleMenu"
        );
      } else {
        t1.to(schize.current, { rotation: 0, y: 0 }, "toggleMenu").to(
          schize1.current,
          { rotation: 0, y: 0 },
          "toggleMenu"
        );
      }
    });

    return () => ctx.revert();
  }, [isMenuOpen]);

  return (
    <div className="menu-btn" onClick={onClick} ref={comp}>
      <div className="menu-btn-container">
        <div className="menu-lines-wrapper">
          <div className="menu-line menu-line-1" ref={schize}></div>
          <div className="menu-line menu-line-2" ref={schize1}></div>
        </div>
      </div>
    </div>
  );
};
