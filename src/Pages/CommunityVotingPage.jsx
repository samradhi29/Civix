import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityVoting.css"; // Create this file for styling
import { motion, AnimatePresence } from "framer-motion";

const CommunityVotingPage = () => {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [sortBy, setSortBy] = useState("Most Votes");

  // Sample issues data
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Pothole on Main Street",
      area: "Noida",
      daysOpen: 3,
      votes: 15,
      accidentsReported: 2,
      status: "Open"
    },
    {
      id: 2,
      title: "Broken Street Light",
      area: "East Delhi",
      daysOpen: 5,
      votes: 8,
      accidentsReported: 1,
      status: "Open"
    },
    {
      id: 3,
      title: "Garbage Not Collected",
      area: "South Delhi",
      daysOpen: 7,
      votes: 22,
      accidentsReported: 0,
      status: "Open"
    }
  ]);
  
  // Animation variants omitted here for brevity but you can keep them if you want

  const areas = ["All Areas", "Noida", "East Delhi", "West Delhi", "North Delhi", "South Delhi", "Ghaziabad"];
  const sortOptions = ["Most Votes", "Most Recent", "Longest Open", "Most Accidents"];

  const filteredIssues = issues
    .filter(issue => selectedArea === "All Areas" || issue.area === selectedArea)
    .sort((a, b) => {
      if (sortBy === "Most Votes") return b.votes - a.votes;
      if (sortBy === "Most Recent") return b.daysOpen - a.daysOpen;
      if (sortBy === "Longest Open") return a.daysOpen - b.daysOpen;
      if (sortBy === "Most Accidents") return b.accidentsReported - a.accidentsReported;
      return 0;
    });

  const handleVote = (id) => {
    setIssues(issues.map(issue => 
      issue.id === id ? {...issue, votes: issue.votes + 1} : issue
    ));
  };

  return (
    <>
      {/* Removed dark/light toggle here */}

      <motion.div 
        className="community-voting-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button 
          className="back-button" 
          onClick={() => navigate(-1)}
          whileHover={{ x: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ← Back
        </motion.button>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Community Voting Dashboard</h1>
          <p>Help prioritize local issues in your area</p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div 
          className="filter-bar"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="filter-section">
            <label>Area:</label>
            <motion.select 
              value={selectedArea} 
              onChange={(e) => setSelectedArea(e.target.value)}
              className="filter-dropdown"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </motion.select>
          </div>

          <div className="filter-section">
            <label>Sort By:</label>
            <motion.select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-dropdown"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </motion.select>
          </div>
        </motion.div>

        {/* Issues List */}
        <AnimatePresence>
          <motion.div className="issues-list">
            {filteredIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                className="issue-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.05,
                  duration: 0.5
                }}
                layout
                whileHover={{ y: -5 }}
              >
                <div className="issue-header">
                  <h3>{issue.title}</h3>
                  <motion.span 
                    className="area-badge"
                    whileHover={{ scale: 1.1 }}
                  >
                    {issue.area}
                  </motion.span>
                </div>

                <div className="issue-metrics">
                  <div className="metric">
                    <span className="metric-label">Days Open:</span>
                    <motion.span 
                      className="metric-value"
                      key={`days-${issue.daysOpen}`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      {issue.daysOpen}
                    </motion.span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Accidents:</span>
                    <motion.span 
                      className="metric-value"
                      key={`accidents-${issue.accidentsReported}`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      {issue.accidentsReported}
                    </motion.span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Status:</span>
                    <span className="metric-value">{issue.status}</span>
                  </div>
                </div>

                <div className="vote-section">
                  <motion.button 
                    className="vote-button"
                    onClick={() => handleVote(issue.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ▲ Vote ({issue.votes})
                  </motion.button>
                  <div className="progress-bar">
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${Math.min(issue.votes * 5, 100)}%`,
                        transition: { duration: 1.5, ease: "easeInOut" }
                      }}
                      key={`progress-${issue.id}-${issue.votes}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CommunityVotingPage;
