import React, { useEffect } from 'react';
import './Terms.css'; // Reusing the legal styling

const Accessibility = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-wrapper">
      <div className="legal-hero">
        <div className="container">
          <h1>Accessibility Statement</h1>
          <p>Commitment to Inclusive Design</p>
        </div>
      </div>

      <div className="container legal-content">
        <section>
          <h2>1. Our Commitment</h2>
          <p>
            Senior Anandam is committed to ensuring that our website is accessible to everyone, including seniors and individuals with disabilities. We strive to provide a seamless digital experience that follows best practices for accessibility and inclusive design.
          </p>
        </section>

        <section>
          <h2>2. Standards & Guidelines</h2>
          <p>
            We aim to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with a wide array of disabilities and more user-friendly for everyone.
          </p>
        </section>

        <section>
          <h2>3. Key Features for Seniors</h2>
          <p>
            Recognizing our core audience, we have implemented specific design choices to aid usability:
          </p>
          <ul>
            <li><strong>High Contrast:</strong> We use color palettes that ensure high legibility between text and backgrounds.</li>
            <li><strong>Typography:</strong> Our fonts are chosen for clarity and can be resized by standard browser tools without losing functionality.</li>
            <li><strong>Navigation:</strong> We maintain a consistent and predictable navigation structure across all pages.</li>
            <li><strong>Interactive Elements:</strong> Buttons and links have clear hover and focus states to indicate interactivity.</li>
          </ul>
        </section>

        <section>
          <h2>4. Ongoing Efforts</h2>
          <p>
            Accessibility is an ongoing process. We regularly review our website and components to identify and fix potential barriers. Our goal is to ensure that all users, regardless of technology or ability, can access our information and services.
          </p>
        </section>

        <section>
          <h2>5. Feedback & Support</h2>
          <p>
            We welcome your feedback on the accessibility of the Senior Anandam website. If you encounter any accessibility barriers or have suggestions for improvement, please let us know:
          </p>
          <ul>
            <li>Email: accessibility@senioranandam.com</li>
            <li>Phone: 8144917996</li>
          </ul>
        </section>

        <section>
          <h2>6. Third-Party Content</h2>
          <p>
            While we strive for full accessibility, some third-party content (like embedded maps or videos) may have limitations beyond our direct control. We encourage these providers to meet the same high standards we set for ourselves.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Accessibility;
