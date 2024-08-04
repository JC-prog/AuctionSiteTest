import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/api/loginApi'; // Adjust the import path as necessary
import IItem from '../interfaces/IItem';

// Define a type for the file upload
interface IFileUpload {
  file: File;
}

interface AuthProps {
  isAuth: boolean;
  user: string;
}

const CreateItemPage: React.FC<AuthProps> = ({ isAuth, user }) => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [item, setItem] = useState<IItem>({
    itemId: 0,
    itemTitle: '',
    itemCategory: '',
    itemCondition: '',
    description: '',
    sellerName: user,
    auctionType: '',
    endDate: new Date(),
    duration: '',
    currentPrice: 0,
    startPrice: 0,
    status: 'CREATED',
  });

  // State for duration inputs
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  // Update duration based on days, hours, and minutes
  useEffect(() => {
    const validHours = hours >= 0 ? hours % 24 : 0;
    const validMinutes = minutes >= 0 ? minutes % 60 : 0;
    const totalDays = days + Math.floor(hours / 24) + Math.floor(minutes / 60 / 24);
    const totalHours = validHours + Math.floor(minutes / 60);
    const formatted = `${totalDays.toString().padStart(2, '0')}:${(totalHours % 24).toString().padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
    setItem((prevItem) => ({
      ...prevItem,
      duration: formatted,
    }));
  }, [days, hours, minutes]);

  // Photo upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (itemId: number) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post(`/api/item/upload-image/${itemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Photo uploaded successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.error('Failed to upload photo. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Submit form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: AxiosResponse = await api.post('/api/item/create', item);

      if (response.status === 200) {
        const createdItemId = response.data; // Assuming the response contains the created item's ID
        if (selectedFile) {
          await handleUpload(createdItemId);
        }
        toast.success('Create Listing Successful!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate('/my-listings'); // Redirect to my listings page on success
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="flex-shrink-0 mr-6">
          {/* Placeholder image */}
          <div className="mb-8">
            <label className="text-xl font-semibold mb-2">Item Photo</label>
            <img
              src={preview || "/upload-photo.png"}
              alt="Profile"
              className="w-32 h-32 cursor-pointer object-cover"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="flex justify-start">
            <p>Click on the image to upload</p>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4">Create Item</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="itemTitle" className="block font-medium mb-1">Title</label>
              <input
                type="text"
                id="itemTitle"
                name="itemTitle"
                value={item.itemTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="itemCategory" className="block font-medium mb-1">Category</label>
              <select
                id="itemCategory"
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
              <label htmlFor="itemCondition" className="block font-medium mb-1">Condition</label>
              <select
                id="itemCondition"
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
              <label htmlFor="description" className="block font-medium mb-1">Description</label>
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
              <label htmlFor="auctionType" className="block font-medium mb-1">Auction Type</label>
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

            {/* Duration */}
            <div className="grid grid-cols-3 gap-4">
              <label htmlFor="duration" className="col-span-3 block font-medium mb-2">Duration</label>
              {/* Days */}
              <div className="flex flex-col">
                <label htmlFor="days" className="font-medium mb-1">Days</label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  required
                  min="0"
                  max="7"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Hours */}
              <div className="flex flex-col">
                <label htmlFor="hours" className="font-medium mb-1">Hours</label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  required
                  min="0"
                  max="23"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              {/* Minutes */}
              <div className="flex flex-col">
                <label htmlFor="minutes" className="font-medium mb-1">Minutes</label>
                <input
                  type="number"
                  id="minutes"
                  name="minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  required
                  min="0"
                  max="59"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Start Price ($) */}
            <div>
              <label htmlFor="startPrice" className="block font-medium mb-1">Start Price ($)</label>
              <input
                type="number"
                id="startPrice"
                name="startPrice"
                value={item.startPrice}
                onChange={handleChange}
                required
                step="1"
                min="1.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
              <Link
                to="/my-listings"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
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
