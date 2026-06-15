import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const Navbar = ({ currentPage, setCurrentPage, openTourModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const goTo = (page) => {
    if (setCurrentPage) setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // const legalPages = ['terms', 'privacy', 'accessibility'];
  // const isDarkPage = currentPage === 'home-modification' || legalPages.includes(currentPage);

  const scrollToFooter = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar-wrapper">
      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Main Nav */}
      <nav className="main-nav">
        <div className="container nav-inner">
          {/* Logo — click to go Home */}
          <div className="logo" onClick={() => goTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoImg} alt="Senior Anandam Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            {/* Drawer Close Button */}
            <li className="mobile-only drawer-close-wrapper">
              <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <X size={28} color="white" />
              </button>
            </li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('home'); }} className={currentPage === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('all-communities'); }} className={currentPage === 'all-communities' || currentPage === 'community-detail' ? 'active' : ''}>Communities</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('home-modification'); }} className={currentPage === 'home-modification' ? 'active' : ''}>Services</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('about'); }} className={currentPage === 'about' ? 'active' : ''}>About Us</a></li>
            <li><a href="https://stately-treacle-b7a6bf.netlify.app/" target="_blank" rel="noopener noreferrer">HealthLive</a></li>
            <li><a href="https://senioranandam.com" target="_blank" rel="noopener noreferrer" className="shop-now-highlight">Shop Now <ArrowUpRight size={18} /></a></li>
            <li><a href="#" onClick={scrollToFooter}>Contact</a></li>
            <li className="mobile-only">
              <button className="btn btn-primary w-full" onClick={() => { openTourModal(); setIsMenuOpen(false); }}>Schedule a Tour</button>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="btn btn-primary desktop-tour-btn" onClick={openTourModal}>Schedule a Tour</button>
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={28} color="var(--primary-color)" /> : <Menu size={28} color="var(--primary-color)" />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
