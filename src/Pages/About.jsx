// src/components/About.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css';
import mission from '../assets/mission.png';

function About() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,   // repeat when scrolling up/down
      mirror: true,  // animate out while scrolling past
    });

    // Refresh AOS after layout changes / images load
    const refreshAOS = () => AOS.refresh();

    // refresh on load/resize and a small timeout (helps with images and fonts)
    window.addEventListener('load', refreshAOS);
    window.addEventListener('resize', refreshAOS);
    const timeoutId = setTimeout(refreshAOS, 600);

    // prefer-color-scheme listener
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(mq.matches);
    mq.addEventListener && mq.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('load', refreshAOS);
      window.removeEventListener('resize', refreshAOS);
      clearTimeout(timeoutId);
      mq.removeEventListener && mq.removeEventListener('change', handleChange);
    };
  }, []);

  const features = [
    {
      icon: '📱',
      title: 'Easy Reporting',
      description:
        'Quickly log issues with a few taps and notify the right authorities instantly.',
      details:
        'Our intuitive interface makes reporting civic issues as simple as sending a text message.',
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description:
        'Stay updated with real-time progress on your complaints and resolutions.',
      details:
        'Get notifications and track every step from submission to resolution with our advanced tracking system.',
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description:
        'Engage and collaborate with your neighborhood to drive meaningful change.',
      details:
        'Join forces with neighbors, vote on issues, and create a stronger voice for your community.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Report Issue',
      description:
        'Log in via mobile app and describe your issue with location and photo',
    },
    {
      number: '02',
      title: 'Route & Process',
      description: 'Civix automatically routes your report to the relevant department',
    },
    {
      number: '03',
      title: 'Track & Resolve',
      description:
        'Monitor updates and resolution status in real-time with notifications',
    },
  ];

  return (
    <div className={`about-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="content-wrapper">
        {/* HERO */}
        <section className="hero-section" data-aos="fade-up">
          <div className="hero-content">
            <div className="glitter-container" aria-hidden>
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="glitter-star"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* small framer animation only for the badge (doesn't conflict with AOS) */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
              className="hero-badge"
            >
              ✨ Empowering Citizens
            </motion.div>

            <h1 className="hero-title">
              Report Local Issues.
              <br />
              <span className="gradient-text">Make Your City Better.</span>
            </h1>

            <p className="hero-description">
              Civix helps citizens report and track local civic issues like potholes, broken lights,
              and garbage collection problems with unprecedented ease and transparency.
            </p>

            <div className="hero-cta">
              <Link to="/signup">
                <button className="cta-primary">Get Started</button>
              </Link>
              <button className="cta-secondary">Learn More</button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section" data-aos="fade-up" data-aos-delay="100">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">
              Everything you need to make a real difference in your community
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{ scale: 1.04 }}
                onHoverStart={() => setActiveFeature(index)}
                onHoverEnd={() => setActiveFeature(null)}
                data-aos="fade-up"
                data-aos-delay={120 * index}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <p className="feature-details">{feature.details}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="process-section" data-aos="fade-up" data-aos-delay="200">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple steps to create meaningful change</p>
          </div>

          <div className="process-timeline">
            {steps.map((step, index) => (
              <div
                key={index}
                className="timeline-item"
                data-aos="fade-right"
                data-aos-delay={index * 120}
              >
                <div className="timeline-marker">
                  <span className="step-number">{step.number}</span>
                </div>
                <div className="timeline-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section className="why-section" data-aos="fade-up" data-aos-delay="300">
          <div className="why-content">
            <div className="why-text">
              <h2 className="why-section-title">Why Choose Civix?</h2>
              <p className="why-description">
                Civix empowers citizens by simplifying the process to voice concerns and foster positive
                change in communities. We connect the public with civic authorities for enhanced governance,
                transparency, and real results that matter.
              </p>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Issues Resolved</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Cities Connected</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">User Satisfaction</span>
                </div>
              </div>
            </div>

            <div className="why-visual">
              <div className="visual-element">
                <div className="pulse-ring" />
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mission-vision-section" data-aos="fade-up" data-aos-delay="400">
          <div className="mv-container">
            <div className="mv-text">
              <h2 className="section-title">Our Mission</h2>
              <p>
                To empower every citizen to take action and improve their city by making civic reporting
                simple, transparent, and impactful.
              </p>
              <h2 className="section-title">Our Vision</h2>
              <p>
                A world where communities and governments work hand-in-hand to create cleaner, safer, and
                more livable cities for everyone.
              </p>
            </div>
            <div className="mv-image">
              {/* refresh AOS once this image is loaded */}
              <img src={mission} alt="Mission" onLoad={() => AOS.refresh()} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" data-aos="zoom-in" data-aos-delay="500">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join thousands of citizens who are already using Civix to improve their communities.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Download App</button>
              <Link to="/contact">
                <button className="cta-secondary">Contact Us</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
