import React, { useEffect } from 'react';
import { ShieldCheck, Lock, PersonStanding, Armchair, Activity, Clock, ClipboardList, DoorOpen, GripHorizontal, TrendingUp, ChefHat, LayoutGrid, Cpu, BellRing, Unlock, Lightbulb, Fan, Layers, Paintbrush, Phone, User, Shield, ArrowRight } from 'lucide-react';
import './HomeModification.css';

/* ── Scroll reveal ────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.hm-fade');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('hm-visible'); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Data ─────────────────────────────────── */
const goals = [
  { icon: PersonStanding, title: 'Self-Sufficiency / Independence', desc: "Enhance seniors' ability to perform daily activities independently." },
  { icon: ShieldCheck, title: 'Safety', desc: 'Minimise hazards and reduce the risk of falls or accidents.' },
  { icon: Lock, title: 'Security', desc: 'Ensure seniors feel safe and secure in their living environment.' },
  { icon: Armchair, title: 'Comfort & Convenience', desc: 'Enhance overall comfort and convenience to improve quality of life.' },
  { icon: Activity, title: 'Mobility', desc: 'Facilitate movement throughout the home, especially for those using mobility aids.' },
];

const steps = [
  'Our expert conducts a home assessment.',
  'Our experts evaluate each room for accessibility and functionality.',
  'We may consult their occupational therapist for expert recommendations.',
  'We explore cost-effective options to address specific needs and improve quality of life.',
  'We compile a list of essential changes based on the senior\'s needs and capabilities.',
  'We provide written estimates and written confirmation before proceeding.',
  'We assign the job to our Senior Home Modification Executor.',
  'Modification work is supervised by our team of experts.',
  'We complete the work in given time line with promised quality.',
  'Our team inspect jointly for a feedback meeting and record the written feedback.',
  'We essentially involve seniors and family members in the decision-making process and tailor modifications to their specific needs.',
];

const modifications = [
  { icon: DoorOpen, title: 'Wider Doorways', desc: 'Facilitate movement with wheelchairs, walkers, or canes.' },
  { icon: GripHorizontal, title: 'Grab Bars', desc: 'Provide extra support in high-risk areas like bathrooms.' },
  { icon: TrendingUp, title: 'Outdoor Ramps', desc: 'Ensure smooth transitions into the home for those with mobility aids.' },
  { icon: ChefHat, title: 'Kitchen Modifications', desc: 'Lower countertops and install user-friendly cabinets for accessibility.' },
  { icon: LayoutGrid, title: 'Friendly Flooring', desc: 'Replace outdated flooring to reduce tripping hazards.' },
  { icon: Cpu, title: 'Smart Home Devices', desc: 'Integrate technology to assist with daily tasks and promote independence.' },
  { icon: BellRing, title: 'Medical Alert Systems', desc: 'Install systems for immediate assistance in case of emergencies.' },
  { icon: Unlock, title: 'Easy-Open Door Handles', desc: 'Replace traditional knobs with levered handles for easier manipulation.' },
];

const services = [
  { icon: Lightbulb, text: 'Automated Sensor based operation of Existing Lights in Bathrooms' },
  { icon: Fan, text: 'Automation of Existing Fans and Lights in Bedrooms with remote control' },
  { icon: Layers, text: 'Antiskid Flooring tape in Bathroom and Kitchen' },
  { icon: GripHorizontal, text: 'Fixing of Grab Rails in Bathrooms' },
  { icon: Paintbrush, text: 'High lighting of floor level differences with marking tapes' },
];

