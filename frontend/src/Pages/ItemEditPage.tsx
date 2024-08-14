import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import api from '../config/api/loginApi';
import Item from '../interfaces/Item';
import { fetchItemByItemId } from '../services/ItemService';
import ItemCategory from '../interfaces/ItemCategory';
import { fetchCategories } from '../services/ItemCategoryService';

interface AuthProps {
  isAuth?: boolean;
  user: string | null | undefined;
}

const ItemEditPage: React.FC<AuthProps> = () => {
    const navigate = useNavigate();
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<Item | undefined>(undefined);
    const [categories, setCategories] = useState<ItemCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!itemId) {
            setLoading(false);
            setError(new Error("Item ID is not provided"));
            return;
        }

        const fetchItem = async () => {
            try {
                const response = await fetchItemByItemId(parseInt(itemId));
                setItem(response.data);

                const categoryResponse = await fetchCategories();
                setCategories(categoryResponse.data);

                const imageResponse = await api.get(`/api/item/image/${itemId}`, { responseType: 'arraybuffer' });
                const blob = new Blob([imageResponse.data], { type: 'image/jpeg' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Failed to fetch item image:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    useEffect(() => {
        if (!isCustomDuration || !item) return;

        const validHours = hours >= 0 ? hours % 24 : 0;
        const validMinutes = minutes >= 0 ? minutes % 60 : 0;
        const totalDays = days + Math.floor(hours / 24) + Math.floor(minutes / 60 / 24);
        const totalHours = validHours + Math.floor(minutes / 60);
        const formatted = `${totalDays.toString().padStart(2, '0')}:${(totalHours % 24).toString().padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
        setItem((prevItem) => prevItem ? { ...prevItem, duration: formatted } : prevItem);
    }, [days, hours, minutes, isCustomDuration]);

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

    const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        if (selectedValue === 'custom') {
            setIsCustomDuration(true);
            setItem((prevItem) => prevItem ? { ...prevItem, duration: '' } : prevItem);
        } else {
            setIsCustomDuration(false);
            setItem((prevItem) => prevItem ? { ...prevItem, duration: selectedValue } : prevItem);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!item) return;

        try {
            const response: AxiosResponse = await api.post('/api/item/create', item);

            if (response.status === 200) {
                const createdItemId = response.data;
                if (selectedFile) {
                    await handleUpload(createdItemId);
                }
                toast.success('Create Listing Successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                navigate('/my-listings');
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setItem((prevItem) => prevItem ? { ...prevItem, [name]: value } : prevItem);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="flex items-center mb-4">
                <Link to="/my-listings" className="text-blue-500 text-sm hover:underline">
                    Back to Home
                </Link>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-500 text-sm">Edit Listing</span>
            </div>
            <h1 className="text-2xl font-semibold mb-6">Edit Listing</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="itemTitle" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="itemTitle"
                        name="itemTitle"
                        value={item?.itemTitle || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={item?.description || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    ></textarea>
                </div>

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

                <div className="mb-4">
                <label htmlFor="itemCondition" className="block text-sm font-medium text-gray-700">Condition</label>
                    <select
                        id="itemCondition"
                        name="itemCondition"
                        value={item?.itemCondition}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select Option</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                    </select>
                </div>

                {item?.auctionType != 'trade' && (
                    <div className="mb-4">
                        <label htmlFor="startPrice" className="block text-sm font-medium text-gray-700">
                            Starting Price
                        </label>
                        <input
                            type="number"
                            id="startPrice"
                            name="startPrice"
                            value={item?.startPrice || 0}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                )}

                {item?.auctionType == 'low-start-high' && (
                    <div className="mb-4">
                        <label htmlFor="minSellPrice" className="block text-sm font-medium text-gray-700">Min Sell Price ($)</label>
                        <input
                        type="number"
                        id="minSellPrice"
                        name="minSellPrice"
                        value={item?.minSellPrice}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration
                    </label>
                    <select
                        id="duration"
                        name="duration"
                        value={item?.duration || ''}
                        onChange={handleDurationChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="0:01:00">1 Hour</option>
                        <option value="1:00:00">1 Day</option>
                        <option value="7:00:00">7 Days</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                {isCustomDuration && (
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                                Days
                            </label>
                            <input
                                type="number"
                                id="days"
                                name="days"
                                value={days}
                                onChange={(e) => setDays(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                                Hours
                            </label>
                            <input
                                type="number"
                                id="hours"
                                name="hours"
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">
                                Minutes
                            </label>
                            <input
                                type="number"
                                id="minutes"
                                name="minutes"
                                value={minutes}
                                onChange={(e) => setMinutes(Number(e.target.value))}
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ItemEditPage;
