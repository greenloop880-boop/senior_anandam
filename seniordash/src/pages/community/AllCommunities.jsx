import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Search, SlidersHorizontal, X, ChevronLeft } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const DEMO_COMMUNITIES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80',
    title: 'The Gardens at Elm Creek',
    location: 'Maplewood, CA',
    type: 'Independent Living',
    price: 'From $2,800/mo',
    description: 'A peaceful neighborhood with beautiful homes, walking trails, and a welcoming community center.',
    rating: 4.9,
    reviews: 128,
    badge: 'Most Popular',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    title: 'Harbor View Estates',
    location: 'Seaside, CA',
    type: 'Assisted Living',
    price: 'From $3,400/mo',
    description: 'Coastal living with stunning views, resort-style amenities, and a full calendar of activities.',
    rating: 4.8,
    reviews: 96,
    badge: 'New',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    title: 'Willow Ridge Villas',
    location: 'Carmel Valley, CA',
    type: 'Independent Living',
    price: 'From $3,100/mo',
    description: 'Spacious villas in a quiet setting, offering comfort, privacy, and convenience.',
    rating: 4.7,
    reviews: 84,
    badge: null,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80',
    title: 'Sunrise Pines Retreat',
    location: 'Lake Tahoe, CA',
    type: 'Memory Care',
    price: 'From $4,200/mo',
    description: 'Nestled among towering pines with specialized memory care services and beautiful mountain scenery.',
    rating: 4.9,
    reviews: 61,
    badge: 'Top Rated',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    title: 'Magnolia Grove',
    location: 'Santa Barbara, CA',
    type: 'Assisted Living',
    price: 'From $3,600/mo',
    description: 'Elegant assisted living surrounded by blooming magnolias, with gourmet dining and wellness programs.',
    rating: 4.6,
    reviews: 109,
    badge: null,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    title: 'Oceanfront Senior Suites',
    location: 'Malibu, CA',
    type: 'Independent Living',
    price: 'From $5,000/mo',
    description: 'Premium ocean-view residences with concierge services, fine dining, and resort-style amenities.',
    rating: 5.0,
    reviews: 47,
    badge: 'Premium',
  },
];

const TYPES = ['All', 'Independent Living', 'Assisted Living', 'Memory Care'];

const badgeColors = {
  'Most Popular': { bg: '#e8f0fe', color: '#3b4b8a' },
  'New': { bg: '#e6f9f0', color: '#1a7a4a' },
  'Top Rated': { bg: '#fff8e1', color: '#b07d00' },
  'Premium': { bg: '#f3e8ff', color: '#7c3aed' },
};

const Stars = ({ rating }) => (
  <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
    {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
  </span>
);

const CommunityCard = ({ community, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(community)}
      style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 24px 60px rgba(47,57,102,0.14)' : '0 4px 24px rgba(0,0,0,0.07)',
        border: '1px solid #f0f0f0',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={community.image}
          alt={community.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }} />
        {community.badge && (
          <span style={{
            position: 'absolute', top: '14px', left: '14px',
            backgroundColor: badgeColors[community.badge]?.bg || '#e8f0fe',
            color: badgeColors[community.badge]?.color || '#3b4b8a',
            fontSize: '0.72rem', fontWeight: 700,
            padding: '4px 12px', borderRadius: '50px',
            letterSpacing: '0.04em',
          }}>
            {community.badge}
          </span>
        )}
        <span style={{
          position: 'absolute', bottom: '14px', left: '14px',
          backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
          color: '#3b4b8a', fontSize: '0.72rem', fontWeight: 700,
          padding: '4px 12px', borderRadius: '50px',
        }}>
          {community.type}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: "'Lora', serif", fontSize: '1.25rem', fontWeight: 700, color: '#1a2035', marginBottom: '0.4rem' }}>
          {community.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
          <MapPin size={13} style={{ flexShrink: 0 }} />
          <span>{community.location}</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
          {community.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a2035' }}>
              {(() => {
                const p = String(community.price || '');
                const isNum = /^\d+$/.test(p);
                const formatted = isNum ? new Intl.NumberFormat('en-IN').format(Number(p)) : p;
                const hasSym = p.includes('$') || p.includes('₹') || p.toLowerCase().includes('from');
                return (hasSym ? '' : '₹') + formatted;
              })()}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
              <Stars rating={community.rating} />
              <span style={{ fontSize: '0.8rem', color: '#888' }}>({community.reviews})</span>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            color: '#3b4b8a', fontSize: '0.875rem', fontWeight: 700,
          }}>
            Learn More <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AllCommunities = ({ onBack, openCommunity, initialParams }) => {
  const [communities, setCommunities] = useState(DEMO_COMMUNITIES);
  const [search, setSearch] = useState(initialParams?.location || '');
  const [activeType, setActiveType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (initialParams?.facilities?.length > 0) {
      setActiveType(initialParams.facilities[0]); // Simple mapping: first facility as type
    }
  }, [initialParams]);

  useEffect(() => {
    async function fetchCommunities() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .order('id', { ascending: true });

        if (!error && data?.length > 0) {
          setCommunities(data);
        }
      } catch (err) {
        console.error('Error fetching communities:', err);
      }
    }
    fetchCommunities();
  }, []);

  const filtered = communities.filter((c) => {
    const matchType = activeType === 'All' || c.type === activeType;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fc', fontFamily: "'Inter', 'Nunito', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a2035 0%, #2f3966 100%)',
        padding: '2rem 2rem 5rem 2rem',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>


          <span style={{
            display: 'block', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            Senior Living Communities
          </span>
          <h1 style={{
            fontFamily: "'Lora', serif", fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: 'white', marginBottom: '1rem', lineHeight: 1.2,
          }}>
            Find Your Perfect Community
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '540px' }}>
            Browse all {communities.length} senior living communities and find the home designed for your lifestyle.
          </p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div style={{ maxWidth: '1200px', margin: '-2rem auto 0', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'white', borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
          padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          {/* Search */}
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '12px 14px 12px 42px',
                border: '1.5px solid #e5e7eb', borderRadius: '10px',
                fontSize: '0.95rem', outline: 'none', color: '#1a2035',
                boxSizing: 'border-box', fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b4b8a'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            {search && (
              <X size={16} color="#9ca3af" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                onClick={() => setSearch('')} />
            )}
          </div>

          {/* Type Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '50px',
                  border: activeType === type ? 'none' : '1.5px solid #e5e7eb',
                  backgroundColor: activeType === type ? '#2f3966' : 'white',
                  color: activeType === type ? 'white' : '#555',
                  fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 2rem 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>
            Showing <strong style={{ color: '#1a2035' }}>{filtered.length}</strong> communities
            {activeType !== 'All' && <> in <strong style={{ color: '#3b4b8a' }}>{activeType}</strong></>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#888' }}>
            <Search size={48} color="#d1d5db" style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#555' }}>No communities found</p>
            <p style={{ fontSize: '0.9rem' }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '2rem',
          }}>
            {filtered.map((community) => (
              <CommunityCard key={community.id} community={community} onSelect={openCommunity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCommunities;
