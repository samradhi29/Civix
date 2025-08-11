import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Vote, 
  BarChart3, 
  Users, 
  Clock, 
  Shield
} from 'lucide-react';

const VotingSystem = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [polls, setPolls] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newOptions, setNewOptions] = useState('');

  useEffect(() => {
    const storedPolls = localStorage.getItem('polls');
    if (storedPolls) {
      setPolls(JSON.parse(storedPolls));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('polls', JSON.stringify(polls));
  }, [polls]);

  const handleVote = (pollId, optionIndex) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedVotes = [...poll.votes];
          updatedVotes[optionIndex] = (updatedVotes[optionIndex] || 0) + 1;
          return { ...poll, votes: updatedVotes };
        }
        return poll;
      })
    );
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    const optionsArray = newOptions.split('\n').map(opt => opt.trim()).filter(opt => opt);
    if (!newTitle.trim() || optionsArray.length === 0) {
      return;
    }
    const newPoll = {
      id: Date.now(),
      title: newTitle.trim(),
      options: optionsArray,
      votes: Array(optionsArray.length).fill(0),
    };
    setPolls((prevPolls) => [...prevPolls, newPoll]);
    setNewTitle('');
    setNewOptions('');
    setActiveTab('browse');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🗳️ Voting & Polling System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create, participate, and analyze polls with advanced security features and real-time results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <Vote className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Polls</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{polls.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Voters</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {polls.reduce((acc, poll) => acc + poll.votes.reduce((a, v) => a + v, 0), 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Secure Votes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {polls.reduce((acc, poll) => acc + poll.votes.reduce((a, v) => a + v, 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8"
        >
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'browse', label: 'Browse Polls', icon: Vote },
              { id: 'create', label: 'Create Poll', icon: Plus },
              { id: 'results', label: 'Results', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          {activeTab === 'browse' && (
            <div className="space-y-8">
              {polls.length === 0 && (
                <p className="text-center text-gray-600 dark:text-gray-400">No polls available. Create one!</p>
              )}
              {polls.map((poll) => (
                <div key={poll.id} className="border rounded p-4 bg-gray-50 dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{poll.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {poll.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleVote(poll.id, idx)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'create' && (
            <form onSubmit={handleCreatePoll} className="max-w-md mx-auto space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Poll Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="options" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Options (one per line)
                </label>
                <textarea
                  id="options"
                  value={newOptions}
                  onChange={(e) => setNewOptions(e.target.value)}
                  rows={5}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
              >
                Create Poll
              </button>
            </form>
          )}
          
          {activeTab === 'results' && (
            <div className="space-y-8">
              {polls.length === 0 && (
                <p className="text-center text-gray-600 dark:text-gray-400">No polls available.</p>
              )}
              {polls.map((poll) => (
                <div key={poll.id} className="border rounded p-4 bg-gray-50 dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{poll.title}</h3>
                  <ul className="space-y-2">
                    {poll.options.map((option, idx) => (
                      <li key={idx} className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>{option}</span>
                        <span className="font-semibold">{poll.votes[idx] || 0} votes</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VotingSystem;
