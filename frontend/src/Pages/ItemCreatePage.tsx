import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Config
import api from '../config/api/loginApi';

// Define types for item fields
interface Item {
  itemTitle: string;
  itemCategory: string;
  itemCondition: string;
  description: string;
  auctionType: string;
  endDate: Date | null; // Nullable Date to handle initial state
  currentPrice: number;
  sellerName: string;
  duration: string;
}

interface AuthProps {
  isAuth: boolean;
  user: string;
}

const CreateItemPage: React.FC<AuthProps> = ({ isAuth, user }) => {

  const navigate = useNavigate();

  // State to manage form inputs
  const [item, setItem] = useState<Item>({
    itemTitle: '',
    itemCategory: '',
    itemCondition: '',
    description: '',
    auctionType: '',
    endDate: null, // Initialize with null
    currentPrice: 0,
    sellerName: user, // Initialize sellerName with user prop
    duration: ''
  });

  // Duration
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const updateDuration = () => {
    const validHours = hours >= 0 ? hours % 24 : 0;
    const validMinutes = minutes >= 0 ? minutes % 60 : 0;

    const totalDays = days + Math.floor(hours / 24) + Math.floor(minutes / 60 / 24);
    const totalHours = validHours + Math.floor(minutes / 60);
    
    const formatted = `${totalDays.toString().padStart(2, '0')}:${(totalHours % 24).toString().padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
    setDuration(formatted);
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(Number(e.target.value));
    updateDuration();
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHours(Number(e.target.value));
    updateDuration();
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Number(e.target.value));
    updateDuration();
  }

  // Submit form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { itemTitle, itemCategory, itemCondition, description, auctionType, currentPrice, sellerName } = item; // Include sellerName from item state
      const response: AxiosResponse = await api.post(`/api/item/create`, {
        itemTitle,
        itemCategory,
        itemCondition,
        description,
        auctionType,
        endDate: item.endDate,
        currentPrice,
        sellerName,
      });

      console.log(response);

      if (response.status === 200) {
        toast.success('Create Listing Successful!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/my-listings');
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Failed to create listing. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create listing. Please check your inputs and try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
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
              <label htmlFor="title" className="block font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="itemTitle"
                value={item.itemTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block font-medium">
                Category
              </label>
              <select
                id="category"
                name="itemCategory"
                value={item.itemCategory}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select Option</option>
                <option value="Sports">Sports</option>
                <option value="Electronics">Electronics</option>
                <option value="Arts">Arts</option>
                <option value="Cars">Cars</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label htmlFor="condition" className="block font-medium">
                Condition
              </label>
              <select
                id="condition"
                name="itemCondition"
                value={item.itemCondition}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select Option</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium">
                Description
              </label>
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

            {/* Auction Type */}
            <div>
              <label htmlFor="auctionType" className="block font-medium">
                Auction Type
              </label>
              <select
                id="auctionType"
                name="auctionType"
                value={item.auctionType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select Option</option>
                <option value="price-up">Price Up</option>
                <option value="low-start-high">Low Start High</option>
              </select>
            </div>

            {/* Duration (days) */}
            <div className="grid grid-cols-3 gap-4">
              <label htmlFor="duration" className="col-span-3 block font-medium mb-2">
                Duration
              </label>

              {/* Days */}
              <div className="flex flex-col">
                <label htmlFor="days" className="font-medium mb-1">
                  Days
                </label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  value={days}
                  onChange={ handleDaysChange }
                  required
                  min="0"
                  max="7"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Hours */}
              <div className="flex flex-col">
                <label htmlFor="hour" className="font-medium mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  id="hour"
                  name="hour"
                  value={ hours }
                  onChange={ handleHoursChange }
                  required
                  min="0"
                  max="60"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Minutes */}
              <div className="flex flex-col">
                <label htmlFor="minute" className="font-medium mb-1">
                  Minutes
                </label>
                <input
                  type="number"
                  id="minute"
                  name="minute"
                  value={minutes}
                  onChange={ handleMinutesChange }
                  required
                  min="0"
                  max="60"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>


            {/* Start Price ($) */}
            <div>
              <label htmlFor="startPrice" className="block font-medium">
                Start Price ($)
              </label>
              <input
                type="number"
                id="startPrice"
                name="currentPrice"
                value={item.currentPrice}
                onChange={handleChange}
                required
                step="1"
                min="1.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Create Item
              </button>

              <Link
                to="/my-listings"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItemPage;

