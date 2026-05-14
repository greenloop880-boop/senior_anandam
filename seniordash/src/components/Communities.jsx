import React, { useState, useEffect } from 'react';

import './Communities.css';
import { ArrowRight, MapPin } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEMO_COMMUNITIES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80',
    title: 'The Gardens at Elm Creek',
    location: 'Maplewood, CA',
    description: 'A peaceful neighborhood with beautiful homes, walking trails, and a welcoming community center.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    title: 'Harbor View Estates',
    location: 'Seaside, CA',
    description: 'Coastal living with stunning views, resort-style amenities, and a full calendar of activities.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    title: 'Willow Ridge Villas',
    location: 'Carmel Valley, CA',
    description: 'Spacious villas in a quiet setting, offering comfort, privacy, and convenience.'
  }
];

const Communities = ({ openCommunity, openAllCommunities }) => {
  const [communities, setCommunities] = useState(DEMO_COMMUNITIES);

  useEffect(() => {
    async function fetchCommunities() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .order('id', { ascending: true })
          .limit(3); // Featured limit

        if (!error && data?.length > 0) {
          setCommunities(data);
        }
      } catch (err) {
        console.error('Error fetching communities:', err);
      }
    }
    fetchCommunities();
  }, []);

  return (
    <section className="communities-section section-padding">
      <div className="container">
        <div className="communities-layout">
          {/* Left Column - Header */}
          <div className="communities-header">
            <h5 className="section-subtitle">FEATURED COMMUNITIES</h5>
            <h2 className="section-title">Communities Designed for Your Lifestyle</h2>
            <p className="section-desc">
              From active adult communities to independent living with support options, find the perfect fit for your next chapter.
            </p>
            <button className="btn btn-primary" onClick={openAllCommunities}>View All Communities</button>
          </div>

          {/* Right Column - Cards */}
          <div className="communities-grid">
            {communities.map((community) => (
              <div
                className="community-card"
                key={community.id}
                style={{ cursor: 'pointer' }}
                onClick={() => openCommunity(community)}
              >
                <div className="card-image-wrapper">
                  <img src={community.image || community.heroImage} alt={community.title} className="card-image" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{community.title}</h3>
                  <p className="card-location">
                    <MapPin size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                    {community.location}
                  </p>
                  <p className="card-desc">{community.description}</p>
                  <span
                    className="card-link"
                    onClick={(e) => { e.stopPropagation(); openCommunity(community); }}
                  >
                    Learn More <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Communities;
