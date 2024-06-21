import React, { useState } from 'react';

// Define types for item fields
interface Item {
  title: string;
  category: string;
  condition: string;
  description: string;
  type: string;
  duration: number;
  startPrice: number;
}

const CreateItemPage: React.FC = () => {
  // State to manage form inputs
  const [item, setItem] = useState<Item>({
    title: '',
    category: '',
    condition: '',
    description: '',
    type: '',
    duration: 0,
    startPrice: 0,
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit item data (e.g., send to backend)
    console.log(item); // Replace with API call or state management logic
  };

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="flex-shrink-0 mr-6">
          {/* Placeholder image */}
          <img src="/upload-photo.png" alt="Item Image" className="w-48 h-48 object-cover rounded-md shadow-md" />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4">Create Item</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={item.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block font-medium">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={item.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Condition */}
            <div>
              <label htmlFor="condition" className="block font-medium">Condition</label>
              <input
                type="text"
                id="condition"
                name="condition"
                value={item.condition}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={item.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block font-medium">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={item.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block font-medium">Duration (days)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={item.duration}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Start Price */}
            <div>
              <label htmlFor="startPrice" className="block font-medium">Start Price ($)</label>
              <input
                type="number"
                id="startPrice"
                name="startPrice"
                value={item.startPrice}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Create Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItemPage;
