import React, { useState } from 'react';
import './DownloadAndroid.css';

const DownloadAndroid = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Is the Civix app free to use?",
      answer: "Yes, Civix is completely free for all users. We believe civic engagement should be accessible to everyone."
    },
    {
      question: "Is this available on the Play Store?",
      answer: "Currently, the app is under development. Play Store release is coming very soon - stay tuned for updates!"
    },
    {
      question: "Will it work on all Android devices?",
      answer: "Yes, Civix is compatible with most Android devices running version 8.0 and above, covering 95% of active Android devices."
    },
    {
      question: "How does location-based services work?",
      answer: "Our app uses your location to show relevant local civic information, nearby events, and connect you with your local representatives."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use end-to-end encryption and follow strict privacy protocols. Your personal data is never shared with third parties."
    }
  ];

  const features = [
    { title: "Live Civic Updates", subtitle: "Stay notified of local events, alerts, and policy changes in real-time." },
    { title: "Location-Based Services", subtitle: "Get accurate civic info tailored to your neighborhood or region." },
    { title: "Raise Issues to Authorities", subtitle: "Report public problems directly to local officials through the app." },
    { title: "Polls & Surveys", subtitle: "Participate in shaping civic decisions via community surveys." },
    { title: "Secure & Private", subtitle: "Your data is protected with industry-leading security measures." }
  ];

  const stats = [
    { number: "50K+", label: "Beta Users" },
    { number: "4.8★", label: "App Rating" },
    { number: "100+", label: "Cities Covered" }
  ];

  return (
    <div className="download-container">
      <header className="hero">
        <h1>Civix for Android</h1>
        <p className="subtitle">Transform how you engage with your community. Stay informed, stay empowered.</p>
        <div className="buttons">
          <button className="primary" disabled>Coming Soon</button>
          <button className="secondary">Get Notified</button>
        </div>
        <p className="note">🚀 Currently under development</p>
      </header>

      <section className="features">
        <h2>Powerful Features</h2>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openFAQ === index ? 'open' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{faq.question}</span>
              {openFAQ === index ? (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              )}
            </div>
            {openFAQ === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </section>

      <section className="cta">
        <h2>Ready to Transform Your Civic Engagement?</h2>
        <p>Join thousands already making their voices heard. Be the first to know when Civix launches on Android.</p>
        <div className="buttons">
          <button className="primary">Notify Me on Launch</button>
          <button className="secondary">Learn More</button>
        </div>
      </section>

      <footer className="footer">
        <h3>Civix</h3>
        <p className="footer-note">© 2025 Civix</p>
      </footer>
    </div>
  );
};

export default DownloadAndroid;
