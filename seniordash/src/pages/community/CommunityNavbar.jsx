import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

const CommunityNavbar = ({ onBack, onTourClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Overview', id: 'overview' },
    { label: 'Residences', id: 'residences' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'FAQs', id: 'faqs' },
  ];

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    transition: 'all 0.3s ease',
    backgroundColor: scrolled ? '#ffffff' : '#2f3966',
    boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
  };

  return (
    <header style={navStyle}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          
          {/* Back button */}
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: scrolled ? '#2f3966' : '#ffffff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            <ChevronLeft size={18} />
            <span>Back to Communities</span>
          </button>

          {/* Spacer for center */}
          <div style={{ flex: 1 }}></div>

          {/* CTA */}
          <button
            onClick={onTourClick}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: "'Nunito', sans-serif",
              backgroundColor: scrolled ? '#2f3966' : '#ffffff',
              color: scrolled ? '#ffffff' : '#2f3966',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            Schedule a Tour
          </button>
        </div>
      </div>
    </header>
  );
};

export default CommunityNavbar;
