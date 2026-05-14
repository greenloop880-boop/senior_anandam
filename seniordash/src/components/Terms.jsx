import React, { useEffect } from 'react';
import './Terms.css';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-wrapper">
      <div className="legal-hero">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p>Last Updated: May 13, 2026</p>
        </div>
      </div>

      <div className="container legal-content">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Senior Anandam website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section>
          <h2>2. Use of Services</h2>
          <p>
            Our services are intended for individuals seeking senior living and modification solutions. You agree to provide accurate and complete information when requesting a tour or contacting us.
          </p>
        </section>

        <section>
          <h2>3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of Senior Anandam and is protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2>4. User Obligations</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the website for any unlawful purpose.</li>
            <li>Attempt to interfere with the proper working of the website.</li>
            <li>Submit false or misleading information through our forms.</li>
          </ul>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            Senior Anandam shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or services.
          </p>
        </section>

        <section>
          <h2>6. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2>7. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the jurisdiction in which Senior Anandam operates.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
