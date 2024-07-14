import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Config
import api from '../config/api/loginApi';

// Interface
import IUser from '../Models/IUser';

const ProfileEditPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  // Input States
  const [user, setUser] = useState<IUser>({
    username: '',
    gender: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  // Handle Address
  const [addressParts, setAddressParts] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    const address = user.address ?? '';
    setAddressParts(address.split(','));
  }, [user.address]);

  const concatenateAddress = (parts: string[]): string => parts.join(',');

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddressParts = [...addressParts];
    updatedAddressParts[index] = value;
    setAddressParts(updatedAddressParts);

    // Update the user state with the new address
    setUser((prevUser) => ({
      ...prevUser,
      address: concatenateAddress(updatedAddressParts),
    }));
  };

  // Page States
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        const response: AxiosResponse<IUser> = await api.get(`/api/user/${username}`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        });

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        setUser(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  // Save User
  const saveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: AxiosResponse = await api.post(`/api/user/edit`, user);

      if (response.status === 200) {
        toast.success('Profile updated successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        setTimeout(() => {
        navigate(`/user/${username}`);
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Failed to update profile. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile. Please check your inputs and try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  // Input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="m-20 grid gap-4 sm:grid-cols-12 sm:grid-rows-2">
      {/* Card Section */}
      <div className="min-h-[100px] rounded-lg shadow sm:col-span-3 p-4 flex justify-center">
        <div>
          <img className="w-full h-auto rounded-md" src="/upload-photo.png" alt="Upload Photo" />
        </div>
      </div>

      {/* Form Section */}
      <div className="p-2 min-h-[400px] rounded-lg shadow bg-gray-100 sm:col-span-9">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={saveUser}>
          <div>
            <h2>Personal Information</h2>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
              id="username"
              type="text"
              value={user.username}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <div
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Change Password
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <h2>Contact Information</h2>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="contactNumber"
              type="text"
              name="contactNumber"
              value={user.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <h3 className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-3">Shipping Address</h3>
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Unit Number</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
              id="unit-number"
              type="text"
              value={addressParts[0]}
              onChange={(e) => handleAddressChange(0, e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Street</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
              id="street"
              type="text"
              value={addressParts[1]}
              onChange={(e) => handleAddressChange(1, e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Post Code</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
              id="post-code"
              type="text"
              value={addressParts[2]}
              onChange={(e) => handleAddressChange(2, e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Country</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
              id="country"
              type="text"
              value={addressParts[3]}
              onChange={(e) => handleAddressChange(3, e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full">
              <Link
                to={`/user/${username}`}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Cancel
              </Link>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                type="submit"
              >
                Save
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
