import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { uploadToR2 } from '../lib/r2';
import {
  Plus, Pencil, Trash2, Search, X, Upload, MapPin,
  CheckCircle, AlertCircle, Loader2, FileText, ExternalLink
} from 'lucide-react';

const LOCATIONS = [
  "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Chennai",
  "Delhi NCR", "Kolkata", "Ahmedabad", "Bhubaneswar", "Goa",
  "Maplewood, CA", "Seaside, CA", "Lake Tahoe, CA" // fallback for demo data
];
const BADGES = ['', 'Most Popular', 'New', 'Top Rated', 'Premium'];

const PREDEFINED_AMENITIES = [
  { icon: 'Users', title: 'Independent Living', desc: 'Freedom and flexibility with support when you need it.' },
  { icon: 'Utensils', title: 'Delicious Dining', desc: 'Fresh, chef-prepared meals in a warm, restaurant-style setting.' },
  { icon: 'TreePine', title: 'Beautiful Surroundings', desc: 'Peaceful, landscaped grounds with walking paths and gardens.' },
  { icon: 'Calendar', title: 'Engaging Activities', desc: 'A full calendar of events, classes, and opportunities to connect.' },
  { icon: 'ShieldCheck', title: '24/7 Security', desc: 'Round-the-clock security and emergency response systems.' },
  { icon: 'HeartHandshake', title: 'Wellness Center', desc: 'On-site wellness checks, fitness classes, and health programs.' },
  { icon: 'Home', title: 'Housekeeping', desc: 'Regular housekeeping and maintenance services.' },
  { icon: 'PawPrint', title: 'Pet Friendly', desc: 'We welcome your furry friends with dedicated pet areas.' }
];

const EMPTY_FORM = {
  title: '', location: '', type: '', price: '',
  description: '', rating: 4.5, reviews: 0, badge: '', image: '',
  about_text: '', amenities: [], gallery: [], quick_facts: {}, floor_plans: [],
  address: { area: '', city: '', state: '', pincode: '' },
  brochure_url: ''
};

