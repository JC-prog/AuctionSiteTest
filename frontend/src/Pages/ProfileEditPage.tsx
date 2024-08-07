import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import api from '../config/api/loginApi';
import User from '../interfaces/User';
import { changePassword } from '../services/AuthService';
import { saveUser, deactivateUser } from '../services/UserService';

const ProfileEditPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    username: '',
    gender: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
  });

  const [addressParts, setAddressParts] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user.address) {
      setAddressParts(user.address.split(','));
    }
  }, [user.address]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        const response = await api.get(`/api/user/${username}`, {
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

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await api.get(`/api/user/photo/${username}`, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Failed to fetch profile photo:', error);
      }
    };

    fetchProfilePhoto();
  }, [username]);

  useEffect(() => {
    const fetchBannerPhoto = async () => {
      try {
        const response = await api.get(`/api/user/banner/${username}`, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerPreview(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Failed to fetch banner photo:', error);
      }
    };

    fetchBannerPhoto();
  }, [username]);

  const concatenateAddress = (parts: string[]): string => parts.join(',');

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddressParts = [...addressParts];
    updatedAddressParts[index] = value;
    setAddressParts(updatedAddressParts);
    setUser((prevUser) => ({
      ...prevUser,
      address: concatenateAddress(updatedAddressParts),
    }));
  };

  const handleChangePassword = async () => {
    try {
      const response: AxiosResponse = await changePassword(username, user.password);

      if (response.status === 200) {
        toast.success('Password changed successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.error(`Failed to change password: ${response.data.error}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to change password. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await saveUser(user);

      if (response.status === 200) {
        toast.success('Profile updated successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
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

  const handleDeactivate = async () => {
    try {
      const response: AxiosResponse = await deactivateUser({ username });

      if (response.status === 200) {
        Cookies.remove('access_token');
        toast.success('Account deactivated successfully.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate(`/login`);
          window.location.reload();
        }, 2000);
      } else {
        toast.error(`Failed to deactivate account: ${response.data.error}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to deactivate account. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post(`/api/user/upload-photo/${username}`, formData, {
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

  const handleUploadBanner = async () => {
    if (!selectedBanner) return;

    const formData = new FormData();
    formData.append('file', selectedBanner);

    try {
      const response = await api.post(`/api/user/upload-banner/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Banner uploaded successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.error('Failed to upload banner. Please try again.', {
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

        <div className="flex mb-8 space-x-4">
          <div className="w-1/3">
            <label className="text-xl font-semibold mb-2 block">Profile Picture</label>
            <img
              src={preview || "/profile-pic-placeholder.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full cursor-pointer object-cover"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="w-2/3">
            <label className="text-xl font-semibold mb-2 block">Banner Picture</label>
            <img
              src={bannerPreview || "/upload-photo.png"}
              alt="Banner"
              className="w-full h-32 rounded-md cursor-pointer object-cover"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleBannerFileChange}
              className="hidden"
            />
          </div>
        </div>


        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                disabled
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={user.contactNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Address</label>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Street"
                value={addressParts[0]}
                onChange={(e) => handleAddressChange(0, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="City"
                value={addressParts[1]}
                onChange={(e) => handleAddressChange(1, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="State"
                value={addressParts[2]}
                onChange={(e) => handleAddressChange(2, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={addressParts[3]}
                onChange={(e) => handleAddressChange(3, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleChangePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Change Password
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDeactivate}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Deactivate Account
            </button>
          </div>
          </form>

          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <label className="block text-xl font-semibold mb-2">Upload Profile Picture</label>
              <button
                type="button"
                onClick={handleUploadPhoto}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Upload Photo
              </button>
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-xl font-semibold mb-2">Upload Profile Banner</label>
              <button
                type="button"
                onClick={handleUploadBanner}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Upload Banner
              </button>
            </div>
          </div>

      </div>
    </div>
  );
};

export default ProfileEditPage;
