import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  // Fetch all reported issues
  const fetchIssues = React.useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/issues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch');
      }

      const data = await res.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      alert('Failed to fetch issues. Please login again.');
      navigate('/login');
    }
  }, [navigate]);

  // Update issue status
  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/issues/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh issue list
      fetchIssues();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Could not update status.');
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Issues Table */}
      <main className="p-6">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <p>Welcome, Admin! You have access to admin controls.</p>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="toast-body custom-toast-shadow"
        bodyClassName="text-sm font-medium"
      />
        <h3 className="text-lg font-semibold mb-4">Reported Issues</h3>

        {issues.length === 0 ? (
          <p>No issues found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white text-sm rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue._id} className="border-t border-gray-200">
                    <td className="p-3">{issue.title}</td>
                    <td className="p-3">{issue.description}</td>
                    <td className="p-3">{issue.phone}</td>
                    <td className="p-3">{issue.email}</td>
                    <td className="p-3">{issue.status || 'Pending'}</td>
                    <td className="p-3">
                      <select
                        value={issue.status || 'Pending'}
                        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
