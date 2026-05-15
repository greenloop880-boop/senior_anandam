import React from 'react';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const Navbar = ({ currentPage, setCurrentPage, openTourModal }) => {
  const goTo = (page) => {
    if (setCurrentPage) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const legalPages = ['terms', 'privacy', 'accessibility'];
  const isDarkPage = currentPage === 'home-modification' || legalPages.includes(currentPage);

  const scrollToFooter = (e) => {
    e.preventDefault();
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`navbar-wrapper ${isDarkPage ? 'navbar-dark' : ''}`}>
      {/* Main Nav */}
      <nav className="main-nav">
        <div className="container nav-inner">
          {/* Logo — click to go Home */}
          <div className="logo" onClick={() => goTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoImg} alt="Senior Anandam Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('home'); }} className="active">Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('all-communities'); }}>Communities</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('home-modification'); }}>Services</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('about'); }}>About Us</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goTo('home'); }}>Resources</a></li>
            <li><a href="#" onClick={scrollToFooter}>Contact</a></li>
          </ul>

          <button className="btn btn-primary" onClick={openTourModal}>Schedule a Tour</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
