import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import logoImg from '../assets/logo.png';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Zap } from 'lucide-react';

export default function LoginPage() {
  const { signIn, isDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await signIn('admin@senioranandam.com', 'demo');
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1628 0%, #1a2035 40%, #2f3966 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', 'Nunito', sans-serif",
      padding: '1rem',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59,75,138,0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(99,102,241,0.2) 0%, transparent 50%)`,
      }} />

      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={logoImg} alt="Senior Anandam Logo" style={{
            width: '64px', height: '64px',
            objectFit: 'contain',
            margin: '0 auto 1rem',
          }} />
          <h1 style={{
            fontSize: '1.75rem', fontWeight: 800,
            color: 'white', margin: 0, letterSpacing: '-0.02em',
          }}>
            Senior<span style={{ color: '#818cf8' }}>Admin</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Management Panel · SeniorAnandam
          </p>
        </div>

        {/* Demo mode banner */}
        {!isSupabaseConfigured && (
          <div style={{
            background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '12px', padding: '0.875rem 1rem',
            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
            color: '#fcd34d', fontSize: '0.8rem', marginBottom: '1.5rem',
          }}>
            <Zap size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
            <div>
              <strong>Demo Mode</strong> — Supabase not configured yet.<br />
              Click "Enter Demo Panel" to explore with sample data.
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '0.875rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            color: '#fca5a5', fontSize: '0.875rem', marginBottom: '1.5rem',
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        {/* Demo Login Button */}
        {!isSupabaseConfigured && (
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            id="demo-login-btn"
            style={{
              width: '100%', padding: '14px', marginBottom: '1rem',
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              border: 'none', borderRadius: '12px',
              color: '#1a2035', fontSize: '1rem', fontWeight: 800,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Zap size={18} /> Enter Demo Panel
          </button>
        )}

        {/* Divider */}
        {!isSupabaseConfigured && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>or sign in with Supabase</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@senioranandam.com"
                required
                id="admin-email"
                style={{
                  width: '100%', padding: '12px 14px 12px 42px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px', color: 'white',
                  fontSize: '0.95rem', outline: 'none',
                  boxSizing: 'border-box', fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#818cf8'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                id="admin-password"
                style={{
                  width: '100%', padding: '12px 42px 12px 42px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px', color: 'white',
                  fontSize: '0.95rem', outline: 'none',
                  boxSizing: 'border-box', fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#818cf8'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 0, display: 'flex' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            id="login-submit"
            style={{
              width: '100%', padding: '14px',
              background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #3b4b8a, #6366f1)',
              border: 'none', borderRadius: '12px',
              color: 'white', fontSize: '1rem', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? (
              <span style={{
                width: '16px', height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white', borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
                display: 'inline-block',
              }} />
            ) : null}
            {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Access restricted to authorized administrators only
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.25) !important; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
