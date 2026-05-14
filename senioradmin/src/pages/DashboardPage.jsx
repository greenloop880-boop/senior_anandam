import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Building2, Users, MessageSquare, ImageIcon,
  TrendingUp, ArrowUpRight, Clock, Star, Eye
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <div style={{
    background: 'white', borderRadius: '16px',
    padding: '1.5rem', border: '1px solid #f0f0f8',
    boxShadow: '0 4px 24px rgba(47,57,102,0.06)',
    display: 'flex', flexDirection: 'column', gap: '1rem',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(47,57,102,0.12)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 24px rgba(47,57,102,0.06)';
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '14px',
        background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={22} color={color} />
      </div>
    </div>
    <div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1a2035', lineHeight: 1 }}>{value}</div>
      <div style={{ color: '#888', fontSize: '0.875rem', marginTop: '4px' }}>{label}</div>
    </div>
  </div>
);

export default function DashboardPage() {
  const [stats, setStats] = useState({ communities: 0, inquiries: 0, testimonials: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      if (!isSupabaseConfigured) { setLoading(false); return; }
      try {
        const [{ count: communities }, { count: testimonials }, { count: inquiries }] = await Promise.all([
          supabase.from('communities').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        ]);

        const { data: recent } = await supabase
          .from('inquiries')
          .select('name, community, type, created_at, status')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          communities: communities ?? 0,
          testimonials: testimonials ?? 0,
          inquiries: inquiries ?? 0,
        });
        setRecentInquiries(recent || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const timeAgo = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr${hrs !== 1 ? 's' : ''} ago`;
    return `${Math.floor(hrs / 24)} day(s) ago`;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2035', margin: 0, letterSpacing: '-0.02em' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: '#888', marginTop: '4px', fontSize: '0.9rem' }}>
          Welcome back! Here's what's happening with SeniorAnandam.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
      }}>
        <StatCard icon={Building2} label="Communities" value={stats.communities} color="#3b4b8a" />
        <StatCard icon={Users} label="Inquiries" value={stats.inquiries} color="#6366f1" />
        <StatCard icon={MessageSquare} label="Testimonials" value={stats.testimonials} color="#10b981" />
      </div>

      {/* Recent Inquiries + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Recent Activity */}
        <div style={{
          background: 'white', borderRadius: '16px',
          border: '1px solid #f0f0f8', boxShadow: '0 4px 24px rgba(47,57,102,0.06)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '1.25rem 1.5rem', borderBottom: '1px solid #f5f5f8',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a2035', margin: 0 }}>
              Recent Inquiries
            </h2>
          </div>
          <div>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#aaa', fontSize: '0.875rem' }}>Loading...</div>
            ) : recentInquiries.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#aaa', fontSize: '0.875rem' }}>
                No inquiries yet.
              </div>
            ) : recentInquiries.map((item, i) => (
              <div key={i} style={{
                padding: '1rem 1.5rem', borderBottom: i < recentInquiries.length - 1 ? '1px solid #f8f8fb' : 'none',
                display: 'flex', alignItems: 'center', gap: '1rem',
                transition: 'background 0.15s',
              }}
                onMouseOver={(e) => e.currentTarget.style.background = '#fafafe'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b4b8a, #6366f1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                }}>
                  {item.name?.[0] || '?'}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, color: '#1a2035', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Building2 size={11} />
                    {item.community || '—'}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: '#bbb', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                    <Clock size={10} /> {timeAgo(item.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'white', borderRadius: '16px',
          border: '1px solid #f0f0f8', boxShadow: '0 4px 24px rgba(47,57,102,0.06)',
          padding: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a2035', margin: '0 0 1rem' }}>
            Quick Actions
          </h2>
          {[
            { label: 'Add New Community', color: '#3b4b8a' },
            { label: 'Review Testimonials', color: '#10b981' },
            { label: 'View Inquiries', color: '#6366f1' },
            { label: 'Site Customization', color: '#f59e0b' },
          ].map(({ label, color }, i) => (
            <button
              key={i}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px', borderRadius: '10px', border: `1.5px solid ${color}22`,
                background: `${color}08`, cursor: 'pointer', marginBottom: '8px',
                color: color, fontWeight: 600, fontSize: '0.875rem',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.transform = 'translateX(2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = `${color}08`; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              {label} <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
