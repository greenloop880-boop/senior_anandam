import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, FileText, Users, Utensils, TreePine, Calendar, HeartHandshake, ShieldCheck, Home, PawPrint, ArrowRight, CheckCircle2, BedDouble } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import TourModal from '../../components/TourModal';

// Fallback features if none provided in DB
const DEFAULT_FEATURES = [
  { icon: 'Users', title: 'Independent Living', desc: 'Freedom and flexibility with support when you need it.' },
  { icon: 'Utensils', title: 'Delicious Dining', desc: 'Fresh, chef-prepared meals in a warm, restaurant-style setting.' },
  { icon: 'TreePine', title: 'Beautiful Surroundings', desc: 'Peaceful, landscaped grounds with walking paths and gardens.' },
  { icon: 'Calendar', title: 'Engaging Activities', desc: 'A full calendar of events, classes, and opportunities to connect.' }
];

const ICONS_MAP = {
  Users: <Users size={28} color="#4f5e99" strokeWidth={1.5} />,
  Utensils: <Utensils size={28} color="#4f5e99" strokeWidth={1.5} />,
  TreePine: <TreePine size={28} color="#4f5e99" strokeWidth={1.5} />,
  Calendar: <Calendar size={28} color="#4f5e99" strokeWidth={1.5} />,
  HeartHandshake: <HeartHandshake size={28} color="#4f5e99" strokeWidth={1.5} />,
  ShieldCheck: <ShieldCheck size={28} color="#4f5e99" strokeWidth={1.5} />,
  Home: <Home size={28} color="#4f5e99" strokeWidth={1.5} />,
  PawPrint: <PawPrint size={28} color="#4f5e99" strokeWidth={1.5} />
};

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80'
];

