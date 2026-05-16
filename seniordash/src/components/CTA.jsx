import React, { useState, useEffect } from 'react';
import './CTA.css';
import { Phone } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/* ─── Contact Form ─────────────────────────────────────────────── */

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pincode: '',
  helpType: '',
  comments: '',
  hearAbout: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      community: 'General Inquiry',
      type: formData.helpType || 'General Inquiry',
      message: `Pin Code: ${formData.pincode}\nHow did you hear: ${formData.hearAbout}\nComments: ${formData.comments}`,
      status: 'new',
    };

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('inquiries').insert([payload]);
        if (error) throw error;
      }
      setStatus('success');
      setFormData(EMPTY_FORM);
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success-state">
        <div className="form-success-icon">✓</div>
        <h3>Thank you!</h3>
        <p>We've received your enquiry and will be in touch shortly.</p>
        <button
          className="btn btn-primary"
          onClick={() => setStatus('idle')}
          style={{ marginTop: '1.5rem' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          required
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          name="pincode"
          placeholder="Pin Code *"
          required
          value={formData.pincode}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <select name="helpType" value={formData.helpType} onChange={handleChange} required>
          <option value="" disabled hidden>How can we help you?</option>
          <option value="Schedule a Tour">Schedule a Tour</option>
          <option value="Pricing Information">Pricing Information</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>
      <div className="form-row">
        <textarea
          name="comments"
          placeholder="Comments"
          rows="4"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-row">
        <select name="hearAbout" value={formData.hearAbout} onChange={handleChange} required>
          <option value="" disabled hidden>How did you hear about us?</option>
          <option value="Search Engine">Search Engine</option>
          <option value="Social Media">Social Media</option>
          <option value="Friend or Family">Friend or Family</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {status === 'error' && (
        <p style={{ color: '#ff6b6b', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary submit-btn"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
};

/* ─── CTA Section ──────────────────────────────────────────────── */

const CTA = () => {
  const [bgImage, setBgImage] = useState(() => {
    const cached = localStorage.getItem('cached_cta_bg');
    return cached ? cached : '';
  });

  useEffect(() => {
    async function fetchCtaBg() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'cta_bg_image')
          .single();

        if (!error && data?.value && typeof data.value === 'string') {
          setBgImage(data.value);
          localStorage.setItem('cached_cta_bg', data.value);
        }
      } catch (err) {
        console.error('Error fetching CTA bg image:', err);
      }
    }
    fetchCtaBg();
  }, []);

  const backgroundStyle = bgImage ? { backgroundImage: `url(${bgImage})` } : {};

  return (
    <section id="get-in-touch" className="contact-section" style={backgroundStyle}>
      <div className="contact-overlay"></div>
      <div className="container contact-container">

        {/* Left Column: Information */}
        <div className="contact-info-col">
          <h2 className="contact-heading">Get in Touch to Learn More</h2>
          <div className="accent-line"></div>

          <div className="contact-text">
            <p>
              We're here to serve as your resource and guide as you explore Senior Anandam and your senior living options.
            </p>
            <p>
              Fill out the form and we will be in touch to help answer your questions and connect you with a local Senior Anandam community.
            </p>
            <p>
              We look forward to speaking with you.
            </p>
          </div>

          <div className="contact-phone-block">
            <h4 className="phone-label">PRICING &amp; AVAILABILITY:</h4>
            <div className="phone-number">
              <Phone size={20} className="phone-icon" />
              <span>8144917996, 9937291203</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form-col">
          <ContactForm />
        </div>

      </div>
    </section>
  );
};

export default CTA;
