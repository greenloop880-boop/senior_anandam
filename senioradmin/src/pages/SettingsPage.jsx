import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Save, CheckCircle, Database, Cloud, Globe, Shield, Image, Video, Plus, Trash2, Loader2, UploadCloud } from 'lucide-react';
import { uploadToR2 } from '../lib/r2';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [heroImages, setHeroImages] = useState([]);
  const [ctaBgImage, setCtaBgImage] = useState('');
  const [videoTestimonials, setVideoTestimonials] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      if (!isSupabaseConfigured) return;
      try {
        const { data: heroData } = await supabase.from('site_settings').select('value').eq('key', 'hero_images').single();
        if (heroData) setHeroImages(heroData.value);

        const { data: ctaData } = await supabase.from('site_settings').select('value').eq('key', 'cta_bg_image').single();
        if (ctaData) setCtaBgImage(ctaData.value || '');

        const { data: videoData } = await supabase.from('site_settings').select('value').eq('key', 'video_testimonials').single();
        if (videoData) setVideoTestimonials(videoData.value);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!isSupabaseConfigured) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }

    setLoading(true);
    try {
      const { error: err1 } = await supabase.from('site_settings').upsert({ key: 'hero_images', value: heroImages }, { onConflict: 'key' });
      if (err1) throw err1;
      
      const { error: errCta } = await supabase.from('site_settings').upsert({ key: 'cta_bg_image', value: ctaBgImage }, { onConflict: 'key' });
      if (errCta) throw errCta;

      const { error: err2 } = await supabase.from('site_settings').upsert({ key: 'video_testimonials', value: videoTestimonials }, { onConflict: 'key' });
      if (err2) throw err2;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroImageUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const newImgs = [...heroImages];
      // Show uploading state (could use a toast, but this is simple)
      newImgs[idx] = 'Uploading...';
      setHeroImages(newImgs);
      
      const url = await uploadToR2(file, 'hero');
      const updatedImgs = [...heroImages];
      updatedImgs[idx] = url;
      setHeroImages(updatedImgs);
    } catch (err) {
      console.error('Failed to upload hero image:', err);
      // Revert if error
      const revertedImgs = [...heroImages];
      revertedImgs[idx] = '';
      setHeroImages(revertedImgs);
    }
  };

  const Section = ({ icon: Icon, title, children, color = '#6366f1' }) => (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f8', boxShadow: '0 4px 24px rgba(47,57,102,0.06)', overflow: 'hidden', marginBottom: '1.5rem' }}>
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f5f5f8', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', background: `${color}18`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={color} />
        </div>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1a2035' }}>{title}</h2>
      </div>
      <div style={{ padding: '1.5rem' }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', width: '100%' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2035', margin: 0, letterSpacing: '-0.02em' }}>Site Customization</h1>
          <p style={{ color: '#888', marginTop: '4px', fontSize: '0.9rem' }}>Manage dynamic content on SeniorDash homepage</p>
        </div>
        <button onClick={handleSave} disabled={loading} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '12px', border: 'none',
          background: saved ? '#10b981' : 'linear-gradient(135deg, #3b4b8a, #6366f1)',
          color: 'white', fontWeight: 700, fontSize: '0.95rem',
          cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
          boxShadow: '0 4px 16px rgba(99,102,241,0.3)', transition: 'all 0.3s',
        }}>
          {loading ? <Loader2 size={18} className="spin" /> : saved ? <><CheckCircle size={18} /> Saved!</> : <><Save size={18} /> Save Changes</>}
        </button>
      </div>

      {/* Hero Slider */}
      <Section icon={Image} title="Hero Slider Images" color="#ec4899">
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>Add URLs for the background images that rotate on the homepage hero section.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {heroImages.map((img, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" value={img} 
                onChange={(e) => {
                  const newImgs = [...heroImages];
                  newImgs[idx] = e.target.value;
                  setHeroImages(newImgs);
                }}
                placeholder="https://... or click upload button ->" 
                style={inputStyle} 
                disabled={img === 'Uploading...'}
              />
              <input 
                type="file" 
                accept="image/*" 
                id={`hero-upload-${idx}`} 
                style={{ display: 'none' }} 
                onChange={(e) => handleHeroImageUpload(e, idx)} 
              />
              <button 
                onClick={() => document.getElementById(`hero-upload-${idx}`).click()} 
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f8f9fc', color: '#3b4b8a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.8rem' }}
                title="Upload Image"
              >
                <UploadCloud size={16} /> Upload
              </button>
              <button onClick={() => setHeroImages(heroImages.filter((_, i) => i !== idx))} style={btnTrashStyle}><Trash2 size={16} /></button>
            </div>
          ))}
          <button onClick={() => setHeroImages([...heroImages, ''])} style={btnAddStyle}><Plus size={16} /> Add Image URL</button>
        </div>
      </Section>

      {/* Contact Section Image */}
      <Section icon={Image} title="Contact Section Background" color="#8b5cf6">
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>Set the background image for the "Get in Touch" form section.</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" value={ctaBgImage} 
            onChange={(e) => setCtaBgImage(e.target.value)}
            placeholder="https://... or click upload button ->" 
            style={inputStyle} 
            disabled={ctaBgImage === 'Uploading...'}
          />
          <input 
            type="file" 
            accept="image/*" 
            id="cta-upload" 
            style={{ display: 'none' }} 
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              try {
                const oldImg = ctaBgImage;
                setCtaBgImage('Uploading...');
                const url = await uploadToR2(file, 'hero');
                setCtaBgImage(url);
              } catch (err) {
                console.error('Upload failed:', err);
                setCtaBgImage('');
              }
            }} 
          />
          <button 
            onClick={() => document.getElementById('cta-upload').click()} 
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f8f9fc', color: '#3b4b8a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.8rem' }}
            title="Upload Image"
          >
            <UploadCloud size={16} /> Upload
          </button>
          <button onClick={() => setCtaBgImage('')} style={btnTrashStyle}><Trash2 size={16} /></button>
        </div>
      </Section>

      {/* Video Testimonials */}
      <Section icon={Video} title="Video Testimonials" color="#f59e0b">
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>Manage the video feedback section. Use YouTube embed URLs.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {videoTestimonials.map((v, idx) => (
            <div key={idx} style={{ padding: '1.25rem', border: '1px solid #eee', borderRadius: '12px', position: 'relative' }}>
              <button onClick={() => setVideoTestimonials(videoTestimonials.filter((_, i) => i !== idx))} style={{ ...btnTrashStyle, position: 'absolute', top: '10px', right: '10px' }}><Trash2 size={16} /></button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>YOUTUBE EMBED URL</label>
                  <input type="text" value={v.youtubeUrl} onChange={(e) => {
                    const newV = [...videoTestimonials]; newV[idx].youtubeUrl = e.target.value; setVideoTestimonials(newV);
                  }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>VIDEO TITLE</label>
                  <input type="text" value={v.title} onChange={(e) => {
                    const newV = [...videoTestimonials]; newV[idx].title = e.target.value; setVideoTestimonials(newV);
                  }} style={inputStyle} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>QUOTE / DESCRIPTION</label>
                  <textarea value={v.quote} onChange={(e) => {
                    const newV = [...videoTestimonials]; newV[idx].quote = e.target.value; setVideoTestimonials(newV);
                  }} style={{ ...inputStyle, height: '60px' }} />
                </div>
                <div>
                  <label style={labelStyle}>AUTHOR NAME</label>
                  <input type="text" value={v.authorName} onChange={(e) => {
                    const newV = [...videoTestimonials]; newV[idx].authorName = e.target.value; setVideoTestimonials(newV);
                  }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>AUTHOR DETAIL</label>
                  <input type="text" value={v.authorDetail} onChange={(e) => {
                    const newV = [...videoTestimonials]; newV[idx].authorDetail = e.target.value; setVideoTestimonials(newV);
                  }} style={inputStyle} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setVideoTestimonials([...videoTestimonials, { youtubeUrl: '', title: '', quote: '', authorName: '', authorDetail: '' }])} style={btnAddStyle}><Plus size={16} /> Add Video Testimonial</button>
        </div>
      </Section>

      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' };
const labelStyle = { display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#aaa', marginBottom: '4px' };
const btnTrashStyle = { padding: '8px', borderRadius: '8px', border: '1px solid #fee2e2', background: 'white', color: '#ef4444', cursor: 'pointer' };
const btnAddStyle = { padding: '10px', borderRadius: '10px', border: '1.5px dashed #3b4b8a', background: '#f5f7ff', color: '#3b4b8a', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
