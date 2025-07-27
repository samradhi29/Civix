import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkModeToggler from "../DarkModeToggle";
import {
  faFileAlt,
  faListUl,
  faUser,
  faHeadset,
  faChartBar,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import "./UserDashboard.css";
import { useAuth } from '@clerk/clerk-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    if (signOut) {
      await signOut(); // Clerk: clears session and data
    }
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage-update"));
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header bg-white/95 backdrop-blur">
        <div className="header-container">
          <div className="logo-container">
            <button className="logo-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="logo-icon"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="logo-text">Civix</span>
            </button>
          </div>

          <div className="header-actions">
            <DarkModeToggler />
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <h2 className="welcome-text">Welcome, Citizen 👋</h2>

        <section className="dashboard-cards">
          <DashboardCard
            title="File a Complaint"
            description="Submit a new issue with full details."
            onClick={() => navigate("/report-issue")}
            icon={faFileAlt}
            delay={0}
          />
          <DashboardCard
            title="My Complaints"
            description="Track all complaints you’ve raised."
            onClick={() => navigate("/complaints")}
            icon={faListUl}
            delay={100}
          />
          <DashboardCard
            title="Profile"
            description="View or edit your profile details."
            onClick={() => navigate("/profile")}
            icon={faUser}
            delay={200}
          />
          <DashboardCard
            title="Support"
            description="Need help? Contact our support."
            onClick={() => navigate("/contact")}
            icon={faHeadset}
            delay={300}
          />
          <DashboardCard
            title="Community Voting"
            description="Interact with the community by casting your vote on trending topics, events, and decisions that matter."
            onClick={() => navigate("/community-voting")}
            icon={faChartBar}
            delay={400}
          />
          <DashboardCard
            title="Resources"
            description="Read FAQs, citizen rights, and more."
            onClick={() => navigate("/resources")}
            icon={faBookOpen}
            delay={500}
          />
        </section>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, description, onClick, icon, delay }) => (
  <div
    onClick={onClick}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter") onClick();
    }}
    className="dashboard-card"
    style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
  >
    <FontAwesomeIcon icon={icon} className="card-icon" size="4x" fixedWidth />
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

export default UserDashboard;
