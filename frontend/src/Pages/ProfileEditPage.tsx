import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Config
import api from '../config/api/loginApi';

// Interface
import IUser from '../interfaces/User';

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
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Edit Profile</h2>
          <Link
            to={`/user/${user.username}`}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Cancel
          </Link>
        </div>
        <form className="space-y-6" onSubmit={saveUser}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
                id="username"
                type="text"
                value={user.username}
              />
              <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Change Password
              </button>
              <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">Gender</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">Contact Number</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="contactNumber"
                type="text"
                name="contactNumber"
                value={user.contactNumber}
                onChange={handleChange}
              />
              <h3 className="text-xl font-semibold mt-6 mb-2">Shipping Address</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Unit Number</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
                    id="unit-number"
                    type="text"
                    value={addressParts[0]}
                    onChange={(e) => handleAddressChange(0, e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Street</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
                    id="street"
                    type="text"
                    value={addressParts[1]}
                    onChange={(e) => handleAddressChange(1, e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Post Code</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
                    id="post-code"
                    type="text"
                    value={addressParts[2]}
                    onChange={(e) => handleAddressChange(2, e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2 sm:col-span-1">Country</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:col-span-2"
                    id="country"
                    type="text"
                    value={addressParts[3]}
                    onChange={(e) => handleAddressChange(3, e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
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
