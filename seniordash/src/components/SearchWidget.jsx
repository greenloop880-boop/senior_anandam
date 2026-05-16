import React, { useState, useRef, useEffect } from 'react';
import './SearchWidget.css';
import { BedDouble, MapPin, Search, ChevronDown, Check, Home, User, Users, Star, Sun, Shield, Activity, X, Key } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEFAULT_FACILITY_OPTIONS = [
  "Independent Living", "Assisted Living", "Memory Care", "Skilled Nursing",
  "Rehabilitation Care", "Retirement Community", "Luxury Senior Living",
  "Continuing Care Retirement Community (CCRC)", "Day Care Services", "Respite Care"
];

const DEFAULT_LOCATION_OPTIONS = [
  "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Chennai", 
  "Delhi NCR", "Kolkata", "Ahmedabad", "Bhubaneswar", "Goa"
];

const roomOptions = [
  { name: "Studio Apartment", icon: Home },
  { name: "1 BHK / One Bedroom", icon: BedDouble },
  { name: "2 BHK / Two Bedroom", icon: BedDouble },
  { name: "Shared Room", icon: Users },
  { name: "Private Room", icon: User },
  { name: "Deluxe Suite", icon: Star },
  { name: "Premium Suite", icon: Star },
  { name: "Garden View Room", icon: Sun },
  { name: "Poolside Room", icon: Activity },
  { name: "Accessible Room", icon: Shield }
];

