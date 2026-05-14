import React, { useEffect, useRef } from 'react';
import './About.css';
import {
  Heart, Shield, Users, Leaf, Star, Target,
  Award, Clock, Home, Smile
} from 'lucide-react';

/* ── Scroll-reveal hook ─────────────────── */
function useScrollReveal(selector) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

/* ── Data ────────────────────────────────── */
const stats = [
  { number: '50+',    label: 'Premium Communities', accent: false },
  { number: '10,000+', label: 'Happy Residents',    accent: true  },
  { number: '15 Yrs', label: 'Of Excellence',       accent: false },
  { number: '24/7',   label: 'Dedicated Support',   accent: false },
];

const values = [
  {
    icon: <Heart size={28} strokeWidth={1.5} />,
    title: 'Compassion',
    desc:  'Every resident is treated with warmth, dignity, and genuine care — not just as a resident, but as family.',
  },
  {
    icon: <Shield size={28} strokeWidth={1.5} />,
    title: 'Trust',
    desc:  'We earn the confidence of families through transparency, reliability, and consistent excellence in all we do.',
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    title: 'Community',
    desc:  'Belonging matters. Our communities foster meaningful friendships, shared experiences, and lifelong connections.',
  },
  {
    icon: <Leaf size={28} strokeWidth={1.5} />,
    title: 'Wellness',
    desc:  'Physical, mental, and social wellbeing sit at the heart of every space, programme, and service we offer.',
  },
];

const team = [
  {
    emoji: '👨‍💼',
    name:  'Rajesh Mohanty',
    role:  'Founder & Chairman',
    bio:   'A pioneer in senior living in India with over 20 years of experience, Rajesh\'s vision of dignified retirement inspired the creation of Senior Anandam.',
  },
  {
    emoji: '👩‍⚕️',
    name:  'Dr. Priya Nair',
    role:  'Chief Wellness Officer',
    bio:   'A geriatric care specialist, Priya designs holistic health programmes ensuring every resident thrives physically and mentally.',
  },
  {
    emoji: '🧑‍💻',
    name:  'Ankit Sharma',
    role:  'Head of Operations',
    bio:   'Ankit oversees day-to-day excellence across all 50+ communities, ensuring the highest standards of comfort and safety.',
  },
];

/* ── Component ───────────────────────────── */
const About = () => {
  useScrollReveal('.about-fade-in');

  return (
    <div className="about-page">

      {/* ── 1. HERO ───────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
        <div className="container">
          <div className="about-hero-content">
            <span className="about-hero-eyebrow">Our Story</span>
            <h1>
              Redefining What <em>Retirement</em> Means in India
            </h1>
            <p>
              Senior Anandam was founded on a simple belief: the later years of life
              deserve the same joy, vibrancy, and dignity as any other chapter. We build
              communities where seniors don't just reside — they flourish.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ──────────────────── */}
      <div className="about-stats-bar">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((s, i) => (
              <div className="about-stat-item" key={i}>
                <span className={`about-stat-number${s.accent ? ' about-stat-accent' : ''}`}>
                  {s.number}
                </span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. OUR STORY ──────────────────── */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-text about-fade-in">
              <span className="about-section-eyebrow">Who We Are</span>
              <h2>Born from a Desire to Give Parents the Best</h2>
              <p>
                <strong>Senior Anandam Properties</strong> was established in 2010 when our founder,
                Rajesh Mohanty, struggled to find a truly dignified, engaging home for his aging
                parents in Bhubaneswar. What existed was either clinical and institutional, or
                simply unavailable.
              </p>
              <p>
                He set out to create something different — communities that blend premium
                architecture with thoughtful care, lush green spaces, and a vibrant social
                calendar. Communities where seniors wake up excited about the day ahead.
              </p>
              <p>
                Today we operate <strong>50+ communities</strong> across Odisha and beyond, home
                to over 10,000 happy residents, supported by a team of 500+ dedicated professionals
                available around the clock.
              </p>
            </div>

            <div className="about-story-visual about-fade-in">
              <div className="story-card-main">
                <div className="card-icon">🏡</div>
                <h3>Built with Purpose</h3>
                <p>
                  Every community is designed around the needs, joys, and aspirations
                  of the people who call it home.
                </p>
              </div>
              <div className="story-badges">
                <div className="story-badge">
                  <span className="story-badge-number">2010</span>
                  <span className="story-badge-label">Year we were founded in Bhubaneswar, Odisha</span>
                </div>
                <div className="story-badge">
                  <span className="story-badge-number">50+</span>
                  <span className="story-badge-label">Premium communities across India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MISSION & VISION ───────────── */}
      <section className="about-mission">
        <div className="container">
          <div className="about-section-header about-fade-in">
            <span className="about-section-eyebrow">Purpose & Direction</span>
            <h2>Our Mission & Vision</h2>
          </div>
          <div className="about-mission-grid">
            <div className="mission-card mission about-fade-in">
              <div className="mission-card-icon">
                <Target size={28} strokeWidth={1.5} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To create senior living communities that honour the dignity, independence,
                and joy of older adults — offering exceptional care, world-class amenities,
                and a genuine sense of belonging, so every resident lives their best life.
              </p>
            </div>
            <div className="mission-card vision about-fade-in">
              <div className="mission-card-icon">
                <Star size={28} strokeWidth={1.5} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be India's most trusted and loved senior living brand — setting the gold
                standard for compassionate, sustainable, and vibrant communities that
                families across generations confidently choose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CORE VALUES ────────────────── */}
      <section className="about-values">
        <div className="container">
          <div className="about-section-header about-fade-in">
            <span className="about-section-eyebrow">What Drives Us</span>
            <h2>Our Core Values</h2>
            <p>
              These four principles are not just words on a wall. They are the lens through
              which every decision — large or small — is made at Senior Anandam.
            </p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card about-fade-in" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="value-icon-wrap">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. LEADERSHIP ─────────────────── */}
      <section className="about-team">
        <div className="container">
          <div className="about-section-header about-fade-in">
            <span className="about-section-eyebrow">The People Behind It</span>
            <h2>Meet Our Leadership</h2>
            <p>
              Passionate individuals united by one goal — making every resident's life
              as fulfilling and joyful as possible.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card about-fade-in" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="team-avatar">{member.emoji}</div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BAND ───────────────────── */}
      <section className="about-cta-band">
        <div className="container">
          <h2>Ready to Find the Perfect Community?</h2>
          <p>
            Our consultants are on hand seven days a week to guide you through every step —
            from your first question to moving day and beyond.
          </p>
          <div className="about-cta-buttons">
            <button className="btn btn-orange">Schedule a Free Tour</button>
            <button className="btn btn-outline">Call Us: 8144917996</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
