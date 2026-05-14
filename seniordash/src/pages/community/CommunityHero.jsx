import React from 'react';
import { MapPin, Calendar, LayoutGrid, FileDown } from 'lucide-react';

const CommunityHero = ({ community, onTourClick }) => {
  const scrollToResidences = () => {
    const el = document.getElementById('residences');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="overview"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Hero Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${community.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          paddingTop: '7rem',
          paddingBottom: '12rem',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          {/* Subtitle badge */}
          <span
            style={{
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: '50px',
              backgroundColor: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginBottom: '1.25rem',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            {community.subtitle}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              margin: '0 0 1.25rem 0',
            }}
          >
            {community.name}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.75,
              marginBottom: '2rem',
              maxWidth: '520px',
            }}
          >
            {community.description}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button
              onClick={onTourClick}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', backgroundColor: '#2f3966',
                color: 'white', fontWeight: 700, borderRadius: '50px',
                border: 'none', cursor: 'pointer', fontSize: '1rem',
                fontFamily: "'Nunito', sans-serif",
                boxShadow: '0 4px 20px rgba(47,57,102,0.5)', transition: 'all 0.2s',
              }}
            >
              <Calendar size={18} />
              Schedule a Tour
            </button>
            <button
              onClick={scrollToResidences}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', backgroundColor: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)', color: 'white', fontWeight: 700,
                borderRadius: '50px', border: '1px solid rgba(255,255,255,0.4)',
                cursor: 'pointer', fontSize: '1rem', fontFamily: "'Nunito', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              <LayoutGrid size={18} />
              View Floor Plans
            </button>
            {community.brochure_url && (
              <a
                href={community.brochure_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', backgroundColor: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)', color: 'white', fontWeight: 700,
                  borderRadius: '50px', border: '1px solid rgba(255,255,255,0.35)',
                  cursor: 'pointer', fontSize: '1rem', fontFamily: "'Nunito', sans-serif",
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
              >
                <FileDown size={18} />
                Download Brochure
              </a>
            )}
          </div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.8)' }}>
            <MapPin size={18} />
            <span style={{ fontSize: '1rem', fontWeight: 500 }}>{community.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
