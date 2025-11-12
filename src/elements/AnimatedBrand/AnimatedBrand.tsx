import React from 'react';
import './AnimatedBrand.css';

interface AnimatedBrandProps {
  onClick?: () => void;
  className?: string;
}

export const AnimatedBrand: React.FC<AnimatedBrandProps> = ({ onClick, className = '' }) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`animated-brand ${className}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className="animated-brand-text">
        <img src="/dark-theme-icon.svg" className="animated-brand-logo" alt="Ray Solans" />
        <span className="animated-brand-initial">R</span>
        <span className="animated-brand-name">ay Solans</span>
      </div>
      <div className="animated-brand-underline" />
    </div>
  );
};

export default AnimatedBrand;
