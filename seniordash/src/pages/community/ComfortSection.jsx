import React from 'react';
import { ArrowRight } from 'lucide-react';

const ComfortSection = ({ comfortImages, onTourClick }) => {
  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: '#f6f6f4' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#2f3966',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Senior Living
          </span>
          <h2
            style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.25,
              marginBottom: '1.5rem',
            }}
          >
            Designed for Comfort and Connection
          </h2>
          <p
            style={{
              color: '#6b7280',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}
          >
            We believe life should be celebrated at every stage. Our community offers the perfect blend of independence and support, with a wide range of services and amenities to help you live your best life.
          </p>
          <button
            onClick={onTourClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: '#2f3966',
              color: 'white',
              fontWeight: 700,
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: "'Nunito', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            Explore Amenities <ArrowRight size={18} />
          </button>
        </div>

        {/* Right – 3 image cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {comfortImages.map((item, i) => (
            <div
              key={item.title}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                  aspectRatio: '3/4',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  loading="lazy"
                />
              </div>
              <h4 style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '0.9rem', marginBottom: '4px' }}>
                {item.title}
              </h4>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComfortSection;
