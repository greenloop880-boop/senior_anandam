import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Plus, Trash2, Loader2, CheckCircle, AlertCircle, X, Layers, Tag } from 'lucide-react';

const CATEGORY_GROUPS = [
  { id: 'facility', name: 'Facility Types', icon: Layers },
  { id: 'room', name: 'Room Types', icon: Tag }
];

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState('facility');
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  async function fetchCategories() {
    if (!isSupabaseConfigured) return setLoading(false);
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback for demo if table doesn't exist yet
      if (err.code === 'PGRST116' || err.message.includes('relation "categories" does not exist')) {
        setCategories([
          { id: 1, name: 'Independent Living', category_group: 'facility' },
          { id: 2, name: 'Assisted Living', category_group: 'facility' },
          { id: 3, name: 'Studio Apartment', category_group: 'room' },
          { id: 4, name: '1 BHK', category_group: 'room' }
        ]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: newName.trim(), category_group: activeGroup }])
        .select();
      
      if (error) throw error;
      
      setCategories([...categories, ...data]);
      setNewName('');
      showToast('Category added successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to add category', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCategories(categories.filter(c => c.id !== id));
      showToast('Category deleted');
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  const filteredCategories = categories.filter(c => c.category_group === activeGroup);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', width: '100%' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2035', margin: 0 }}>Category Management</h1>
        <p style={{ color: '#888', marginTop: '4px' }}>Manage Room and Facility types shown across the platform</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {CATEGORY_GROUPS.map(group => {
          const Icon = group.icon;
          const isActive = activeGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px', borderRadius: '12px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, #3b4b8a, #6366f1)' : 'white',
                color: isActive ? 'white' : '#555',
                fontWeight: 600, cursor: 'pointer',
                boxShadow: isActive ? '0 4px 16px rgba(99,102,241,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={18} />
              {group.name}
            </button>
          );
        })}
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #f0f0f8' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={`Add new ${activeGroup === 'facility' ? 'facility type' : 'room type'}...`}
            style={{
              flex: 1, padding: '12px 16px', borderRadius: '10px',
              border: '1.5px solid #e5e7eb', outline: 'none', fontSize: '0.95rem'
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={saving || !newName.trim()}
            style={{
              padding: '0 24px', borderRadius: '10px', border: 'none',
              background: '#6366f1', color: 'white', fontWeight: 700,
              cursor: 'pointer', opacity: (saving || !newName.trim()) ? 0.6 : 1
            }}
          >
            {saving ? <Loader2 size={18} className="spin" /> : 'Add'}
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <Loader2 size={32} className="spin" color="#6366f1" />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {filteredCategories.length === 0 ? (
              <div style={{ gridColumn: '1/-1', padding: '2rem', textAlign: 'center', color: '#888' }}>
                No {activeGroup} types added yet.
              </div>
            ) : (
              filteredCategories.map(cat => (
                <div
                  key={cat.id}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 18px', background: '#f8fafc', borderRadius: '12px',
                    border: '1px solid #f1f5f9', transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{cat.name}</span>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    style={{
                      background: 'none', border: 'none', color: '#94a3b8',
                      cursor: 'pointer', padding: '4px', transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
