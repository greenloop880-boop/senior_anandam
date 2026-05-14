import React, { useState, useEffect } from 'react';
import './CityGrid.css';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  AhmedabadIcon,
  BangaloreIcon,
  ChennaiIcon,
  DelhiIcon,
  HyderabadIcon,
  JaipurIcon,
  KolkataIcon,
  LucknowIcon,
  MumbaiIcon,
  PuneIcon
} from './CityIcons';

const ICON_MAP = {
  'Ahmedabad': AhmedabadIcon,
  'Bangalore': BangaloreIcon,
  'Bengaluru': BangaloreIcon,
  'Chennai': ChennaiIcon,
  'Delhi': DelhiIcon,
  'Delhi NCR': DelhiIcon,
  'Hyderabad': HyderabadIcon,
  'Jaipur': JaipurIcon,
  'Kolkata': KolkataIcon,
  'Lucknow': LucknowIcon,
  'Mumbai': MumbaiIcon,
  'Pune': PuneIcon
};

const DEFAULT_CITIES = [
  { name: 'Ahmedabad', icon: AhmedabadIcon },
  { name: 'Bangalore', icon: BangaloreIcon },
  { name: 'Chennai', icon: ChennaiIcon },
  { name: 'Delhi', icon: DelhiIcon },
  { name: 'Hyderabad', icon: HyderabadIcon },
  { name: 'Jaipur', icon: JaipurIcon },
  { name: 'Kolkata', icon: KolkataIcon },
  { name: 'Lucknow', icon: LucknowIcon },
  { name: 'Mumbai', icon: MumbaiIcon },
  { name: 'Pune', icon: PuneIcon }
];

const CityGrid = () => {
  const [cities, setCities] = useState(DEFAULT_CITIES);

  useEffect(() => {
    async function fetchActiveCities() {
      if (!isSupabaseConfigured) return;
      try {
        // Fetch unique locations from communities
        const { data, error } = await supabase
          .from('communities')
          .select('location');
          
        if (!error && data?.length > 0) {
          const uniqueLocations = [...new Set(data.map(c => c.location))];
          const dynamicCities = uniqueLocations.map(loc => ({
            name: loc,
            icon: ICON_MAP[loc] || MumbaiIcon // Fallback icon
          }));
          
          // Merge with defaults to ensure we have icons if possible
          if (dynamicCities.length > 0) {
            setCities(dynamicCities);
          }
        }
      } catch (err) {
        console.error('Error fetching active cities:', err);
      }
    }
    fetchActiveCities();
  }, []);

  return (
    <section className="city-section section-padding">
      <div className="container">
        
        <div className="search-header-container">
          <h2 className="main-search-title">Find Retirement Homes in India</h2>
          <div className="search-input-wrapper">
            <input type="text" placeholder="Search a senior home or city" className="city-search-input" />
          </div>
          <button className="btn-browse">Browse</button>
        </div>

        <div className="city-box">
          <h2 className="city-box-title">Find retirement homes by City</h2>
          
          <div className="city-grid">
            {cities.map((city, index) => {
              const Icon = city.icon;
              return (
                <div className="city-card" key={index}>
                  <div className="city-icon-wrapper">
                    <Icon size={48} strokeWidth={1.2} className="city-icon" />
                  </div>
                  <span className="city-name">{city.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CityGrid;
