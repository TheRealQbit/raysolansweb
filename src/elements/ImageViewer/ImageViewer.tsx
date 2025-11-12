import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ImageViewerProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  // State to hold the scroll position when the component mounts
  const [initialScrollTop, setInitialScrollTop] = useState(0);

  // Animate IN, block scroll, and capture initial scroll position
  useEffect(() => {
    // Capture the scroll position *before* blocking scroll
    const currentScrollY = window.scrollY;
    setInitialScrollTop(currentScrollY-window.outerHeight/1.255); // Center the overlay vertically

    // Block scroll on mount
    document.body.style.overflow = 'hidden';

    // GSAP Animations (untouched as requested)
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    tl.fromTo(imageRef.current, {
      scale: 0.9,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, "<");

    // Cleanup function: Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // Empty dependency array ensures this runs only on mount

  // Animate OUT and call onClose, also re-enable scroll if needed
  const handleClose = () => {
    // Re-enable scroll immediately on close attempt
    document.body.style.overflow = 'auto';

    // GSAP Animations (untouched as requested)
    const tl = gsap.timeline({
      onComplete: onClose // Call the passed onClose function after animation completes
    });

    tl.to(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, "<");
  };

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    // Cleanup listener on unmount
    return () => window.removeEventListener('keydown', handleEsc);
  }, []); // handleClose dependency isn't strictly necessary if it's stable, but added for correctness

  return (
    <div
      ref={overlayRef}
      // Apply Tailwind classes and inline styles
      className="z-50 bg-black bg-opacity-90 cursor-zoom-out"
      onClick={handleClose}
      style={{
        // --- CSS Changes for Scroll Position ---
        position: 'absolute',   // Changed from 'fixed' to 'absolute'
        top: `${initialScrollTop}px`, // Set top based on initial scroll position
        left: 0,
        right: 0,
        minHeight: '100vh',      // Ensure it covers at least the viewport height

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt || ''} // Provide default empty string for alt
        // Apply Tailwind classes and inline styles
        className="max-w-full max-h-full block" // Ensure image respects container bounds
        style={{
           // Max dimensions relative to viewport, keep user constraints
          maxWidth: '90vw',
          maxHeight: '90vh',
          // Scale and opacity are controlled by GSAP
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks on the image itself from closing the viewer
      />
    </div>
  );
};