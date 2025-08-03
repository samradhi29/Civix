import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Resources.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGavel,
  faInfoCircle,
  faPhoneAlt,
  faQuestionCircle,
  faChevronDown,
  faChevronUp,
  faFileAlt,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const faqData = [
  {
    question: "Can I file a complaint anonymously?",
    answer: "Currently, you must register to file a complaint so authorities can track and respond."
  },
  {
    question: "What happens after I submit a complaint?",
    answer: "Your complaint is reviewed by the appropriate department and progress is tracked."
  },
  {
    question: "How long does it take to resolve?",
    answer: "Timelines vary, but we aim to address issues within 7 working days."
  },
  {
    question: "Will I be notified of status changes?",
    answer: "Yes, you’ll receive email or dashboard updates on status changes."
  }
];

const Resources = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="resources-page-wrapper">
      {/* Back button OUTSIDE resources-container */}
        <div className="blob bg-green animate-blob"></div>
  <div className="blob bg-light-green animate-blob animation-delay-2000"></div>
  <div className="blob bg-yellow animate-blob animation-delay-4000"></div>

      <button
        className="back-button"
        onClick={() => window.history.back()}
        type="button"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="icon" /> Back
      </button>

      <div className="resources-container">

        <h1 className="resources-title">Citizen Resources</h1>

        <section className="resources-section">
          <h2 className="resources-subtitle">
            <FontAwesomeIcon icon={faGavel} className="icon green" />
            Your Rights & Responsibilities
          </h2>
          <p className="resources-text">
            You have the right to file civic complaints and receive updates. Misuse or false complaints may lead to action.
          </p>
        </section>

        <section className="resources-section">
          <h2 className="resources-subtitle">
            <FontAwesomeIcon icon={faInfoCircle} className="icon green" />
            How to File a Complaint
          </h2>
          <ol className="resources-list">
            <li>Login to your account.</li>
            <li>Click "File a Complaint" from the dashboard.</li>
            <li>Provide complete issue details.</li>
            <li>Submit and track the status anytime.</li>
          </ol>
        </section>

        <section className="resources-section">
          <h2 className="resources-subtitle">
            <FontAwesomeIcon icon={faPhoneAlt} className="icon green" />
            Emergency Contacts
          </h2>
          <ul className="resources-list">
            <li>Police: 100</li>
            <li>Fire: 101</li>
            <li>Women Helpline: 1091</li>
            <li>Child Helpline: 1098</li>
            <li>Cyber Crime: 155260</li>
          </ul>
        </section>

        <section className="resources-section">
          <h2 className="resources-subtitle">
            <FontAwesomeIcon icon={faFileAlt} className="icon green" />
            Related Laws & Acts
          </h2>
          <p className="resources-text">
            Get simplified summaries of local civic laws, nuisance acts, and safety regulations.
          </p>
        </section>

        <section className="resources-section">
          <h2 className="resources-subtitle">
            <FontAwesomeIcon icon={faQuestionCircle} className="icon green" />
            FAQs
          </h2>
          <div className="faq-section">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  {item.question}
                  <FontAwesomeIcon
                    icon={openIndex === index ? faChevronUp : faChevronDown}
                    className="arrow-icon"
                  />
                </button>
                {openIndex === index && (
                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Resources;
