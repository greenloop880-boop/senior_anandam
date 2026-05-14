import React, { useState, useEffect } from 'react';
import './CTA.css';
import { Phone } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CTA = () => {
  const [bgImage, setBgImage] = useState(() => {
    const cached = localStorage.getItem('cached_cta_bg');
    return cached ? cached : '';
  });

  useEffect(() => {
    async function fetchCtaBg() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'cta_bg_image')
          .single();
          
        if (!error && data?.value && typeof data.value === 'string') {
          setBgImage(data.value);
          localStorage.setItem('cached_cta_bg', data.value);
        }
      } catch (err) {
        console.error('Error fetching CTA bg image:', err);
      }
    }
    fetchCtaBg();
  }, []);

  // Use the fetched image, or fallback to the local default
  const backgroundStyle = bgImage ? { backgroundImage: `url(${bgImage})` } : {};

  return (
    <section id="get-in-touch" className="contact-section" style={backgroundStyle}>
      <div className="contact-overlay"></div>
      <div className="container contact-container">
        
        {/* Left Column: Information */}
        <div className="contact-info-col">
          <h2 className="contact-heading">Get in Touch to Learn More</h2>
          <div className="accent-line"></div>
          
          <div className="contact-text">
            <p>
              We're here to serve as your resource and guide as you explore Senior Anandam and your senior living options.
            </p>
            <p>
              Fill out the form and we will be in touch to help answer your questions and connect you with a local Senior Anandam community.
            </p>
            <p>
              We look forward to speaking with you.
            </p>
          </div>

          <div className="contact-phone-block">
            <h4 className="phone-label">PRICING & AVAILABILITY:</h4>
            <div className="phone-number">
              <Phone size={20} className="phone-icon" />
              <span>8144917996, 9937291203</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form-col">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="First Name *" required />
              <input type="text" placeholder="Last Name *" required />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email *" required />
              <input type="tel" placeholder="Phone *" required />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Pin Code *" required />
            </div>
            <div className="form-row">
              <select defaultValue="" required>
                <option value="" disabled hidden>How can we help you?</option>
                <option value="schedule_tour">Schedule a Tour</option>
                <option value="pricing_info">Pricing Information</option>
                <option value="general_inquiry">General Inquiry</option>
              </select>
            </div>
            <div className="form-row">
              <textarea placeholder="Comments" rows="4"></textarea>
            </div>
            <div className="form-row">
              <select defaultValue="" required>
                <option value="" disabled hidden>How did you hear about us?</option>
                <option value="search_engine">Search Engine</option>
                <option value="social_media">Social Media</option>
                <option value="friend_family">Friend or Family</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary submit-btn">Submit</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default CTA;
