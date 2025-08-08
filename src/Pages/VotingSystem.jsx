import React, { useState } from 'react';
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

  const tabs = [
    { id: 'browse', label: 'Browse Polls', icon: Vote },
    { id: 'create', label: 'Create Poll', icon: Plus },
    { id: 'results', label: 'Results', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Quick Stats */}
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Voters</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Ending Soon</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Secure Votes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2,891</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8"
        >
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
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

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          {activeTab === 'browse' && (
            <div className="text-center py-12">
              <Vote className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Browse Polls
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View and participate in available polls
              </p>
            </div>
          )}
          
          {activeTab === 'create' && (
            <div className="text-center py-12">
              <Plus className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Create Poll
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a new poll with advanced settings
              </p>
            </div>
          )}
          
          {activeTab === 'results' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Poll Results
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View detailed results and analytics
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VotingSystem;