/* ── Component ───────────────────────────── */
const HomeModification = () => {
  useScrollReveal();

  return (
    <div>

      {/* ── 1. HERO ─────────────────────── */}
      <section className="hm-hero">
        <div className="hm-hero-grid">
          {/* Left: text */}
          <div className="hm-hero-left">
            <h1>Senior Friendly<br />Home Modification<br />Services</h1>
            <div className="hm-hero-accent-line" />
            <p>
              Homes should grow with us. We help make your home safer, more comfortable and
              easier to live in — so you or your loved one can age in place with dignity and independence.
            </p>
            <p>
              Our expert team designs and implements practical modifications that enhance safety,
              accessibility and quality of life.
            </p>
          </div>

          {/* Right: image panel + badge */}
          <div className="hm-hero-right">
            <img src="/images/home_mod_hero.png" alt="Happy senior couple" className="hm-hero-img" />
            <div className="hm-badge-card">
              <div className="badge-icon"><ShieldCheck size={32} strokeWidth={2} color="white" /></div>
              <p>Safe Home.<br />Independent Life.<br />Better Tomorrow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. GOALS ────────────────────── */}
      <section className="hm-goals">
        <div className="container">
          <div className="hm-section-header hm-fade">
            <div className="hm-section-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond">◆</span>
              <span>Goals of Home Modification for Seniors</span>
              <span className="divider-diamond">◆</span>
              <span className="divider-line"></span>
            </div>
          </div>
          <div className="hm-goals-grid">
            {goals.map((g, i) => {
              const Icon = g.icon;
              return (
                <div className="hm-goal-card hm-fade" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="hm-goal-icon"><Icon size={28} strokeWidth={1.5} /></div>
                  <h4>{g.title}</h4>
                  <p>{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. WHEN + STEPS ─────────────── */}
      <section className="hm-when-steps">
        <div className="container">
          <div className="hm-two-col">
            {/* When to Begin */}
            <div className="hm-info-card hm-fade">
              <div className="card-icon-wrap"><Clock size={28} strokeWidth={1.5} /></div>
              <h3>When to Begin the Senior Friendly Home Modification Process</h3>
              <p>
                We need to start thinking about aging in place and home modifications well before
                the actual need arises. Incorporate long-term care plans into routine home
                improvements and repairs.
              </p>
              <p>
                Consider modifications during renovations or remodels to save time and money in
                the long run.
              </p>
            </div>

            {/* Steps */}
            <div className="hm-info-card hm-fade">
              <div className="card-icon-wrap"><ClipboardList size={28} strokeWidth={1.5} /></div>
              <h3>Steps for Senior Friendly Home Modifications Services</h3>
              <div className="hm-steps-two-col">
                {steps.map((step, i) => (
                  <div className="hm-step-item" key={i}>
                    <span className="hm-step-num">{i + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MUST-HAVE MODIFICATIONS ──── */}
      <section className="hm-modifications">
        <div className="container">
          <div className="hm-section-header hm-fade">
            <div className="hm-section-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond">◆</span>
              <span>Must-Have Home Modifications</span>
              <span className="divider-diamond">◆</span>
              <span className="divider-line"></span>
            </div>
          </div>
          <div className="hm-mods-grid">
            {modifications.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <div className="hm-mod-item hm-fade" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <span className="hm-mod-icon"><Icon size={32} strokeWidth={1.5} color="var(--primary-color)" /></span>
                  <h4>{mod.title}</h4>
                  <p>{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. BASIC SERVICES ───────────── */}
      <section className="hm-services">
        <div className="container">
          <div className="hm-section-header hm-fade">
            <div className="hm-section-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond">◆</span>
              <span>Basic Service will include</span>
              <span className="divider-diamond">◆</span>
              <span className="divider-line"></span>
            </div>
          </div>
          <div className="hm-services-horizontal hm-fade">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div className="hm-service-pill" key={i}>
                  <div className="service-pill-icon">
                    <Icon size={24} strokeWidth={1.5} color="white" />
                  </div>
                  <p>{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING QUOTE ────────────── */}
      <section className="hm-quote">
        <div className="container">
          <div className="hm-quote-card hm-fade">
            <div className="hm-quote-icon">
              <ShieldCheck size={48} strokeWidth={1.5} color="white" />
            </div>
            <div className="hm-quote-text">
              <p>
                We ensure that by prioritizing safety, accessibility, and comfort, home modifications
                can significantly improve the quality of life for seniors aging in place. With our
                careful planning and consideration, every home can be transformed into safe and
                senior-friendly living spaces.
              </p>
            </div>
            <div className="hm-quote-illustration">
              <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M120 40L150 15L180 40V100H120V40Z" stroke="white" strokeWidth="2" />
                <path d="M140 60H160V100H140V60Z" stroke="white" strokeWidth="2" />
                <path d="M130 30V10H140V20" stroke="white" strokeWidth="2" />
                <path d="M100 50L130 25L160 50" stroke="white" strokeWidth="2" />
                <path d="M0 100H180" stroke="white" strokeWidth="2" />
                <path d="M90 60C90 40 70 40 70 60V100H90V60Z" stroke="white" strokeWidth="2" />
                <path d="M50 70C50 55 35 55 35 70V100H50V70Z" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CONTACT STRIP ────────────── */}
      <section className="hm-contact-strip">
        <div className="container">
          <div className="hm-contact-grid">
            {/* Left: Call CTA */}
            <div className="hm-contact-cta hm-fade">
              <div className="cta-icon"><Phone size={24} /></div>
              <p>Kindly call us for the presentation<br />at your place in Odisha.</p>
            </div>

            {/* Right: Person card */}
            <div className="hm-contact-person hm-fade" style={{ transitionDelay: '0.1s' }}>
              <div className="person-avatar"><User size={28} /></div>
              <div className="person-details">
                <h4>Malay Ranjan Sahoo</h4>
                <p className="role">Program Awareness Officer — Odisha</p>
                <div className="phone-num">📞 81449-17996, 99372-91203</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeModification;
