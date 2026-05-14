import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import logoImg from '../assets/logo.png';
import {
  LayoutDashboard, Building2, MessageSquare, Users,
  ImageIcon, Settings, LogOut, Menu, X,
  ChevronRight, Bell
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'communities', label: 'Communities', icon: Building2 },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'inquiries', label: 'Inquiries', icon: Users },
  { id: 'media', label: 'Media Library', icon: ImageIcon },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, setActivePage }) {
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0f1628 0%, #1a2035 100%)',
      borderRight: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '1.5rem 0' : '1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoImg} alt="Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
          {!collapsed && (
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}>
                Senior<span style={{ color: '#818cf8' }}>Admin</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', marginTop: '2px' }}>Management Panel</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255,255,255,0.08)', border: 'none',
            borderRadius: '8px', padding: '6px', cursor: 'pointer',
            color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center',
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => { setActivePage(id); setMobileOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : '10px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '12px' : '11px 14px',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(59,75,138,0.8), rgba(99,102,241,0.6))'
                  : 'transparent',
                color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                fontSize: '0.875rem', fontWeight: isActive ? 700 : 500,
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
              }}
              onMouseOver={(e) => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseOut={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
              title={collapsed ? label : ''}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{
        padding: '1rem 0.75rem',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        {!collapsed && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 14px', marginBottom: '8px',
            background: 'rgba(255,255,255,0.05)', borderRadius: '10px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
            }}>
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'Admin'}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>Super Admin</div>
            </div>
          </div>
        )}
        <button
          onClick={signOut}
          id="sidebar-logout"
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            gap: collapsed ? 0 : '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '12px' : '10px 14px',
            borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: 'transparent',
            color: 'rgba(239,68,68,0.7)',
            fontSize: '0.875rem', fontWeight: 600,
            fontFamily: 'inherit', transition: 'all 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          title={collapsed ? 'Sign Out' : ''}
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{
        width: collapsed ? '72px' : '240px',
        height: '100vh', position: 'sticky', top: 0,
        flexShrink: 0, transition: 'width 0.25s ease',
        display: window.innerWidth < 768 ? 'none' : 'block',
      }}>
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          display: 'none', position: 'fixed', top: '1rem', left: '1rem', zIndex: 100,
          background: '#1a2035', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px', padding: '8px', cursor: 'pointer', color: 'white',
        }}
        id="mobile-menu-btn"
        className="mobile-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ flex: 1, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          />
          <div style={{ width: '240px', height: '100%' }}>
            <SidebarContent />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
