import React, { useState, useRef } from 'react';
import { uploadToR2 } from '../lib/r2';
import { Upload, Trash2, Copy, CheckCircle, ImageIcon, Film, FileText, Loader2, Search, X } from 'lucide-react';

const DEMO_FILES = [
  { id: 1, name: 'gardens-hero.jpg', url: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'communities', size: '420 KB', uploaded_at: '2026-05-10' },
  { id: 2, name: 'harbor-view.jpg', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'communities', size: '380 KB', uploaded_at: '2026-05-10' },
  { id: 3, name: 'willow-ridge.jpg', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'communities', size: '510 KB', uploaded_at: '2026-05-11' },
  { id: 4, name: 'sunrise-pines.jpg', url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'communities', size: '445 KB', uploaded_at: '2026-05-11' },
  { id: 5, name: 'magnolia-grove.jpg', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'testimonials', size: '392 KB', uploaded_at: '2026-05-12' },
  { id: 6, name: 'oceanfront-suites.jpg', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'communities', size: '620 KB', uploaded_at: '2026-05-13' },
];

const FOLDERS = ['All', 'communities', 'testimonials', 'general'];

export default function MediaPage() {
  const [files, setFiles] = useState(DEMO_FILES);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState('All');
  const [copied, setCopied] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadFolder, setUploadFolder] = useState('general');
  const fileRef = useRef();

  const handleUpload = async (fileList) => {
    const filesArr = Array.from(fileList);
    if (!filesArr.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        filesArr.map(async (file) => {
          const url = await uploadToR2(file, uploadFolder);
          return {
            id: Date.now() + Math.random(),
            name: file.name,
            url,
            type: file.type.startsWith('image') ? 'image' : 'file',
            folder: uploadFolder,
            size: `${Math.round(file.size / 1024)} KB`,
            uploaded_at: new Date().toISOString().slice(0, 10),
          };
        })
      );
      setFiles(f => [...uploaded, ...f]);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Remove this file from library?')) return;
    setFiles(fs => fs.filter(f => f.id !== id));
  };

  const filtered = files.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFolder = folder === 'All' || f.folder === folder;
    return matchSearch && matchFolder;
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', width: '100%' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2035', margin: 0, letterSpacing: '-0.02em' }}>Media Library</h1>
        <p style={{ color: '#888', marginTop: '4px', fontSize: '0.9rem' }}>Upload and manage images/files stored in Cloudflare R2</p>
      </div>

      {/* Upload Zone */}
      <div
        style={{
          border: `2px dashed ${dragOver ? '#6366f1' : '#e5e7eb'}`,
          borderRadius: '16px', padding: '2.5rem', textAlign: 'center',
          background: dragOver ? '#f5f7ff' : '#fafafe', marginBottom: '1.5rem',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onClick={() => fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
      >
        <input ref={fileRef} type="file" multiple accept="image/*,video/*,.pdf" style={{ display: 'none' }} onChange={(e) => handleUpload(e.target.files)} />
        {uploading ? (
          <div>
            <Loader2 size={40} color="#6366f1" style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p style={{ color: '#6366f1', fontWeight: 600 }}>Uploading to Cloudflare R2...</p>
          </div>
        ) : (
          <div>
            <div style={{ width: '56px', height: '56px', background: '#eef2ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Upload size={26} color="#6366f1" />
            </div>
            <p style={{ margin: 0, fontWeight: 700, color: '#1a2035', fontSize: '1rem' }}>Drop files here or click to upload</p>
            <p style={{ margin: '6px 0 1rem', color: '#888', fontSize: '0.85rem' }}>Images, videos, PDFs · Files go to Cloudflare R2</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>Upload to folder:</span>
              <select value={uploadFolder} onChange={(e) => { e.stopPropagation(); setUploadFolder(e.target.value); }}
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '5px 10px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                {FOLDERS.filter(f => f !== 'All').map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={16} color="#aaa" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', padding: '10px 14px 10px 40px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', color: '#1a2035', background: 'white' }} />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {FOLDERS.map(f => (
            <button key={f} onClick={() => setFolder(f)} style={{
              padding: '8px 16px', borderRadius: '8px', border: folder === f ? 'none' : '1.5px solid #e5e7eb',
              background: folder === f ? '#2f3966' : 'white', color: folder === f ? 'white' : '#555',
              fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>{f}</button>
          ))}
        </div>
        <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: 'auto' }}>{filtered.length} files</span>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {filtered.map(f => (
          <div key={f.id} style={{
            background: 'white', borderRadius: '14px', overflow: 'hidden',
            border: '1px solid #f0f0f8', boxShadow: '0 2px 12px rgba(47,57,102,0.06)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(47,57,102,0.12)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(47,57,102,0.06)'; }}
          >
            {f.type === 'image' ? (
              <div style={{ height: '140px', overflow: 'hidden', background: '#f8f9fc' }}>
                <img src={f.url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            ) : (
              <div style={{ height: '140px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={48} color="#818cf8" />
              </div>
            )}
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontWeight: 600, color: '#1a2035', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={f.name}>{f.name}</div>
              <div style={{ color: '#aaa', fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                <span>{f.size}</span>
                <span style={{ background: '#f0f0f8', padding: '1px 6px', borderRadius: '50px', fontSize: '0.68rem' }}>{f.folder}</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <button onClick={() => copyUrl(f.id, f.url)} title="Copy URL" style={{
                  flex: 1, padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', background: copied === f.id ? '#ecfdf5' : 'white', cursor: 'pointer',
                  color: copied === f.id ? '#059669' : '#3b4b8a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 600, transition: 'all 0.2s',
                }}>
                  {copied === f.id ? <><CheckCircle size={12} /> Copied!</> : <><Copy size={12} /> Copy URL</>}
                </button>
                <button onClick={() => handleDelete(f.id)} style={{ padding: '6px', borderRadius: '8px', border: '1px solid #fecaca', background: '#fef2f2', cursor: 'pointer', color: '#ef4444', display: 'flex' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
