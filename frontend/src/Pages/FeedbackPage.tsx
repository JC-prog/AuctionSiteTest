import React, { useState } from 'react';

interface AuthProps {
  isAuth: boolean;
  user: string;
}

const FeedbackPage: React.FC<AuthProps> = ({ user }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic, such as sending feedback to an API
    console.log({ user, feedback, rating });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold">Platform Feedback Form</h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            required
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
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
