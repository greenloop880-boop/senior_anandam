import React from 'react';
import { Phone, Mail, Calendar } from 'lucide-react';

const TestimonialCTA = ({ testimonial, contact, onTourClick }) => {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        
        {/* Testimonial */}
        {testimonial && (
          <div style={{ flex: '1 1 500px' }}>
            <h3 style={{ fontSize: '2rem', color: '#2f3966', marginBottom: '1.5rem', fontFamily: "'Lora', serif" }}>
              What Our Residents Say
            </h3>
            <blockquote style={{ fontSize: '1.25rem', fontStyle: 'italic', color: '#555', marginBottom: '1rem', lineHeight: 1.6 }}>
              "{testimonial.quote || 'This community has been a wonderful place to live. The staff is caring and the amenities are top-notch.'}"
            </blockquote>
            <p style={{ fontWeight: 'bold', color: '#333' }}>
              - {testimonial.author || 'A Happy Resident'}
            </p>
          </div>
        )}

        {/* Contact/CTA */}
        <div className="mobile-p-15" style={{ flex: '1 1 400px', backgroundColor: '#f9f9f9', padding: '2.5rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#2f3966', marginBottom: '1rem', fontFamily: "'Lora', serif" }}>
            Ready to See for Yourself?
          </h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Schedule a personal tour to explore our beautiful campus, meet our staff, and discover if this is the right fit for you.
          </p>
          
          <button 
            onClick={onTourClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '1rem',
              backgroundColor: '#2f3966',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '1.5rem'
            }}
          >
            <Calendar size={20} />
            Schedule a Tour
          </button>

          {contact && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contact.phone && (
                <a href={`tel:${contact.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2f3966', textDecoration: 'none', fontWeight: 'bold' }}>
                  <Phone size={18} />
                  {contact.phone}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2f3966', textDecoration: 'none', fontWeight: 'bold' }}>
                  <Mail size={18} />
                  {contact.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCTA;
