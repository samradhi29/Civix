import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  // Animation variants for the page container
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4 },
    },
  };

  // Animation variants for dashboard cards
  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="dashboard-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Main Content */}
      <main className="dashboard-main">
        <motion.h2
          className="welcome-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome, Citizen 👋
        </motion.h2>

        <motion.section className="dashboard-cards" variants={pageVariants}>
          <DashboardCard
            title="File a Complaint"
            description="Submit a new issue with full details."
            onClick={() => navigate("/report-issue")}
            icon={faFileAlt}
            delay={0}
            variants={cardVariants}
          />
          <DashboardCard
            title="My Complaints"
            description="Track all complaints you've raised."
            onClick={() => navigate("/complaints")}
            icon={faListUl}
            delay={100}
            variants={cardVariants}
          />
          <DashboardCard
            title="Profile"
            description="View or edit your profile details."
            onClick={() => navigate("/profile")}
            icon={faUser}
            delay={200}
            variants={cardVariants}
          />
          <DashboardCard
            title="Support"
            description="Need help? Contact our support."
            onClick={() => navigate("/contact")}
            icon={faHeadset}
            delay={300}
            variants={cardVariants}
          />
          <DashboardCard
            title="Community Voting"
            description="Interact with the community by casting your vote on trending topics, events, and decisions that matter."
            onClick={() => navigate("/community-voting")}
            icon={faChartBar}
            delay={400}
            variants={cardVariants}
          />
          <DashboardCard
            title="Resources"
            description="Read FAQs, citizen rights, and more."
            onClick={() => navigate("/resources")}
            icon={faBookOpen}
            delay={500}
            variants={cardVariants}
          />
        </motion.section>
      </main>
    </motion.div>
  );
};

const DashboardCard = ({ title, description, onClick, icon, delay, variants }) => (
  <motion.div
    onClick={onClick}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter") onClick();
    }}
    className="dashboard-card"
    variants={variants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    transition={{ delay: delay / 1000 }}
  >
    <FontAwesomeIcon icon={icon} className="card-icon" size="4x" fixedWidth />
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </motion.div>
);

export default UserDashboard;