const Toast = ({ msg, type, onClose }) => (
  <div style={{
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
    background: type === 'success' ? '#10b981' : '#ef4444',
    color: 'white', padding: '14px 20px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', gap: '10px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontWeight: 600, fontSize: '0.9rem',
    animation: 'slideUp 0.3s ease',
  }}>
    {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    {msg}
    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: '8px' }}><X size={16} /></button>
  </div>
);

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [brochureFile, setBrochureFile] = useState(null);
  const [brochureUploading, setBrochureUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [usingDemo, setUsingDemo] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  async function fetchCommunities() {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setCommunities([]);
      setUsingDemo(true);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.from('communities').select('*').order('id');
      if (error) throw error;
      setCommunities(data || []);
    } catch {
      setCommunities([]);
      setUsingDemo(true);
    } finally {
      setLoading(false);
    }
  }

  const [categoryGroups, setCategoryGroups] = useState({});

  async function fetchCategories() {
    if (!isSupabaseConfigured) return;
    try {
      const { data } = await supabase.from('categories').select('name, category_group');
      if (data) {
        const grouped = data.reduce((acc, cat) => {
          const group = cat.category_group;
          if (!acc[group]) acc[group] = [];
          acc[group].push(cat.name);
          return acc;
        }, {});
        setCategoryGroups(grouped);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }

  useEffect(() => { 
    fetchCommunities(); 
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview('');
    setBrochureFile(null);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditId(c.id);
    setForm({
      ...c,
      amenities: Array.isArray(c.amenities) ? c.amenities : [],
      gallery: Array.isArray(c.gallery) ? c.gallery : [],
      floor_plans: Array.isArray(c.floor_plans) ? c.floor_plans : [],
      quick_facts: typeof c.quick_facts === 'object' && c.quick_facts !== null ? c.quick_facts : {},
      address: typeof c.address === 'object' && c.address !== null ? c.address : { area: '', city: c.location || '', state: '', pincode: '' },
      about_text: c.about_text || '',
      brochure_url: c.brochure_url || '',
    });
    setImagePreview(c.image || '');
    setImageFile(null);
    setBrochureFile(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleBrochureUpload = async (file) => {
    setBrochureUploading(true);
    try {
      const url = await uploadToR2(file, 'brochures');
      setForm(f => ({ ...f, brochure_url: url }));
      showToast('Brochure uploaded!');
    } catch (err) {
      showToast('Brochure upload failed: ' + err.message, 'error');
    } finally {
      setBrochureUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.location) return showToast('Title and Location are required.', 'error');
    setSaving(true);
    try {
      let imageUrl = form.image;
      if (imageFile) {
        imageUrl = await uploadToR2(imageFile, 'communities');
      }

      const payload = {
        title: form.title, location: form.address?.city || form.location, type: form.type, price: form.price,
        description: form.description, rating: form.rating, reviews: form.reviews, badge: form.badge,
        image: imageUrl, about_text: form.about_text,
        amenities: form.amenities, gallery: form.gallery, quick_facts: form.quick_facts,
        floor_plans: form.floor_plans, address: form.address,
        brochure_url: form.brochure_url || null
      };

      if (usingDemo) {
        if (editId) {
          setCommunities(cs => cs.map(c => c.id === editId ? { ...payload, id: editId } : c));
        } else {
          setCommunities(cs => [...cs, { ...payload, id: Date.now() }]);
        }
      } else {
        if (editId) {
          const { error } = await supabase.from('communities').update(payload).eq('id', editId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('communities').insert(payload);
          if (error) throw error;
        }
        await fetchCommunities();
      }
      showToast(editId ? 'Community updated!' : 'Community added!');
      setShowModal(false);
    } catch (err) {
      showToast(err.message || 'Save failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (usingDemo) {
        setCommunities(cs => cs.filter(c => c.id !== id));
      } else {
        await supabase.from('communities').delete().eq('id', id);
        await fetchCommunities();
      }
      showToast('Community deleted.');
    } catch (err) {
      showToast(err.message, 'error');
    }
    setDeleteConfirm(null);
  };

  const filtered = communities.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2035', margin: 0, letterSpacing: '-0.02em' }}>
            Communities
          </h1>
          <p style={{ color: '#888', marginTop: '4px', fontSize: '0.9rem' }}>
            {usingDemo && <span style={{ color: '#f59e0b', fontWeight: 600 }}>⚡ Demo Mode · </span>}
            Manage all senior living communities shown on SeniorDash
          </p>
        </div>
        <button
          onClick={openAdd}
          id="add-community-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '11px 20px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #3b4b8a, #6366f1)',
            color: 'white', fontWeight: 700, fontSize: '0.9rem',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Plus size={18} /> Add Community
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '1.5rem' }}>
        <Search size={16} color="#aaa" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text" placeholder="Search communities..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '11px 14px 11px 40px',
            border: '1.5px solid #e5e7eb', borderRadius: '10px',
            fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', color: '#1a2035',
            boxSizing: 'border-box', background: 'white',
          }}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f8', overflow: 'hidden', boxShadow: '0 4px 24px rgba(47,57,102,0.06)' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>
            <Loader2 size={36} color="#6366f1" style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p>Loading communities...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>No communities found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fc', borderBottom: '1px solid #f0f0f8' }}>
                  {['Community', 'Location', 'Type', 'Price', 'Rating', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#888', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8f8fb' : 'none', transition: 'background 0.15s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#fafafe'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {c.image && (
                          <img src={c.image} alt={c.title} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                        )}
                        <div>
                          <div style={{ fontWeight: 700, color: '#1a2035', fontSize: '0.875rem' }}>{c.title}</div>
                          {c.badge && (
                            <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#eef2ff', color: '#4f46e5', padding: '2px 7px', borderRadius: '50px', marginTop: '3px', display: 'inline-block' }}>{c.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#555', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} />{c.location}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.8rem' }}>
                      <span style={{
                        background: '#eef2ff', color: '#3730a3',
                        padding: '4px 10px', borderRadius: '50px', fontWeight: 600, whiteSpace: 'nowrap',
                      }}>{c.type}</span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#1a2035', fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{c.price}</td>
                    <td style={{ padding: '14px 16px', fontSize: '0.875rem' }}>
                      <span style={{ color: '#f59e0b', fontWeight: 700 }}>★ {c.rating}</span>
                      <span style={{ color: '#aaa', marginLeft: '4px' }}>({c.reviews})</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => openEdit(c)} style={{ padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', color: '#3b4b8a', display: 'flex', transition: 'all 0.15s' }}
                          onMouseOver={(e) => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.borderColor = '#818cf8'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                          title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setDeleteConfirm(c.id)} style={{ padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', color: '#ef4444', display: 'flex', transition: 'all 0.15s' }}
                          onMouseOver={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                          title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setShowModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
          <div style={{
            position: 'relative', background: 'white', borderRadius: '20px',
            padding: '2.5rem', maxWidth: '1100px', width: '100%',
            maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1a2035' }}>
                {editId ? 'Edit Community' : 'Add New Community'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: '#f5f5f8', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#666' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              {/* Left Column */}
              <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div style={{ border: '1px solid #f0f0f8', padding: '1.5rem', borderRadius: '12px', background: '#fcfcfd' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1a2035', borderBottom: '1px solid #eaeaea', paddingBottom: '10px' }}>1. Basic Information</h3>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>COVER IMAGE</label>
                    <div
                      style={{
                        border: '2px dashed #e5e7eb', borderRadius: '12px',
                        padding: '1.5rem', textAlign: 'center', cursor: 'pointer',
                        background: '#fff', transition: 'border-color 0.2s', position: 'relative',
                        overflow: 'hidden', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = '#818cf8'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      onClick={() => document.getElementById('img-upload').click()}
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                      ) : (
                        <div>
                          <Upload size={28} color="#818cf8" style={{ marginBottom: '8px' }} />
                          <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>Click to upload cover image</p>
                        </div>
                      )}
                      <input id="img-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>
                    <input
                      type="text" value={form.image} onChange={(e) => { setForm(f => ({ ...f, image: e.target.value })); setImagePreview(e.target.value); }}
                      placeholder="...or paste image URL" style={{ ...inputStyle, marginTop: '8px' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>TITLE</label>
                    <input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Community name" style={inputStyle} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>AREA / LOCALITY</label>
                      <input type="text" value={form.address?.area || ''} onChange={(e) => setForm(f => ({ ...f, address: { ...f.address, area: e.target.value } }))} placeholder="e.g. Andheri West" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>CITY</label>
                      <input type="text" value={form.address?.city || form.location || ''} onChange={(e) => setForm(f => ({ ...f, location: e.target.value, address: { ...f.address, city: e.target.value } }))} placeholder="e.g. Mumbai" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>STATE</label>
                      <input type="text" value={form.address?.state || ''} onChange={(e) => setForm(f => ({ ...f, address: { ...f.address, state: e.target.value } }))} placeholder="e.g. Maharashtra" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>PIN CODE</label>
                      <input type="text" value={form.address?.pincode || ''} onChange={(e) => setForm(f => ({ ...f, address: { ...f.address, pincode: e.target.value } }))} placeholder="e.g. 400053" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>STARTING PRICE</label>
                    <input type="text" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} placeholder="From ₹1,00,000/mo" style={inputStyle} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {/* Facility Type */}
                    <div>
                      <label style={labelStyle}>FACILITY TYPE</label>
                      <select 
                        value={form.type} 
                        onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))} 
                        style={inputStyle}
                      >
                        <option value="">Select Facility Type</option>
                        {(categoryGroups['facility'] || []).map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Room Type */}
                    <div>
                      <label style={labelStyle}>ROOM TYPE</label>
                      <select 
                        value={form.quick_facts?.room_type || ''} 
                        onChange={(e) => setForm(f => ({ ...f, quick_facts: { ...f.quick_facts, room_type: e.target.value } }))} 
                        style={inputStyle}
                      >
                        <option value="">Select Room Type</option>
                        {(categoryGroups['room'] || []).map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>BADGE</label>
                      <input type="text" value={form.badge} onChange={(e) => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="e.g. Premium, Top Rated" style={inputStyle} />
                    </div>
                  </div>
                </div>

                <div style={{ border: '1px solid #f0f0f8', padding: '1.5rem', borderRadius: '12px', background: '#fcfcfd' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1a2035', borderBottom: '1px solid #eaeaea', paddingBottom: '10px' }}>2. Descriptions</h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>SHORT DESCRIPTION (Card View)</label>
                    <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="A short, catchy description for the search results..." rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>ABOUT TEXT (Detail Page)</label>
                    <textarea value={form.about_text} onChange={(e) => setForm(f => ({ ...f, about_text: e.target.value }))} placeholder="The long description for the community detail page..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                </div>

                <div style={{ border: '1px solid #e0e7ff', padding: '1.5rem', borderRadius: '12px', background: '#f8f9ff' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1a2035', borderBottom: '1px solid #e0e7ff', paddingBottom: '10px' }}>3. Brochure / PDF</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Upload button */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'white', border: '2px dashed #818cf8', borderRadius: '10px', cursor: 'pointer' }}>
                      <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                        onChange={(e) => { const f = e.target.files[0]; if (f) handleBrochureUpload(f); }} />
                      {brochureUploading ? <Loader2 size={18} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} /> : <FileText size={18} color="#6366f1" />}
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4f46e5' }}>
                        {brochureUploading ? 'Uploading...' : 'Click to upload PDF / Brochure'}
                      </span>
                    </label>
                    {/* Manual URL */}
                    <input type="text" value={form.brochure_url} onChange={(e) => setForm(f => ({ ...f, brochure_url: e.target.value }))}
                      placeholder="...or paste brochure URL" style={inputStyle} />
                    {/* Preview link if set */}
                    {form.brochure_url && !brochureUploading && (
                      <a href={form.brochure_url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.825rem', fontWeight: 600, textDecoration: 'none' }}>
                        <ExternalLink size={14} /> View uploaded brochure
                      </a>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div style={{ border: '1px solid #f0f0f8', padding: '1.5rem', borderRadius: '12px', background: '#fcfcfd' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1a2035', borderBottom: '1px solid #eaeaea', paddingBottom: '10px' }}>3. Features & Amenities</h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>QUICK FACTS</label>
                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>Total Residences</label>
                        <input type="text" value={form.quick_facts?.residences || ''} onChange={(e) => setForm({ ...form, quick_facts: { ...form.quick_facts, residences: e.target.value } })} placeholder="e.g. 120 Units" style={{ ...inputStyle, padding: '6px 10px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>Year Opened</label>
                        <input type="text" value={form.quick_facts?.yearOpened || ''} onChange={(e) => setForm({ ...form, quick_facts: { ...form.quick_facts, yearOpened: e.target.value } })} placeholder="e.g. 2018" style={{ ...inputStyle, padding: '6px 10px' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>Pet Friendly</label>
                        <input type="text" value={form.quick_facts?.petFriendly || ''} onChange={(e) => setForm({ ...form, quick_facts: { ...form.quick_facts, petFriendly: e.target.value } })} placeholder="e.g. Yes (Dogs & Cats)" style={{ ...inputStyle, padding: '6px 10px' }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>AMENITIES</label>
                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Standard Amenities (Check to add):</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                        {PREDEFINED_AMENITIES.map((am) => {
                          const isSelected = (form.amenities || []).some(a => a.title === am.title);
                          return (
                            <label key={am.title} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isSelected ? '#eef2ff' : '#f8f9fc', padding: '8px 10px', borderRadius: '8px', border: isSelected ? '1px solid #818cf8' : '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                              <input
                                type="checkbox" checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) setForm({ ...form, amenities: [...form.amenities, am] });
                                  else setForm({ ...form, amenities: form.amenities.filter(a => a.title !== am.title) });
                                }}
                                style={{ cursor: 'pointer' }}
                              />
                              <span style={{ fontWeight: 600, color: '#1a2035', fontSize: '0.8rem' }}>{am.title}</span>
                            </label>
                          );
                        })}
                      </div>

                      <p style={{ margin: '10px 0 0 0', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '10px' }}>Custom Amenities:</p>
                      {(form.amenities || []).filter(am => !PREDEFINED_AMENITIES.some(p => p.title === am.title)).map((am, idx) => {
                        const globalIdx = form.amenities.indexOf(am);
                        return (
                          <div key={globalIdx} style={{ display: 'flex', gap: '10px', background: '#f8f9fc', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                              <input type="text" placeholder="Title (e.g. Golf Course)" value={am.title || ''} onChange={(e) => {
                                const newAm = [...form.amenities]; newAm[globalIdx].title = e.target.value; setForm({ ...form, amenities: newAm });
                              }} style={{ ...inputStyle, padding: '6px 10px' }} />
                              <textarea placeholder="Description paragraph..." value={am.desc || ''} onChange={(e) => {
                                const newAm = [...form.amenities]; newAm[globalIdx].desc = e.target.value; setForm({ ...form, amenities: newAm });
                              }} rows={2} style={{ ...inputStyle, padding: '6px 10px', resize: 'vertical' }} />
                            </div>
                            <button onClick={() => setForm({ ...form, amenities: form.amenities.filter((_, i) => i !== globalIdx) })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}><Trash2 size={16} /></button>
                          </div>
                        );
                      })}
                      <button onClick={() => setForm({ ...form, amenities: [...form.amenities, { icon: 'CheckCircle2', title: '', desc: '' }] })} style={{ background: 'white', border: '1.5px dashed #3b4b8a', color: '#3b4b8a', padding: '8px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                        <Plus size={16} /> Add Custom Amenity
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ border: '1px solid #f0f0f8', padding: '1.5rem', borderRadius: '12px', background: '#fcfcfd' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1a2035', borderBottom: '1px solid #eaeaea', paddingBottom: '10px' }}>4. Media & Plans</h3>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>PHOTO GALLERY</label>
                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px' }}>
                        {(form.gallery || []).map((imgUrl, idx) => (
                          <div key={idx} style={{ position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                            <img src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button onClick={() => setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== idx) })} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(255,255,255,0.9)', color: '#ef4444', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}><Trash2 size={12} /></button>
                          </div>
                        ))}
                      </div>
                      <label style={{ background: '#f8f9fc', border: '1.5px dashed #3b4b8a', color: '#3b4b8a', padding: '8px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                        <Plus size={16} /> Upload Photos
                        <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={async (e) => {
                          const files = Array.from(e.target.files);
                          if (files.length > 0) {
                            setSaving(true);
                            try {
                              const urls = [];
                              for (const file of files) {
                                const url = await uploadToR2(file, 'gallery');
                                urls.push(url);
                              }
                              setForm({ ...form, gallery: [...(form.gallery || []), ...urls] });
                              showToast(`Successfully uploaded ${files.length} photos`);
                            } catch (err) {
                              console.error('Gallery upload error:', err);
                              showToast('Image upload failed: ' + err.message, 'error');
                            }
                            finally { setSaving(false); }
                          }
                        }} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>FLOOR PLANS</label>
                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {(form.floor_plans || []).map((fp, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '10px', background: '#f8f9fc', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                          <div style={{ width: '80px', height: '80px', borderRadius: '6px', background: '#e5e7eb', overflow: 'hidden', position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {fp.image ? (
                              <img src={fp.image} alt="plan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <Upload size={18} color="#888" />
                            )}
                            <input type="file" accept="image/*" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setSaving(true);
                                try {
                                  const url = await uploadToR2(file, 'floorplans');
                                  const newFp = [...form.floor_plans]; newFp[idx].image = url; setForm({ ...form, floor_plans: newFp });
                                  showToast('Floor plan uploaded!');
                                } catch (err) {
                                  console.error('Floor plan upload error:', err);
                                  showToast('Upload failed: ' + err.message, 'error');
                                }
                                finally { setSaving(false); }
                              }
                            }} />
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' }}>
                            <input type="text" placeholder="Plan Name (e.g. Studio)" value={fp.name || ''} onChange={(e) => {
                              const newFp = [...form.floor_plans]; newFp[idx].name = e.target.value; setForm({ ...form, floor_plans: newFp });
                            }} style={{ ...inputStyle, padding: '6px 10px' }} />
                            <input type="text" placeholder="Size (e.g. 450 sq ft)" value={fp.size || ''} onChange={(e) => {
                              const newFp = [...form.floor_plans]; newFp[idx].size = e.target.value; setForm({ ...form, floor_plans: newFp });
                            }} style={{ ...inputStyle, padding: '6px 10px' }} />
                          </div>
                          <button onClick={() => setForm({ ...form, floor_plans: form.floor_plans.filter((_, i) => i !== idx) })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}><Trash2 size={16} /></button>
                        </div>
                      ))}
                      <button onClick={() => setForm({ ...form, floor_plans: [...(form.floor_plans || []), { name: '', size: '', image: '' }] })} style={{ background: '#f8f9fc', border: '1.5px dashed #3b4b8a', color: '#3b4b8a', padding: '8px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                        <Plus size={16} /> Add Floor Plan
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '11px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: 'white', color: '#555', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '11px 24px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #3b4b8a, #6366f1)',
                color: 'white', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '8px',
                opacity: saving ? 0.7 : 1,
              }}>
                {saving ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : `${editId ? 'Update' : 'Add'} Community`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setDeleteConfirm(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <Trash2 size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem', color: '#1a2035' }}>Delete Community?</h3>
            <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '1.5rem' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '10px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: 'white', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#888', letterSpacing: '0.07em', marginBottom: '5px' };
const inputStyle = {
  width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb',
  borderRadius: '10px', fontSize: '0.9rem', outline: 'none',
  fontFamily: 'inherit', color: '#1a2035', boxSizing: 'border-box',
  background: 'white', marginTop: '4px',
};