const DEFAULT_FLOOR_PLANS = [
  { name: 'Studio Suite', size: '450 sq ft', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
  { name: 'One Bedroom Deluxe', size: '750 sq ft', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80' }
];

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  let videoId = '';
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const CommunityDetail = ({ community, onBack, openTourModal, isTourModalOpen, closeTourModal }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const title = community?.title || community?.name || 'The Gardens at Elm Creek';
  const location = community?.location || 'Maplewood, CA';
  const description = community?.description || 'A welcoming senior living community surrounded by nature, designed for comfort, connection, and peace of mind.';
  const image = community?.image || community?.heroImage || 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1200&q=80';
  
  // Dynamic fields from DB
  const features = community?.amenities || DEFAULT_FEATURES;
  const gallery = community?.gallery || DEFAULT_GALLERY;
  const floorPlans = community?.floor_plans || DEFAULT_FLOOR_PLANS;
  const aboutText = community?.about_text || `${title} offers independent living with the support and amenities you deserve. Enjoy a vibrant lifestyle with engaging activities, delicious dining, and beautiful surroundings.`;
  const quickFacts = community?.quick_facts || {
    type: community?.type || 'Independent Living',
    residences: '120',
    yearOpened: '2018',
    petFriendly: 'Yes'
  };

  const tabs = ['Overview', 'Amenities', 'Floor Plans', 'Gallery'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff', fontFamily: "'Inter', 'Nunito', sans-serif", color: '#333' }}>
      
      
      {/* Main Content Container */}
      <main className="mobile-p-15" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 2rem 4rem 2rem' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>
          <span style={{ cursor: 'pointer' }} onClick={onBack}>Home</span>
          <ChevronRight size={14} />
          <span style={{ cursor: 'pointer' }} onClick={onBack}>Communities</span>
          <ChevronRight size={14} />
          <span style={{ color: '#2f3966', fontWeight: '600' }}>{title}</span>
        </div>

        {/* Hero Section */}
        <div className="community-hero-layout">
          {/* Image */}
          <div style={{ flex: '1 1 500px' }}>
            <img 
              src={image} 
              alt={title} 
              className="community-hero-img" 
            />
          </div>
          
          {/* Details */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: '3rem', color: '#1a2035', marginBottom: '1rem', lineHeight: 1.15 }}>
              {title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 500 }}>
              <MapPin size={18} strokeWidth={2} />
              <span>{location}</span>
            </div>
            <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              {description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={openTourModal} style={btnPrimaryStyle}>Schedule a Tour</button>
              <button style={btnSecondaryStyle}>Download Brochure <FileText size={18} /></button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hide-scrollbar community-tabs-container">
          {tabs.map((tab) => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{
                paddingBottom: '1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem',
                color: activeTab === tab ? '#3b4b8a' : '#666',
                borderBottom: activeTab === tab ? '3px solid #3b4b8a' : '3px solid transparent',
                whiteSpace: 'nowrap', transition: 'all 0.2s', marginBottom: '-1px'
              }}>
              {tab}
            </div>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="community-tab-content">
            <div className="community-section-block">
              <h2 style={sectionTitleStyle}>About Our Community</h2>
              <p style={sectionTextStyle}>{aboutText}</p>
            </div>

            <div className="mobile-p-15" style={{ backgroundColor: '#f8f9fc', borderRadius: '20px', padding: '3.5rem' }}>
              <h3 style={{ ...sectionTitleStyle, fontSize: '1.8rem', marginBottom: '3rem' }}>Community Highlights & Amenities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '3rem 2rem' }}>
                {features.map((feature, idx) => (
                  <div key={idx}>
                    <div style={{ marginBottom: '1.25rem' }}>{ICONS_MAP[feature.icon] || <CheckCircle2 size={28} color="#4f5e99" strokeWidth={1.5} />}</div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2035', marginBottom: '0.6rem' }}>{feature.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.6 }}>{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Amenities' && (
          <div className="community-tab-content">
            <h2 style={sectionTitleStyle}>Luxury Amenities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
              {features.map((feature, idx) => (
                <div className="mobile-p-15" key={idx} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px' }}>
                  <div style={{ marginBottom: '1rem' }}>{ICONS_MAP[feature.icon] || <CheckCircle2 size={24} color="#3b4b8a" />}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{feature.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Floor Plans' && (
          <div className="community-tab-content">
            <h2 style={sectionTitleStyle}>Residences & Floor Plans</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', gap: '2rem' }}>
              {floorPlans.map((plan, idx) => (
                <div key={idx} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={plan.image} alt={plan.name} className="floor-plan-img" />
                  <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{plan.name}</h3>
                      <p style={{ color: '#888', fontSize: '0.85rem' }}>{plan.size}</p>
                    </div>
                    <button 
                      onClick={() => setEnlargedImage(plan.image)}
                      style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #3b4b8a', background: 'none', color: '#3b4b8a', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      Enlarge Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Gallery' && (
          <div className="community-tab-content">
            <h2 style={sectionTitleStyle}>Photo Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: '1.5rem' }}>
              {gallery.map((img, idx) => (
                <img key={idx} src={img} alt="Gallery" className="gallery-img" />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section Quick Facts & Video */}
        {activeTab === 'Overview' && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '4rem', 
            borderTop: '1px solid #eaeaea', 
            paddingTop: '4rem',
            alignItems: 'flex-start'
          }}>
            {/* Left side: Quick Facts */}
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={sectionTitleStyle}>Quick Facts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Fact icon={Home} label="Community Type" value={quickFacts.type} />
                <Fact icon={Users} label="Number of Residences" value={quickFacts.residences} />
                <Fact icon={Calendar} label="Year Opened" value={quickFacts.yearOpened} />
                <Fact icon={PawPrint} label="Pet Friendly" value={quickFacts.petFriendly} />
              </div>
            </div>

            {/* Right side: Video Tour */}
            <div style={{ flex: '1 1 500px' }}>
               <h2 style={sectionTitleStyle}>Community Video Tour</h2>
               <div style={{ 
                 width: '100%', 
                 aspectRatio: '16/9', 
                 borderRadius: '20px', 
                 overflow: 'hidden', 
                 boxShadow: '0 20px 50px rgba(47,57,102,0.2)',
                 backgroundColor: '#f0f2f8',
                 border: '8px solid white'
               }}>
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src={getEmbedUrl(community?.quick_facts?.video_url) || "https://www.youtube.com/embed/dvVXX-X47DA"} 
                   title="Community Tour Video" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   allowFullScreen
                   style={{ border: 'none' }}
                 ></iframe>
               </div>
            </div>
          </div>
        )}
      </main>

      
      <TourModal isOpen={isTourModalOpen} onClose={closeTourModal} selectedCommunity={community} />

      {/* Lightbox for Floor Plans */}
      {enlargedImage && (
        <div 
          onClick={() => setEnlargedImage(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 3000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '20px'
          }}
        >
          <img 
            src={enlargedImage} 
            alt="Enlarged Floor Plan" 
            style={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }} 
          />
          <button 
            style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => setEnlargedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

const Fact = ({ icon: Icon, label, value }) => (
  <div style={{ display: 'flex', gap: '1.25rem' }}>
    <Icon size={24} color="#4f5e99" strokeWidth={1.5} style={{ marginTop: '2px' }} />
    <div>
      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a2035', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '0.95rem', color: '#555' }}>{value}</div>
    </div>
  </div>
);

const sectionTitleStyle = { fontFamily: "'Lora', serif", fontSize: '2.2rem', color: '#1a2035', marginBottom: '1.5rem', fontWeight: 600 };
const sectionTextStyle = { color: '#444', lineHeight: 1.8, fontSize: '1.2rem', whiteSpace: 'pre-line' };
const btnPrimaryStyle = { backgroundColor: '#3b4b8a', color: 'white', padding: '12px 24px', borderRadius: '6px', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s', fontFamily: 'inherit' };
const btnSecondaryStyle = { backgroundColor: 'white', color: '#3b4b8a', padding: '12px 24px', borderRadius: '6px', border: '1px solid #3b4b8a', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background-color 0.2s', fontFamily: 'inherit' };

export default CommunityDetail;
