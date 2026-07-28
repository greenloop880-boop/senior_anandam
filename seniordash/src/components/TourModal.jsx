import React, { useState } from 'react';
import { X, Calendar, User, Phone, Mail, MapPin } from 'lucide-react';
import './TourModal.css';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const TourModal = ({ isOpen, onClose, selectedCommunity }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSupabaseConfigured) {
      try {
        await supabase.from('inquiries').insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          community: selectedCommunity ? (selectedCommunity.title || selectedCommunity.name) : 'General Inquiry',
          type: 'Tour Request',
          message: `Date: ${formData.date}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\nNotes: ${formData.notes}`,
          status: 'new'
        }]);
      } catch (err) {
        console.error('Failed to save tour request:', err);
      }
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', date: '', address: '', city: '', pincode: '', notes: '' });
    }, 2500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>

        <div className="modal-body">
          <div className="modal-header">
            <h2>Schedule a Tour</h2>
            {selectedCommunity && (
              <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: '#6366f1', fontWeight: 600 }}>
                📍 {selectedCommunity.title || selectedCommunity.name}
              </p>
            )}
          </div>

          {submitted ? (
            <div className="modal-success">
              <div className="success-icon">✓</div>
              <h3>Request Received!</h3>
              <p>We'll be in touch shortly to confirm your tour date.</p>
            </div>
          ) : (
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label><User size={16} /> Full Name</label>
                <input type="text" name="name" required placeholder="Name" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><Mail size={16} /> Email Address</label>
                  <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label><Phone size={16} /> Phone Number</label>
                  <input type="tel" name="phone" required placeholder="Mobile number" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label><Calendar size={16} /> Preferred Date</label>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} />
              </div>

              <div className="location-section">
                <div className="form-group">
                  <label><MapPin size={16} /> Street Address</label>
                  <input type="text" name="address" required placeholder="Street address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" required placeholder="City" value={formData.city} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Pin Code</label>
                    <input type="text" name="pincode" required placeholder="Pin code" value={formData.pincode} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea name="notes" rows="2" placeholder="Any specific requirements or questions?" value={formData.notes} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">Confirm Request</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourModal;
