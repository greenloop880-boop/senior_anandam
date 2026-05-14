import React from 'react';
import './TrustMetrics.css';
import { Home, Smile, ShieldCheck, Clock } from 'lucide-react';

const TrustMetrics = () => {
  const metrics = [
    {
      icon: <Home size={32} strokeWidth={1.5} />,
      number: "50+",
      label: "Premium Communities"
    },
    {
      icon: <Smile size={32} strokeWidth={1.5} />,
      number: "10,000+",
      label: "Happy Residents"
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      number: "15 Years",
      label: "Of Excellence"
    },
    {
      icon: <Clock size={32} strokeWidth={1.5} />,
      number: "24/7",
      label: "Dedicated Support"
    }
  ];

  return (
    <section className="trust-metrics-section">
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div className="metric-item" key={index}>
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-content">
                <h3 className="metric-number">{metric.number}</h3>
                <p className="metric-label">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMetrics;
