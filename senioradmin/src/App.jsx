import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import CommunitiesPage from './pages/CommunitiesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import InquiriesPage from './pages/InquiriesPage';
import MediaPage from './pages/MediaPage';
import SettingsPage from './pages/SettingsPage';
import CategoriesPage from './pages/CategoriesPage';

function AdminLayout() {
  const { user, loading } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f1628, #1a2035)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px',
            border: '3px solid rgba(99,102,241,0.3)',
            borderTopColor: '#6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem',
          }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Loading SeniorAdmin...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  const pages = {
    dashboard: <DashboardPage />,
    communities: <CommunitiesPage />,
    testimonials: <TestimonialsPage />,
    inquiries: <InquiriesPage />,
    media: <MediaPage />,
    settings: <SettingsPage />,
    categories: <CategoriesPage />,
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f2f4f8',
      fontFamily: "'Inter', 'Nunito', sans-serif",
    }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'flex-start',
      }}>
        {/* Top bar */}
        <div style={{ width: '100%' }}>
          <div style={{
            background: 'white',
            borderBottom: '1px solid #f0f0f8',
            padding: '0.875rem 2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'sticky', top: 0, zIndex: 50,
            boxShadow: '0 1px 0 #f0f0f8',
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                SeniorAnandam
              </span>
              <span style={{ color: '#ddd', margin: '0 8px' }}>›</span>
              <span style={{ fontSize: '0.85rem', color: '#1a2035', fontWeight: 700, textTransform: 'capitalize' }}>
                {activePage.replace('-', ' ')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 0 3px rgba(16,185,129,0.2)',
              }} />
              <span style={{ fontSize: '0.78rem', color: '#888', fontWeight: 600 }}>Live</span>
            </div>
          </div>

          {/* Page content */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {pages[activePage] || <DashboardPage />}
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #f2f4f8; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (max-width: 768px) {
          main > div > div:first-child { padding: 0.875rem 1rem !important; }
          main > div > div:last-child > div { padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AdminLayout />
    </AuthProvider>
  );
}
