import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faListUl,
  faUser,
  faHeadset,
  faChartBar,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
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
