import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Eye, Trash2, CheckCircle, Clock, Search, Phone, Mail, Building2, Loader2, X } from 'lucide-react';

const STATUS_CONFIG = {
  new: { label: 'New', bg: '#eef2ff', color: '#4f46e5' },
  contacted: { label: 'Contacted', bg: '#fff8e1', color: '#b07d00' },
  resolved: { label: 'Resolved', bg: '#d1fae5', color: '#059669' },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  async function fetchInquiries() {
    setLoading(true);
    if (!isSupabaseConfigured) { setLoading(false); return; }
    try {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchInquiries(); }, []);

  const updateStatus = async (id, status) => {
    await supabase.from('inquiries').update({ status }).eq('id', id);
    setInquiries(is => is.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await supabase.from('inquiries').delete().eq('id', id);
    setInquiries(is => is.filter(i => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = inquiries.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = i.name?.toLowerCase().includes(q) || i.community?.toLowerCase().includes(q) || i.email?.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', width: '100%' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2035', margin: 0 }}>Inquiries & Tour Requests</h1>
        <p style={{ color: '#888', marginTop: '4px', fontSize: '0.9rem' }}>Manage incoming leads from SeniorDash</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={16} color="#aaa" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search by name, email, community..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 40px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', color: '#1a2035', background: 'white' }} />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'new', 'contacted', 'resolved'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: '9px 16px', borderRadius: '8px', border: filterStatus === s ? 'none' : '1.5px solid #e5e7eb',
              background: filterStatus === s ? '#2f3966' : 'white', color: filterStatus === s ? 'white' : '#555',
              fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
            }}>
              {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
              {s === 'new' && ` (${inquiries.filter(i => i.status === 'new').length})`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1.5rem' }}>
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f8', overflow: 'hidden', boxShadow: '0 4px 24px rgba(47,57,102,0.06)' }}>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}><Loader2 size={36} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} /></div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#aaa' }}>No inquiries found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fc', borderBottom: '1px solid #f0f0f8' }}>
                    {['Contact', 'Community', 'Type', 'Status', 'Date', ''].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq, i) => (
                    <tr key={inq.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8f8fb' : 'none', cursor: 'pointer', background: selected?.id === inq.id ? '#f5f7ff' : 'transparent' }}
                      onClick={() => setSelected(inq)}
                      onMouseOver={(e) => selected?.id !== inq.id && (e.currentTarget.style.background = '#fafafe')}
                      onMouseOut={(e) => selected?.id !== inq.id && (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#1a2035', fontSize: '0.875rem' }}>{inq.name}</div>
                        <div style={{ color: '#888', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}><Mail size={11} />{inq.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#555', fontSize: '0.85rem' }}><div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Building2 size={12} />{inq.community}</div></td>
                      <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: '#555' }}>{inq.type}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: STATUS_CONFIG[inq.status]?.bg, color: STATUS_CONFIG[inq.status]?.color, padding: '4px 10px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700 }}>
                          {STATUS_CONFIG[inq.status]?.label || inq.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#aaa', fontSize: '0.78rem' }}>{formatDate(inq.created_at)}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(inq.id); }} style={{ padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selected && (
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f0f0f8', boxShadow: '0 4px 24px rgba(47,57,102,0.06)', padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1a2035' }}>Inquiry Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: '#f5f5f8', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#666', display: 'flex' }}><X size={16} /></button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: '#f8f9fc', borderRadius: '12px', marginBottom: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b4b8a, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                {selected.name?.[0]}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#1a2035' }}>{selected.name}</div>
                <div style={{ color: '#888', fontSize: '0.78rem' }}>{formatDate(selected.created_at)}</div>
              </div>
            </div>
            {[{ icon: Mail, label: 'Email', value: selected.email }, { icon: Phone, label: 'Phone', value: selected.phone }, { icon: Building2, label: 'Community', value: selected.community }].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '10px', marginBottom: '0.75rem' }}>
                <Icon size={15} color="#6366f1" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: '0.875rem', color: '#1a2035', fontWeight: 600 }}>{value || '—'}</div>
                </div>
              </div>
            ))}
            <div style={{ background: '#f8f9fc', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 600, marginBottom: '6px' }}>MESSAGE</div>
              <p style={{ margin: 0, color: '#444', fontSize: '0.875rem', lineHeight: 1.6 }}>{selected.message}</p>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 600, marginBottom: '8px' }}>UPDATE STATUS</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {Object.entries(STATUS_CONFIG).map(([key, { label, bg, color }]) => (
                  <button key={key} onClick={() => updateStatus(selected.id, key)} style={{
                    padding: '7px 14px', borderRadius: '8px', border: `1.5px solid ${selected.status === key ? color : '#e5e7eb'}`,
                    background: selected.status === key ? bg : 'white', color: selected.status === key ? color : '#666',
                    fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit',
                  }}>{label}</button>
                ))}
              </div>
            </div>
            <a href={`mailto:${selected.email}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b4b8a, #6366f1)', color: 'white', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
              <Mail size={16} /> Reply via Email
            </a>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
