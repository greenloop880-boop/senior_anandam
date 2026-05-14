import React from 'react';
import { ArrowLeft } from 'lucide-react';

const CommunityFooter = ({ communityName, onBack }) => {
  return (
    <footer style={{ backgroundColor: '#1a1f36', color: 'white', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        
        <div>
          <h2 style={{ fontSize: '1.5rem', fontFamily: "'Lora', serif", marginBottom: '0.5rem' }}>
            {communityName || 'Senior Community'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Empowering seniors to live their best lives.
          </p>
        </div>

        <div>
          <button 
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={18} />
            Back to All Communities
          </button>
        </div>

      </div>
      
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Senior Anandam. All rights reserved.
      </div>
    </footer>
  );
};

export default CommunityFooter;