const SearchWidget = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [facilityOptions, setFacilityOptions] = useState(DEFAULT_FACILITY_OPTIONS);
  const [locationOptions, setLocationOptions] = useState(DEFAULT_LOCATION_OPTIONS);
  const [dynamicRoomOptions, setDynamicRoomOptions] = useState(roomOptions);
  
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [maxCharge, setMaxCharge] = useState(100000);
  const [dropdownDirection, setDropdownDirection] = useState('down');
  
  const facilityRef = useRef(null);
  const roomRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    async function fetchDynamicOptions() {
      if (!isSupabaseConfigured) return;
      try {
        // Fetch locations from communities
        const { data: communityData } = await supabase.from('communities').select('location');
        if (communityData) {
          const locs = [...new Set(communityData.map(c => c.location))].filter(Boolean);
          if (locs.length > 0) setLocationOptions(locs);
        }

        // Fetch categories from categories table
        const { data: categoryData } = await supabase.from('categories').select('name, category_group');
        if (categoryData) {
          const facilities = categoryData.filter(c => c.category_group === 'facility').map(c => c.name);
          const rooms = categoryData.filter(c => c.category_group === 'room').map(c => ({ name: c.name, icon: Home }));
          
          if (facilities.length > 0) setFacilityOptions(facilities);
          // If we have dynamic rooms, we merge them with default ones or replace
          if (rooms.length > 0) {
            const mergedRooms = rooms.map(dr => {
              const defaultRoom = roomOptions.find(r => r.name === dr.name);
              return defaultRoom ? defaultRoom : dr;
            });
            setDynamicRoomOptions(mergedRooms);
          }
        }
      } catch (err) {
        console.error('SearchWidget options fetch error:', err);
      }
    }
    fetchDynamicOptions();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setDropdownDirection('down');
      else if (window.scrollY < lastScrollY) setDropdownDirection('up');
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (facilityRef.current && !facilityRef.current.contains(event.target)) setIsFacilityOpen(false);
      if (roomRef.current && !roomRef.current.contains(event.target)) setIsRoomOpen(false);
      if (locationRef.current && !locationRef.current.contains(event.target)) setIsLocationOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = (setter, currentState) => {
    setter(!currentState);
  };

  const toggleFacility = (facility) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
    setIsFacilityOpen(false);
  };

  const toggleRoom = (room) => {
    setSelectedRooms(prev => 
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    );
    setIsRoomOpen(false);
  };

  const filteredLocations = locationOptions.filter(loc => 
    loc.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch({
        facilities: selectedFacilities,
        rooms: selectedRooms,
        location: locationQuery,
        maxCharge: maxCharge,
        activeTab: activeTab
      });
    }
  };

  return (
    <div className="search-widget-container">
      <div className="search-widget">
        <div className="search-tabs">
          <button 
            className={`search-tab ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            <Home size={20} strokeWidth={1.5} className="tab-icon" />
            <span>Buy</span>
          </button>
          <button 
            className={`search-tab ${activeTab === 'rent' ? 'active' : ''}`}
            onClick={() => setActiveTab('rent')}
          >
            <Key size={20} strokeWidth={1.5} className="tab-icon" />
            <span>Rent</span>
          </button>
        </div>
        
        <div className="search-body">
          {/* Row 1 */}
          <div className="search-field" ref={facilityRef}>
            <div className="field-input-group" onClick={() => handleDropdownClick(setIsFacilityOpen, isFacilityOpen)}>
              <input 
                type="text" 
                placeholder="Facility Type" 
                readOnly 
                className="dropdown-input" 
                value={selectedFacilities.length > 0 ? `${selectedFacilities.length} Selected` : ''}
              />
              <ChevronDown size={18} strokeWidth={1.5} className={`field-icon dropdown-icon ${isFacilityOpen ? 'open' : ''}`} />
            </div>
            {isFacilityOpen && (
              <div className={`custom-dropdown-menu direction-${dropdownDirection}`}>
                {facilityOptions.map(facility => (
                  <div 
                    key={facility} 
                    className={`dropdown-item ${selectedFacilities.includes(facility) ? 'selected' : ''}`}
                    onClick={() => toggleFacility(facility)}
                  >
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="search-field" ref={roomRef}>
            <div className="field-input-group" onClick={() => handleDropdownClick(setIsRoomOpen, isRoomOpen)}>
              <input 
                type="text" 
                placeholder="Room Type" 
                readOnly 
                className="dropdown-input" 
                value={selectedRooms.length > 0 ? `${selectedRooms.length} Selected` : ''}
              />
              <ChevronDown size={18} strokeWidth={1.5} className={`field-icon dropdown-icon ${isRoomOpen ? 'open' : ''}`} />
            </div>
            {isRoomOpen && (
              <div className={`custom-popover room-popover direction-${dropdownDirection}`}>
                <div className="popover-header">
                  <h4>Select Room Types</h4>
                  <button className="close-btn" onClick={() => setIsRoomOpen(false)}><X size={16} strokeWidth={1.5} /></button>
                </div>
                <div className="room-cards-grid">
                  {dynamicRoomOptions.map((room) => {
                    const Icon = room.icon;
                    const isSelected = selectedRooms.includes(room.name);
                    return (
                      <div 
                        key={room.name} 
                        className={`room-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleRoom(room.name)}
                      >
                        <Icon size={24} strokeWidth={1.5} className="room-icon" />
                        <span className="room-name">{room.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Row 2 */}
          <div className="search-field" ref={locationRef}>
            <div className="field-input-group">
              <input 
                type="text" 
                placeholder="Location" 
                className="text-input" 
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setIsLocationOpen(true);
                }}
                onFocus={() => handleDropdownClick(setIsLocationOpen, false)}
              />
              <MapPin size={18} strokeWidth={1.5} className="field-icon" />
            </div>
            {isLocationOpen && filteredLocations.length > 0 && (
              <div className={`custom-dropdown-menu direction-${dropdownDirection}`}>
                {filteredLocations.map(loc => (
                  <div 
                    key={loc} 
                    className="dropdown-item"
                    onClick={() => {
                      setLocationQuery(loc);
                      setIsLocationOpen(false);
                    }}
                  >
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="search-field slider-field">
            <div className="slider-header">
              <span className="slider-label">Monthly Charges (Up to)</span>
              <span className="slider-value">₹{(maxCharge).toLocaleString('en-IN')}</span>
            </div>
            <div className="slider-container">
              <input 
                type="range" 
                min="25000" 
                max="300000" 
                step="25000" 
                value={maxCharge} 
                onChange={(e) => setMaxCharge(parseInt(e.target.value))}
                className="range-slider"
              />
            </div>
          </div>
          
          <div className="search-action">
            <button className="btn-search-submit" onClick={handleSearchSubmit}>
              <Search size={18} strokeWidth={2} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;
