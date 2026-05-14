import React from 'react';
import { Heart, Users, Leaf, Shield, Waves, TreePine } from 'lucide-react';

const iconMap = { Heart, Users, Leaf, Shield, Waves, TreePine };

const FeatureHighlights = ({ features }) => {
  return (
    <section
      id="amenities"
      style={{
        position: 'relative',
        zIndex: 20,
        marginTop: '-6rem',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.7)',
            padding: '2.5rem 3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Heart;
            return (
              <div
                key={feature.title}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(47,57,102,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent size={22} color="#2f3966" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1rem', marginBottom: '4px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
