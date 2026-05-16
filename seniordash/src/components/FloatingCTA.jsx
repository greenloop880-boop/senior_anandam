import React, { useState, useEffect } from 'react';
import './FloatingCTA.css';
import { PhoneCall, X } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Show the CTA after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const section = document.getElementById('get-in-touch');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isDismissed) return null;

  return (
    <div className={`floating-cta-wrapper ${isVisible ? 'visible' : ''}`}>
      <div className="floating-cta-content">
        <div className="floating-cta-text">
          <span className="floating-cta-question">Need help choosing a community?</span>
        </div>
        <button className="btn-advisor" onClick={scrollToContact}>
          <PhoneCall size={18} />
          <span className="btn-advisor-text">Get in touch</span>
        </button>
        <button className="btn-close-cta" onClick={() => setIsDismissed(true)} aria-label="Close">
          <X size={24} color="#666" />
        </button>
      </div>
    </div>
  );
};

export default FloatingCTA;
