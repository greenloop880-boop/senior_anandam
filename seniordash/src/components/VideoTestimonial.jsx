import React, { useState, useEffect } from 'react';
import './VideoTestimonial.css';
import { Play, Star, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEMO_VIDEOS = [
  {
    id: 1,
    youtubeUrl: "https://www.youtube.com/embed/dvVXX-X47DA",
    title: "Vedaanta Brindhavanam Walkthrough",
    quote: "Experience a walkthrough of Vedaanta Brindhavanam, where peace meets premium retirement living.",
    authorName: "Retire in Peace",
    authorDetail: "Property Walkthrough"
  }
];

const VideoTestimonial = () => {
  const [videos, setVideos] = useState(DEMO_VIDEOS);

  useEffect(() => {
    async function fetchVideos() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'video_testimonials')
          .single();
          
        if (!error && data?.value && Array.isArray(data.value) && data.value.length > 0) {
          setVideos(data.value);
        }
      } catch (err) {
        console.error('Error fetching video testimonials:', err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <section className="video-testimonial-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">What Our Residents Say</h2>
          <p className="section-subtitle">Real stories from real people who have found their perfect home with us.</p>
        </div>

        <div className={`testimonial-grid ${videos.length === 1 ? 'single-video' : ''}`}>
          {videos.map((video, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="video-wrapper">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={video.youtubeUrl} 
                  title={video.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="card-content">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#F5A623" color="#F5A623" />
                  ))}
                </div>
                <blockquote className="card-quote main-quote">
                  "{video.quote}"
                </blockquote>
                <div className="card-author">
                  <h4 className="author-name">{video.authorName}</h4>
                  <p className="author-detail">{video.authorDetail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a href="#" className="watch-more-link">
            Watch More Stories <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonial;
