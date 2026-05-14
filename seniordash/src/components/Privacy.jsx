import React, { useEffect } from 'react';
import './Terms.css'; // Reusing the same styles

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-wrapper">
      <div className="legal-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last Updated: May 13, 2026</p>
        </div>
      </div>

      <div className="container legal-content">
        <section>
          <h2>1. Information We Collect</h2>
          <p>
            When you use our website, we may collect personal information that you provide to us, such as your name, email address, phone number, and location details when you fill out our contact or tour request forms.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Respond to your inquiries and schedule tours.</li>
            <li>Provide information about our communities and services.</li>
            <li>Improve our website and user experience.</li>
            <li>Communicate with you regarding updates or promotions (if opted in).</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            Our website may use "cookies" to enhance the user experience. You can choose to set your web browser to refuse cookies, or to alert you when cookies are being sent.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Links</h2>
          <p>
            Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies.
          </p>
        </section>

        <section>
          <h2>6. Your Consent</h2>
          <p>
            By using our site, you consent to our website's privacy policy.
          </p>
        </section>

        <section>
          <h2>7. Contacting Us</h2>
          <p>
            If there are any questions regarding this privacy policy, you may contact us using the information in the footer of this website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
