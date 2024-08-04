import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Config
import api from '../config/api/loginApi';

// Interface
import User from '../interfaces/User';

// API Function Call
import { changePassword } from '../services/AuthService';
import { saveUser, deactivateUser } from '../services/UserService';

const ProfileEditPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  // Input States
  const [user, setUser] = useState<User>({
    username: '',
    gender: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
  });

  const [addressParts, setAddressParts] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    if (user.address) {
      setAddressParts(user.address.split(','));
    }
  }, [user.address]);

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

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch User Info
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

  // Fetch User Photo
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
  }, []);

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

  // Photo Upload
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

  const handleUpload = async () => {
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

        <div className="mb-8">
          <label className="text-xl font-semibold mb-2">
            Profile Picture
          </label>
          <img
            src={preview || "/upload-photo.png"}
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
        <div className="flex justify-start">
            <p>Click on the image to upload</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Upload Photo
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                name="contactNumber"
                value={user.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              {addressParts.map((part, index) => (
                <input
                  key={index}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder={`Address Line ${index + 1}`}
                  value={part}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                />
              ))}

              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                name="password"
                placeholder='*******'
                onChange={handleChange}
              />

              <div className="my-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleChangePassword}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Save Changes
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
      </div>
    </div>
  );
};

export default ProfileEditPage;
