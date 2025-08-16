import React, { useState } from 'react';
import { Search, Filter, Upload, Download, Eye, Edit, Trash2, FileText, File, Image, Video, Archive, Clock, User, Calendar, MoreVertical, Tag, Share2, Lock, Unlock, Star, AlertCircle, CheckCircle, Home, BarChart3, Users,Bell, Settings, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CivixDocuments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [showDocModal, setShowDocModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); 
  const docsPerPage = 12;

  const sidebarMenu = [
  { key: 'dashboard', label: 'Dashboard', icon: Home, route: '/admin/dashboard' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, route: '/admin/analytics' },
  { key: 'users', label: 'Users', icon: Users, route: '/admin/users' },
  { key: 'documents', label: 'Documents', icon: FileText, route: '/admin/documents' },
  { key: 'notifications', label: 'Notifications', icon: Bell, route: '/admin/notifications' },
  { key: 'settings', label: 'Settings', icon: Settings, route: '/admin/settings' },
];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/admin/documents');

  const documents = [
    {
      id: 1,
      title: 'City Budget Proposal 2024',
      description: 'Comprehensive budget allocation for municipal services and infrastructure development',
      category: 'budget',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-03-15',
      lastModified: '2024-03-20',
      uploadedBy: 'Rakesh Singh',
      status: 'published',
      visibility: 'public',
      downloads: 245,
      views: 1234,
      tags: ['budget', 'finance', '2024'],
      isStarred: true,
      version: '1.2'
    },
    {
      id: 2,
      title: 'Transportation Infrastructure Plan',
      description: 'Long-term strategy for improving public transportation and road networks',
      category: 'policy',
      type: 'docx',
      size: '1.8 MB',
      uploadDate: '2024-03-10',
      lastModified: '2024-03-18',
      uploadedBy: 'Mukesh Kumar Sharma',
      status: 'draft',
      visibility: 'internal',
      downloads: 89,
      views: 456,
      tags: ['transportation', 'infrastructure', 'planning'],
      isStarred: false,
      version: '2.1'
    },
    {
      id: 3,
      title: 'Community Engagement Guidelines',
      description: 'Best practices for citizen participation in local governance',
      category: 'guidelines',
      type: 'pdf',
      size: '956 KB',
      uploadDate: '2024-02-28',
      lastModified: '2024-03-05',
      uploadedBy: 'Sachin Arora',
      status: 'published',
      visibility: 'public',
      downloads: 178,
      views: 892,
      tags: ['community', 'engagement', 'guidelines'],
      isStarred: true,
      version: '1.0'
    },
    {
      id: 4,
      title: 'Environmental Impact Assessment',
      description: 'Analysis of proposed development projects on local ecosystem',
      category: 'reports',
      type: 'pdf',
      size: '5.2 MB',
      uploadDate: '2024-03-12',
      lastModified: '2024-03-22',
      uploadedBy: 'Karishma Saini',
      status: 'review',
      visibility: 'restricted',
      downloads: 34,
      views: 123,
      tags: ['environment', 'assessment', 'development'],
      isStarred: false,
      version: '1.5'
    },
    {
      id: 5,
      title: 'Public Safety Annual Report',
      description: 'Comprehensive overview of public safety metrics and initiatives',
      category: 'reports',
      type: 'pdf',
      size: '3.1 MB',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-20',
      uploadedBy: 'Ayushi Patel',
      status: 'published',
      visibility: 'public',
      downloads: 567,
      views: 2341,
      tags: ['safety', 'annual', 'report'],
      isStarred: true,
      version: '1.0'
    },
    {
      id: 6,
      title: 'Zoning Regulation Updates',
      description: 'Updated zoning codes and land use regulations for residential areas',
      category: 'regulations',
      type: 'docx',
      size: '1.2 MB',
      uploadDate: '2024-03-08',
      lastModified: '2024-03-25',
      uploadedBy: 'Davendra Shukla',
      status: 'published',
      visibility: 'public',
      downloads: 324,
      views: 1567,
      tags: ['zoning', 'regulations', 'residential'],
      isStarred: false,
      version: '2.3'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'budget', label: 'Budget & Finance' },
    { value: 'policy', label: 'Policy Documents' },
    { value: 'reports', label: 'Reports & Studies' },
    { value: 'guidelines', label: 'Guidelines' },
    { value: 'regulations', label: 'Regulations' },
    { value: 'meeting', label: 'Meeting Minutes' }
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDocs.length / docsPerPage);
  const startIndex = (currentPage - 1) * docsPerPage;
  const paginatedDocs = filteredDocs.slice(startIndex, startIndex + docsPerPage);

  const handleSelectDoc = (docId) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocs.length === paginatedDocs.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(paginatedDocs.map(doc => doc.id));
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'docx':
        return <File className="h-6 w-6 text-blue-500" />;
      case 'xlsx':
        return <File className="h-6 w-6 text-green-500" />;
      case 'jpg':
      case 'png':
        return <Image className="h-6 w-6 text-purple-500" />;
      case 'mp4':
        return <Video className="h-6 w-6 text-orange-500" />;
      default:
        return <Archive className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return <Unlock className="h-4 w-4 text-green-500" />;
      case 'internal':
        return <Lock className="h-4 w-4 text-yellow-500" />;
      case 'restricted':
        return <Lock className="h-4 w-4 text-red-500" />;
      default:
        return <Lock className="h-4 w-4 text-gray-500" />;
    }
  };

  const DocumentModal = ({ doc, onClose }) => {
    if (!doc) return null;

    return (
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className=" rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Document Details</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <AlertCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                {getFileIcon(doc.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">{doc.title}</h3>
                  {doc.isStarred && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                </div>
                <p className="text-gray-600 mb-3">{doc.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {doc.uploadedBy}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {doc.uploadDate}
                  </span>
                  <span className="flex items-center">
                    <Archive className="h-4 w-4 mr-1" />
                    {doc.size}
                  </span>
                  <span className="flex items-center">
                    {getVisibilityIcon(doc.visibility)}
                    <span className="ml-1 capitalize">{doc.visibility}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Document Information</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium  capitalize">{doc.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">File Type</span>
                      <span className="font-medium  uppercase">{doc.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Version</span>
                      <span className="font-medium ">v{doc.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Tags</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {doc.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Engagement Stats</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Views</span>
                      <span className="font-medium text-gray-900">{doc.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Downloads</span>
                      <span className="font-medium text-gray-900">{doc.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Modified</span>
                      <span className="font-medium text-gray-900">{doc.lastModified}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Quick Actions</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center px-3 py-2  text-green-700 rounded-lg hover:bg-green-100 text-sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button className="flex items-center justify-center px-3 py-2  text-blue-700 rounded-lg hover:bg-blue-100 text-sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-green-600 hover:bg-green-700  px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit Document
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700  px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700  px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DocumentCard = ({ doc }) => (
    <div className=" rounded-lg shadow-sm border border-green-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getFileIcon(doc.type)}
          <div className="flex items-center space-x-1">
            {getVisibilityIcon(doc.visibility)}
            {doc.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={selectedDocs.includes(doc.id)}
            onChange={() => handleSelectDoc(doc.id)}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <h3 className="font-medium mb-2 line-clamp-2">{doc.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>{doc.size}</span>
        <span>{doc.uploadDate}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedDoc(doc);
              setShowDocModal(true);
            }}
            className="text-green-600 hover:text-green-800"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen ml-10">
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out  backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl ${
          isSidebarOpen ? 'w-[64]' : 'w-16'
        }`}
      >
        <div className="relative flex items-center justify-between p-4 border-b border-gray-200/50">
          <div className={`flex items-center transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className=" font-bold text-sm">C</span>
            </div>
            {isSidebarOpen && (
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Civix
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
              !isSidebarOpen ? 'mx-auto' : ''
            }`}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        {isSidebarOpen && (
          <div className="p-4 border-b border-gray-200/50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>
        )}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarMenu.map((item) => {
            const isActive = item.route === activeRoute;
            const Icon = item.icon;
            return (
              <div key={item.key} className="relative group">
                <button
                  type="button"
                  className={`
                    w-full flex items-center py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden
                    ${isSidebarOpen ? '' : 'justify-center'}
                    ${isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 transform scale-[1.02]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                    }
                  `}
                  onClick={() => navigate(item.route)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-10 rounded-xl" />
                  )}
                  <div className="relative z-10 flex items-center">
                    <Icon
                      className={`w-5 h-5 transition-all duration-200 ${
                        isSidebarOpen ? 'mr-3' : ''
                      } ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-500 group-hover:text-emerald-600'
                      }`}
                    />
                    {isSidebarOpen && (
                      <span className="relative z-10 transition-all duration-300">
                        {item.label}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
                {!isSidebarOpen && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2  text-sm rounded-lg opacity-0 group-hover:transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent0" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      <div className=" shadow-sm border-b border-green-100">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold ">Documents Management</h1>
              <p className="text-gray-600 mt-1">Manage platform documents and files</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700  px-4 py-2 rounded-lg transition-colors flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className=" rounded-lg shadow-sm border border-green-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg   focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="docx">Word</option>
                <option value="xlsx">Excel</option>
                <option value="jpg">Image</option>
                <option value="mp4">Video</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="review">Under Review</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <FileText className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Archive className="h-4 w-4" />
                </button>
              </div>

              {selectedDocs.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {selectedDocs.length} selected
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    Share
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {paginatedDocs.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <div className=" rounded-lg shadow-sm border border-green-100 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedDocs.length === paginatedDocs.length && paginatedDocs.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {paginatedDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-300">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedDocs.includes(doc.id)}
                          onChange={() => handleSelectDoc(doc.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getFileIcon(doc.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium">{doc.title}</div>
                              {doc.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                              {getVisibilityIcon(doc.visibility)}
                            </div>
                            <div className="text-sm text-gray-500">{doc.size} • v{doc.version}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm capitalize">{doc.category.replace('-', ' ')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{doc.uploadedBy}</div>
                        <div className="text-sm text-gray-500">{doc.uploadDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{doc.uploadDate}</div>
                        <div className="text-sm text-gray-500">{doc.downloads} downloads</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedDoc(doc);
                              setShowDocModal(true);
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-200 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + docsPerPage, filteredDocs.length)} of {filteredDocs.length} documents
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className=" rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-400">Total Documents</p>
                <p className="text-xl font-bold ">{documents.length}</p>
                <p className="text-sm text-green-600">+12 this month</p>
              </div>
            </div>
          </div>
          
          <div className=" rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-400">Total Downloads</p>
                <p className="text-xl font-bold ">{documents.reduce((sum, doc) => sum + doc.downloads, 0).toLocaleString()}</p>
                <p className="text-sm text-blue-600">+234 this week</p>
              </div>
            </div>
          </div>
          
          <div className=" rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-400">Total Views</p>
                <p className="text-xl font-bold ">{documents.reduce((sum, doc) => sum + doc.views, 0).toLocaleString()}</p>
                <p className="text-sm text-purple-600">+1.2K this week</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-400">Pending Review</p>
                <p className="text-xl font-bold">{documents.filter(doc => doc.status === 'review').length}</p>
                <p className="text-sm text-orange-600">Needs attention</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDocModal && (
        <DocumentModal 
          doc={selectedDoc} 
          onClose={() => {
            setShowDocModal(false);
            setSelectedDoc(null);
          }} 
        />
      )}
    </div>
  );
};

export default CivixDocuments;