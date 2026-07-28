import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Plus, Trash2, Loader2, CheckCircle, AlertCircle, X, Layers, Tag, FolderPlus, Settings } from 'lucide-react';

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
  const [customTypes, setCustomTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);
  
  const [newTypeName, setNewTypeName] = useState('');
  const [addingType, setAddingType] = useState(false);
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  async function fetchData() {
    if (!isSupabaseConfigured) return setLoading(false);
    setLoading(true);
    try {
      const [typesRes, catsRes] = await Promise.all([
        supabase.from('custom_types').select('*').order('created_at'),
        supabase.from('categories').select('*').order('name')
      ]);

      if (typesRes.error) throw typesRes.error;
      if (catsRes.error) throw catsRes.error;

      const typesData = typesRes.data || [];
      setCustomTypes(typesData);
      setCategories(catsRes.data || []);

      if (typesData.length > 0 && !activeGroup) {
        setActiveGroup(typesData[0].key);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      // Fallback
      if (customTypes.length === 0) {
        setCustomTypes([
          { id: '1', key: 'facility', name: 'Facility Types' },
          { id: '2', key: 'room', name: 'Room Types' }
        ]);
        setCategories([
          { id: 1, name: 'Independent Living', category_group: 'facility' },
          { id: 2, name: 'Assisted Living', category_group: 'facility' },
          { id: 3, name: 'Studio Apartment', category_group: 'room' },
          { id: 4, name: '1 BHK', category_group: 'room' }
        ]);
        if (!activeGroup) setActiveGroup('facility');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddType = async () => {
    if (!newTypeName.trim()) return;
    setAddingType(true);
    const key = newTypeName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    try {
      const { data, error } = await supabase
        .from('custom_types')
        .insert([{ name: newTypeName.trim(), key }])
        .select();
        
      if (error) throw error;
      
      const newType = data[0];
      setCustomTypes([...customTypes, newType]);
      setNewTypeName('');
      setActiveGroup(newType.key);
      showToast('Custom type added successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to add custom type', 'error');
    } finally {
      setAddingType(false);
    }
  };

  const handleDeleteType = async (typeKey, typeId) => {
    if (!window.confirm('Are you sure you want to delete this custom type? All categories inside it will also be deleted.')) return;
    try {
      await supabase.from('categories').delete().eq('category_group', typeKey);
      
      const { error } = await supabase.from('custom_types').delete().eq('id', typeId);
      if (error) throw error;

      const updatedTypes = customTypes.filter(t => t.id !== typeId);
      setCustomTypes(updatedTypes);
      setCategories(categories.filter(c => c.category_group !== typeKey));
      
      if (activeGroup === typeKey) {
        setActiveGroup(updatedTypes.length > 0 ? updatedTypes[0].key : null);
      }
      showToast('Custom type deleted');
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !activeGroup) return;
    setAddingCategory(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: newCategoryName.trim(), category_group: activeGroup }])
        .select();
      
      if (error) throw error;
      
      setCategories([...categories, ...data]);
      setNewCategoryName('');
      showToast('Category added successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to add category', 'error');
    } finally {
      setAddingCategory(false);
    }
  };

  const handleDeleteCategory = async (id) => {
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
  const activeTypeObj = customTypes.find(t => t.key === activeGroup);

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', width: '100%', display: 'flex', gap: '2rem' }}>
      
      {/* LEFT SIDEBAR: Custom Types Management */}
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a2035', margin: 0 }}>Custom Types</h1>
          <p style={{ color: '#888', marginTop: '4px', fontSize: '0.9rem' }}>Manage facility, room types, badges, etc.</p>
        </div>

        {/* Add New Type */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            placeholder="New type name..."
            style={{
              flex: 1, padding: '10px 14px', borderRadius: '10px',
              border: '1.5px solid #e5e7eb', outline: 'none', fontSize: '0.9rem'
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleAddType()}
          />
          <button
            onClick={handleAddType}
            disabled={addingType || !newTypeName.trim()}
            style={{
              padding: '0 16px', borderRadius: '10px', border: 'none',
              background: '#10b981', color: 'white', fontWeight: 700,
              cursor: 'pointer', opacity: (addingType || !newTypeName.trim()) ? 0.6 : 1
            }}
          >
            {addingType ? <Loader2 size={16} className="spin" /> : <Plus size={18} />}
          </button>
        </div>

        {/* List of Types */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}><Loader2 size={24} className="spin" color="#6366f1" /></div>
          ) : (
            customTypes.map(type => {
              const isActive = activeGroup === type.key;
              return (
                <div
                  key={type.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: '12px',
                    border: 'none',
                    background: isActive ? 'linear-gradient(135deg, #3b4b8a, #6366f1)' : 'white',
                    color: isActive ? 'white' : '#475569',
                    fontWeight: 600, cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 16px rgba(99,102,241,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setActiveGroup(type.key)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {type.key === 'facility' ? <Layers size={18} /> : type.key === 'room' ? <Tag size={18} /> : <Settings size={18} />}
                    {type.name}
                  </div>
                  {isActive && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteType(type.key, type.id); }}
                      style={{
                        background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
                        cursor: 'pointer', padding: '4px'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Categories for the Active Type */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTypeObj ? (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #f0f0f8', flex: 1 }}>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Categories for "{activeTypeObj.name}"
            </h2>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={`Add new option under ${activeTypeObj.name}...`}
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: '10px',
                  border: '1.5px solid #e5e7eb', outline: 'none', fontSize: '0.95rem'
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <button
                onClick={handleAddCategory}
                disabled={addingCategory || !newCategoryName.trim()}
                style={{
                  padding: '0 24px', borderRadius: '10px', border: 'none',
                  background: '#6366f1', color: 'white', fontWeight: 700,
                  cursor: 'pointer', opacity: (addingCategory || !newCategoryName.trim()) ? 0.6 : 1
                }}
              >
                {addingCategory ? <Loader2 size={18} className="spin" /> : 'Add'}
              </button>
            </div>

            {loading ? (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <Loader2 size={32} className="spin" color="#6366f1" />
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {filteredCategories.length === 0 ? (
                  <div style={{ gridColumn: '1/-1', padding: '3rem 2rem', textAlign: 'center', color: '#888', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                    <FolderPlus size={32} style={{ margin: '0 auto 12px', color: '#94a3b8' }} />
                    No categories added yet. <br/> Add your first one above!
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
                        onClick={() => handleDeleteCategory(cat.id)}
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
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#888', fontWeight: 600 }}>Select or create a custom type to manage categories.</p>
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
