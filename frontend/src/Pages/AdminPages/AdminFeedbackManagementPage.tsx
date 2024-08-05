import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminFeedbackManagementPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]); // Initialize as an empty array
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFeedbacks = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/feedback/all?page=${pageNumber}`);
      // Ensure feedbacks and totalPages are set correctly
      setFeedbacks(response.data.feedbacks || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      toast.error('Failed to fetch feedbacks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6">Feedback List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center text-gray-500">No feedbacks available.</div>
      ) : (
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.feedback}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackManagementPage;
