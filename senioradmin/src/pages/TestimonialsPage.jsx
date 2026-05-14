import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Plus, Pencil, Trash2, CheckCircle, XCircle, X, Loader2, AlertCircle } from 'lucide-react';

const EMPTY_FORM = { name: '', community: '', quote: '', rating: 5, approved: false };

const Toast = ({ msg, type, onClose }) => (
  <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, background: type === 'success' ? '#10b981' : '#ef4444', color: 'white', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', fontWeight: 600, fontSize: '0.9rem' }}>
    {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    {msg}
    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={16} /></button>
  </div>
);

const labelStyle = { display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#888', letterSpacing: '0.07em', marginBottom: '5px' };
const inputStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', color: '#1a2035', boxSizing: 'border-box', background: 'white', marginTop: '4px' };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 4000); };

  async function fetchTestimonials() {
    setLoading(true);
    if (!isSupabaseConfigured) { setLoading(false); return; }
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTestimonials(); }, []);

  const openAdd = () => { setEditId(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (t) => { setEditId(t.id); setForm({ ...t }); setShowModal(true); };

  const handleToggleApprove = async (t) => {
    await supabase.from('testimonials').update({ approved: !t.approved }).eq('id', t.id);
    setTestimonials(ts => ts.map(x => x.id === t.id ? { ...x, approved: !x.approved } : x));
  };

  const handleSave = async () => {
    if (!form.name || !form.quote) return showToast('Name and quote are required.', 'error');
    setSaving(true);
    try {
      if (editId) {
        const { error } = await supabase.from('testimonials').update(form).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('testimonials').insert(form);
        if (error) throw error;
      }
      await fetchTestimonials();
      showToast(editId ? 'Testimonial updated!' : 'Testimonial added!');
      setShowModal(false);
    } catch (err) { showToast(err.message, 'error'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(ts => ts.filter(t => t.id !== id));
    showToast('Deleted.');
  };

  const Stars = ({ n }) => <span style={{ color: '#f59e0b' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2035', margin: 0 }}>Testimonials</h1>
          <p style={{ color: '#888', marginTop: '4px', fontSize: '0.9rem' }}>Manage resident reviews and approve for display on SeniorDash</p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 20px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #3b4b8a, #6366f1)', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}>
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}><Loader2 size={36} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} /></div>
      ) : testimonials.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa', background: 'white', borderRadius: '16px', border: '1px solid #f0f0f8' }}>
          No testimonials yet. Click "Add Testimonial" to get started.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {testimonials.map(t => (
            <div key={t.id} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: `1.5px solid ${t.approved ? '#d1fae5' : '#f0f0f8'}`, boxShadow: '0 4px 20px rgba(47,57,102,0.06)', position: 'relative', transition: 'transform 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ position: 'absolute', top: '14px', right: '14px', padding: '3px 10px', borderRadius: '50px', fontSize: '0.68rem', fontWeight: 700, background: t.approved ? '#d1fae5' : '#fef3c7', color: t.approved ? '#065f46' : '#92400e' }}>
                {t.approved ? '✓ Approved' : 'Pending'}
              </span>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 700, color: '#1a2035', fontSize: '0.95rem' }}>{t.name}</div>
                <div style={{ color: '#888', fontSize: '0.78rem', marginTop: '2px' }}>{t.community}</div>
                <Stars n={t.rating} />
              </div>
              <blockquote style={{ margin: '0 0 1rem', color: '#555', fontSize: '0.875rem', lineHeight: 1.65, fontStyle: 'italic', borderLeft: '3px solid #818cf8', paddingLeft: '12px' }}>
                "{t.quote}"
              </blockquote>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleToggleApprove(t)} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: t.approved ? '#fef2f2' : '#ecfdf5', color: t.approved ? '#ef4444' : '#059669' }}>
                  {t.approved ? <><XCircle size={13} /> Revoke</> : <><CheckCircle size={13} /> Approve</>}
                </button>
                <button onClick={() => openEdit(t)} style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', color: '#3b4b8a', display: 'flex' }}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(t.id)} style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setShowModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '480px', width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1a2035' }}>{editId ? 'Edit' : 'Add'} Testimonial</h2>
              <button onClick={() => setShowModal(false)} style={{ background: '#f5f5f8', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#666', display: 'flex' }}><X size={18} /></button>
            </div>
            {[{ key: 'name', label: 'RESIDENT NAME', placeholder: 'Full name' }, { key: 'community', label: 'COMMUNITY', placeholder: 'Community name' }].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{label}</label>
                <input type="text" value={form[key]} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} style={inputStyle} />
              </div>
            ))}
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>QUOTE</label>
              <textarea value={form.quote} onChange={(e) => setForm(f => ({ ...f, quote: e.target.value }))} placeholder="Their review..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>RATING (1–5)</label>
                <input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm(f => ({ ...f, rating: parseInt(e.target.value) }))} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#555', fontWeight: 600, fontSize: '0.875rem' }}>
                  <input type="checkbox" checked={form.approved} onChange={(e) => setForm(f => ({ ...f, approved: e.target.checked }))} />
                  Approved
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '11px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: 'white', color: '#555', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ padding: '11px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #3b4b8a, #6366f1)', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', opacity: saving ? 0.7 : 1 }}>
                {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                {editId ? 'Update' : 'Add'} Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
