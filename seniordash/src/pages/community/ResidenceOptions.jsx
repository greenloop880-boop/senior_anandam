import React from 'react';
import { Bath, ChefHat, ArrowRight, Maximize2 } from 'lucide-react';

const amenityIconMap = {
  '1 Bath': Bath,
  '1–2 Bath': Bath,
  'Kitchenette': ChefHat,
  'Kitchen': ChefHat,
};

const ResidenceCard = ({ res }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.07)',
        border: '1px solid #f0f0f0',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={res.image}
          alt={res.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            color: '#2f3966',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '50px',
          }}
        >
          {res.title}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>
          {(() => {
            const p = String(res.price || '');
            const isNum = /^\d+$/.test(p);
            const formatted = isNum ? new Intl.NumberFormat('en-IN').format(Number(p)) : p;
            const hasSym = p.includes('$') || p.includes('₹') || p.toLowerCase().includes('from');
            return (hasSym ? '' : '₹') + formatted;
          })()}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
          <Maximize2 size={14} color="#2f3966" />
          <span>{res.sqft}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
          {res.amenities.map((amenity) => {
            const Icon = amenityIconMap[amenity] || ChefHat;
            return (
              <span
                key={amenity}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  backgroundColor: '#f6f6f4',
                  color: '#4b5563',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: '50px',
                }}
              >
                <Icon size={12} color="#2f3966" />
                {amenity}
              </span>
            );
          })}
        </div>

        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#2f3966',
            fontSize: '0.875rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          View Floor Plan <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
};

const ResidenceOptions = ({ residences }) => {
  return (
    <section id="residences" style={{ padding: '6rem 2rem', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#2f3966',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              Residence Options
            </span>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                fontWeight: 700,
                color: '#1a1a2e',
                lineHeight: 1.25,
                marginBottom: '0.75rem',
              }}
            >
              Find the Right Home for You
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '520px' }}>
              Choose from a variety of spacious floor plans designed with your comfort and convenience in mind.
            </p>
          </div>
          <a
            href="#"
            style={{
              color: '#2f3966',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            View All Floor Plans <ArrowRight size={16} />
          </a>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem',
          }}
        >
          {residences.map((res) => (
            <ResidenceCard key={res.title} res={res} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResidenceOptions;
