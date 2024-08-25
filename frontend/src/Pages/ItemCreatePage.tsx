import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/api/loginApi'; // Adjust the import path as necessary
import Item from '../interfaces/Item';
import ItemCategory from '../interfaces/ItemCategory';
import { fetchCategories } from '../services/ItemCategoryService';

interface AuthProps {
  isAuth?: boolean;
  user: string | null | undefined;
}

const CreateItemPage: React.FC<AuthProps> = ({ user }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ItemCategory[]>([]);

  // State to manage form inputs
  const [item, setItem] = useState<Partial<Item>>({
    itemId: 0,
    itemTitle: '',
    itemCategory: '',
    itemCondition: '',
    description: '',
    sellerName: user,
    auctionType: '',
    duration: '',
    currentPrice: 0,
    minSellPrice: 0,
    startPrice: 0,
    status: 'CREATED',
  });

  // Get Item Categories
  useEffect(() => {
    const handleCategoryDropdown = async () => {
        try {
            const response = await fetchCategories();
            setCategories(response.data);

        } catch (error) {
            console.error('Failed to fetch item image:', error);
        } finally {
            
        }
    };

    handleCategoryDropdown();
}, []);

  // State for duration inputs
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);

  // Update duration based on days, hours, and minutes
  useEffect(() => {
    if (!isCustomDuration) return;
  
    const validHours = hours >= 0 ? hours % 24 : 0;
    const validMinutes = minutes >= 0 ? minutes % 60 : 0;
    const totalDays = days + Math.floor(hours / 24) + Math.floor(minutes / 60 / 24);
    const totalHours = validHours + Math.floor(minutes / 60);
    const formatted = `${totalDays.toString().padStart(2, '0')}:${(totalHours % 24).toString().padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
  
    setItem((prevItem) => ({
      ...prevItem,
      duration: formatted,
    }));
  }, [days, hours, minutes, isCustomDuration]);  

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

  const handleUpload = async (itemId: string | undefined) => {
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

  // Handle Auction Type Selection
  const [isLowStartHigh, setIsLowStartHigh] = useState<boolean>(false);

  const handleAuctionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'low-start-high') {
      setIsLowStartHigh(true);
      setItem((prevItem) => ({
        ...prevItem,
        auctionType: selectedValue,
        minSellPrice: 0, 
      }));
    } else {
      setIsLowStartHigh(false);
      setItem((prevItem) => ({
        ...prevItem,
        auctionType: selectedValue,
        minSellPrice: item.minSellPrice || 0, 
      }));
    }
  };

  // Handle duration selection

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
  
    if (selectedValue === 'custom') {
      setIsCustomDuration(true);
      setItem((prevItem) => ({
        ...prevItem,
        duration: 'custom',
      }));
    } else {
      setIsCustomDuration(false);
      setItem((prevItem) => ({
        ...prevItem,
        duration: selectedValue,
      }));
    }
  };

  // Submit form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: AxiosResponse = await api.post('/api/item/create', item);

      if (response.status === 200) {
        
        if (selectedFile) {
          await handleUpload(item.itemId?.toString());
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
        <div className="flex items-center mb-4">
            <Link to="/my-listings" className="text-blue-500 text-sm hover:underline">
                Back to My Listings
            </Link>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-gray-500 text-sm">Create Listing</span>
        </div>
        <h1 className="text-2xl font-semibold mb-6">Create Listing</h1>
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">

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
              />
            </div>

            {/* Category */}
            <div className="mb-4">
                <label htmlFor="itemCategory" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    id="itemCategory"
                    name="itemCategory"
                    value={item?.itemCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="">Select Option</option>
                    {(categories?.map((category : ItemCategory) => (
                        <option key={category.id} value={category.catName}>
                            {category.catName}
                        </option>
                    ))) || null}
                </select>
            </div>


            {/* Condition */}
            <div>
              <label htmlFor="itemCondition" className="block text-sm font-medium text-gray-700">Condition</label>
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

            {/* Auction Type */}
            <div>
              <label htmlFor="auctionType" className="block text-sm font-medium text-gray-700">Auction Type</label>
              <select
                id="auctionType"
                name="auctionType"
                value={item.auctionType}
                onChange={handleAuctionTypeChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select Option</option>
                <option value="price-up">Price Up</option>
                <option value="low-start-high">Low Start High</option>
                <option value="trade">Trade</option>
              </select>
            </div>

            {isLowStartHigh && (
              <div>
                <label htmlFor="minSellPrice" className="block text-sm font-medium text-gray-700">Min Sell Price ($)</label>
                <input
                  type="number"
                  id="minSellPrice"
                  name="minSellPrice"
                  value={item.minSellPrice}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            )}

            {/* Start Price */}
            {item.auctionType != 'trade' && (
                <div>
                <label htmlFor="startPrice" className="block text-sm font-medium text-gray-700">Start Price ($)</label>
                <input
                  type="number"
                  id="startPrice"
                  name="startPrice"
                  value={item.startPrice}
                  onChange={handleChange}
                  min={0}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            )}
            

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
              <select
                id="duration"
                name="duration"
                value={isCustomDuration ? 'custom' : item.duration}
                onChange={handleDurationChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select Option</option>
                <option value="00:01:00:00">1 Hour</option>
                <option value="01:00:00:00">1 Day</option>
                <option value="07:00:00:00">7 Days</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Custom Duration Form */}
            {isCustomDuration && (
              <div className="flex space-x-2">
                <div>
                  <label htmlFor="days" className="block text-sm font-medium text-gray-700">Days</label>
                  <input
                    type="number"
                    id="days"
                    name="days"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    min={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Hours</label>
                  <input
                    type="number"
                    id="hours"
                    name="hours"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    min={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">Minutes</label>
                  <input
                    type="number"
                    id="minutes"
                    name="minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(parseInt(e.target.value))}
                    min={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            <div className="mb-4">
                    <label htmlFor="uploadImage" className="block text-sm font-medium text-gray-700">
                        Upload Image
                    </label>
                    <div
                        className="border border-gray-300 rounded-md p-2 text-center cursor-pointer"
                        onClick={triggerFileInput}
                    >
                        {preview ? (
                            <img src={preview} alt="Item Preview" className="mx-auto max-h-40" />
                        ) : (
                            <span>Click to select image</span>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>

            {/* Submit */}
            <div className="flex justify-between items-center mt-6">
                <Link to="/my-listings" className="text-red-600 hover:underline" >
                    Cancel
                </Link>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
