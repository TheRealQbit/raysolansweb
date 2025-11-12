import React, { useRef } from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
	const animatingRef = useRef(false);

	const handleScrollTop = () => {
		if (animatingRef.current) return;
		animatingRef.current = true;

		const fadeDuration = 300; // ms (keep in sync with CSS)
		const safetyTimeout = 1500; // ms, in case scroll event doesn't fire

		// Create a temporary overlay to fade in/out during scroll
		const overlay = document.createElement('div');
		overlay.className = 'scroll-fade-overlay';
		document.body.appendChild(overlay);

		// Force reflow then show (fade in)
		void overlay.offsetHeight; // reflow
		overlay.classList.add('visible');

		const cleanup = () => {
			const onTransitionEnd = () => {
				overlay.removeEventListener('transitionend', onTransitionEnd);
				if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
				animatingRef.current = false;
			};
			overlay.addEventListener('transitionend', onTransitionEnd, { once: true });
			// Fallback in case transitionend doesn’t fire
			setTimeout(onTransitionEnd, fadeDuration + 120);
		};

		const fadeOutAndCleanup = () => {
			overlay.classList.remove('visible'); // fade out
			cleanup();
		};

		const onScroll = () => {
			if (window.scrollY <= 2) {
				window.removeEventListener('scroll', onScroll);
				// Small delay before fading out to feel smoother
				setTimeout(fadeOutAndCleanup, 50);
			}
		};

		window.addEventListener('scroll', onScroll);

		// Initiate smooth scroll
		try {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch {
			window.scrollTo(0, 0);
			onScroll();
		}

		// Safety cleanup in case scroll doesn't reach top (or old browsers)
		setTimeout(() => {
			window.removeEventListener('scroll', onScroll);
			fadeOutAndCleanup();
		}, safetyTimeout);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleScrollTop();
		}
	};

	return (
		<footer className="footer-container">
			<div className="footer-content">
				<div
					className="footer-brand"
					role="button"
					tabIndex={0}
					aria-label="Back to top"
					onClick={handleScrollTop}
					onKeyDown={handleKeyDown}
				>
					<div className="footer-brand-text">
                        <img src="/dark-theme-icon.svg" className="footer-logo" />
						<span className="footer-initial">R</span>
						<span className="footer-name">ay Solans</span>
					</div>
					<div className="footer-underline" />
				</div>

				<div className="footer-meta">
					<span className="footer-copy">© Ray Solans 2025</span>
					<span className="footer-bullet" aria-hidden>
						•
					</span>
					<span className="footer-designed">designed by Yago Martinez de Fuenmayor</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
