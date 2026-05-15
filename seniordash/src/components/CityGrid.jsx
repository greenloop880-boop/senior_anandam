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

const METRO_CITIES = [
  { name: 'Mumbai', icon: MumbaiIcon },
  { name: 'Delhi', icon: DelhiIcon },
  { name: 'Bangalore', icon: BangaloreIcon },
  { name: 'Hyderabad', icon: HyderabadIcon },
  { name: 'Chennai', icon: ChennaiIcon },
  { name: 'Kolkata', icon: KolkataIcon },
  { name: 'Pune', icon: PuneIcon },
  { name: 'Ahmedabad', icon: AhmedabadIcon },
  { name: 'Lucknow', icon: LucknowIcon },
  { name: 'Bhubaneswar', icon: MumbaiIcon } // Using MumbaiIcon as fallback since BhubaneswarIcon doesn't exist
];

const CityGrid = ({ onCityClick }) => {
  const [cities, setCities] = useState(METRO_CITIES);
  const [searchInput, setSearchInput] = useState('');

  const handleBrowse = () => {
    if (onCityClick) onCityClick(searchInput);
  };

  return (
    <section className="city-section section-padding">
      <div className="container">
        
        <div className="search-header-container">
          <h2 className="main-search-title">Find Retirement Homes in India</h2>
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Search a senior home or city" 
              className="city-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBrowse()}
            />
          </div>
          <button className="btn-browse" onClick={handleBrowse}>Browse</button>
        </div>

        <div className="city-box">
          <h2 className="city-box-title">Find retirement homes by City</h2>
          
          <div className="city-grid">
            {cities.map((city, index) => {
              const Icon = city.icon;
              return (
                <div 
                  className="city-card" 
                  key={index}
                  onClick={() => onCityClick && onCityClick(city.name)}
                  style={{ cursor: 'pointer' }}
                >
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
