import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdFeedback } from "react-icons/md";

// API Function Calls
import { createFeedback } from '../services/FeedbackService';

interface AuthProps {
  isAuth?: boolean;
  user: string | null | undefined;
}

const FeedbackPage: React.FC<AuthProps> = ({ user }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
        const response: AxiosResponse = await createFeedback(user, message);
  
        if (response.status === 200) {
          toast.success('Feedback created successfully.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate(`/`);
            window.location.reload();
          }, 2000);

        } else {
          toast.error(`Feedback creation failed: ${response.data.error}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to create Feedback. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }

    
    console.log({ user, message });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <MdFeedback className="text-blue-600" /> Platform Feedback Form
        </h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Your Feedback
          </label>
          <textarea
            id="message"
            name="fmessage"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;
