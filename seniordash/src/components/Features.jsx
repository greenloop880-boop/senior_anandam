import React from 'react';
import './Features.css';
import { Home, Users, Heart, Leaf } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Home size={32} strokeWidth={1.5} />,
      title: 'Beautiful Homes',
      description: 'Modern, low-maintenance homes designed for ease and comfort.'
    },
    {
      icon: <Users size={32} strokeWidth={1.5} />,
      title: 'Vibrant Communities',
      description: 'Enjoy social activities, clubs, and events that inspire connection.'
    },
    {
      icon: <Heart size={32} strokeWidth={1.5} />,
      title: 'Support When You Need It',
      description: 'Access to services and care options for peace of mind — on your terms.'
    },
    {
      icon: <Leaf size={32} strokeWidth={1.5} />,
      title: 'Prime Locations',
      description: 'Conveniently located near shopping, dining, healthcare, and more.'
    }
  ];

  return (
    <section className="features-section section-padding">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
