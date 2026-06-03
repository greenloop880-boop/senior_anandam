import React from 'react';
import './Footer.css';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = ({ setCurrentPage }) => {
  const navigate = (page) => {
    if (setCurrentPage) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer id="footer" className="footer-section">
      <div className="container">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="logo footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <img src={logoImg} alt="Senior Anandam Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="brand-desc">
              Helping seniors find comfortable homes and vibrant communities to enjoy life to the fullest.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('all-communities'); }}>Communities</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Floor Plans</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Services</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('about'); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Senior Living Guide</a></li>
              <li><a href="#">Financing Options</a></li>
              <li><a href="#">Frequently Asked Questions</a></li>
              <li><a href="#">Helpful Articles</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col contact-col">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <Phone size={16} className="contact-icon" />
                <span>9937291203</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span>info@senioranandam.com</span>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>101 Dharma Arched<br />Bhubaneswar, Odisha 751003</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Senior Anandam Properties. All rights reserved.</p>
          <div className="legal-links">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('privacy'); }}>Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('terms'); }}>Terms of Use</a>
            <span className="divider">|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('accessibility'); }}>Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
