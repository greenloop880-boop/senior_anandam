import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Heart } from 'lucide-react';
import SearchWidget from './SearchWidget';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEMO_HERO_IMAGES = [
  "/images/hero_indian.png",
  "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
];

const Hero = ({ onSearch }) => {
  const [images, setImages] = useState(() => {
    // Try to load from cache immediately to prevent blank flash
    const cached = localStorage.getItem('cached_hero_images');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { return []; }
    }
    return [];
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchHeroImages() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'hero_images')
          .single();
          
        if (!error && data?.value && Array.isArray(data.value) && data.value.length > 0) {
          setImages(data.value);
          // Save to cache for the next reload
          localStorage.setItem('cached_hero_images', JSON.stringify(data.value));
        }
      } catch (err) {
        console.error('Error fetching hero images:', err);
      }
    }
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero">
      <div className="hero-bg-wrapper">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt="Senior living community" 
            className={`hero-bg-img ${idx === currentIndex ? 'active' : ''}`}
            style={{
              opacity: idx === currentIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-content">
          <h1>Find Your Perfect<br />Place to Thrive.</h1>

          <div className="hero-search-wrapper">
            <SearchWidget onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
