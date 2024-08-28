import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import api from '../config/api/loginApi';
import User from '../interfaces/User';
import { changePassword } from '../services/AuthService';
import { saveUser, deactivateUser } from '../services/UserService';

const ProfileEditPage = () => {
  const { username } = useParams<{ username: string | undefined }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<Partial<User>>({
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
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user data, profile photo, and banner on component mount
  useEffect(() => {
    fetchUserData();
    fetchPhoto(`/api/user/photo/${username}`, setPreview);
    fetchPhoto(`/api/user/banner/${username}`, setBannerPreview);
  }, [username]);

  useEffect(() => {
    if (user.address) {
      setAddressParts(user.address.split(','));
    }
  }, [user.address]);

  const fetchUserData = async () => {
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

  const fetchPhoto = async (url: string, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    try {
      const response = await api.get(url, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Failed to fetch photo:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await changePassword(username, user.password);
      if (response.status === 200) {
        toast.success('Password changed successfully.', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
      } else {
        toast.error(`Failed to change password: ${response.data.error}`, { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to change password. Please try again.', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await saveUser(user);
      response.status === 200
        ? toast.success('Profile updated successfully!', { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
        : toast.error('Failed to update profile. Please try again.', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile. Please check your inputs and try again.', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    }
  };

  const handleDeactivate = async () => {
    try {
      const response = await deactivateUser(username);
      if (response.status === 200) {
        Cookies.remove('access_token');
        toast.success('Account deactivated successfully.', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
        setTimeout(() => {
          navigate(`/login`);
          window.location.reload();
        }, 2000);
      } else {
        toast.error(`Failed to deactivate account: ${response.data.error}`, { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to deactivate account. Please try again.', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (url: string, file: File | null, successMessage: string, errorMessage: string) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      response.status === 200
        ? toast.success(successMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
        : toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    }
  };

  const concatenateAddress = (parts: string[]): string => parts.join(',');

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddressParts = [...addressParts];
    updatedAddressParts[index] = value;
    setAddressParts(updatedAddressParts);
    setUser((prevUser) => ({ ...prevUser, address: concatenateAddress(updatedAddressParts) }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <div className="flex items-center mb-4">
            <Link to="/" className="text-blue-500 text-sm hover:underline">
                Back to Home
            </Link>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-gray-500 text-sm">Edit Profile</span>
        </div>
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
            <div className="flex mb-8 space-x-4">
                <ProfilePhotoSection
                    preview={preview}
                    onClick={() => triggerFileInput(fileInputRef)}
                    onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, setSelectedFile, setPreview)}
                    fileInputRef={fileInputRef}
                />
                <BannerPhotoSection
                    bannerPreview={bannerPreview}
                    onClick={() => triggerFileInput(bannerFileInputRef)}
                    onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, setSelectedBanner, setBannerPreview)}
                    bannerFileInputRef={bannerFileInputRef}
                />
            </div>

            <form onSubmit={handleSave} className="space-y-6">
            <UserDetailsSection user={user} onChange={handleChange} />
            <AddressSection addressParts={addressParts} onAddressChange={handleAddressChange} />
            <PasswordSection password={user.password} onChange={handleChange} onChangePassword={handleChangePassword} />
            <ActionsSection onDeactivate={handleDeactivate} />
            </form>

            <UploadSection
            onUploadPhoto={() => handleUpload(`/api/user/upload-photo/${username}`, selectedFile, 'Photo uploaded successfully!', 'Failed to upload photo. Please try again.')}
            onUploadBanner={() => handleUpload(`/api/user/upload-banner/${username}`, selectedBanner, 'Banner uploaded successfully!', 'Failed to upload banner. Please try again.')}
            />
        </div>
    </div>
  );
};

const ProfilePhotoSection = ({ preview, onClick, onFileChange, fileInputRef }: any) => (
  <div className="flex flex-col items-center space-y-4">
    <img src={preview || '/upload-photo.png'} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={onFileChange} />
    <button type="button" onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
      Upload Profile Photo
    </button>
  </div>
);

const BannerPhotoSection = ({ bannerPreview, onClick, onFileChange, bannerFileInputRef }: any) => (
  <div className="flex flex-col items-center space-y-4">
    <img src={bannerPreview || '/upload-photo.png'} alt="Banner" className="w-full h-32 object-cover rounded-lg" />
    <input type="file" ref={bannerFileInputRef} style={{ display: 'none' }} onChange={onFileChange} />
    <button type="button" onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
      Upload Profile Banner
    </button>
  </div>
);

const UserDetailsSection = ({ user, onChange }: any) => (
  <>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">Username</label>
      <input type="text" name="username" value={user.username || ''} onChange={onChange} className="w-2/3 p-2 border rounded-md" />
    </div>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" name="email" value={user.email || ''} onChange={onChange} className="w-2/3 p-2 border rounded-md" />
    </div>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">Contact Number</label>
      <input type="tel" name="contactNumber" value={user.contactNumber || ''} onChange={onChange} className="w-2/3 p-2 border rounded-md" />
    </div>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">Gender</label>
      <select name="gender" value={user.gender || ''} onChange={onChange} className="w-2/3 p-2 border rounded-md">
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
    </div>
  </>
);

const AddressSection = ({ addressParts, onAddressChange }: any) => (
  <>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">Street</label>
      <input type="text" name="street" value={addressParts[0]} onChange={(e) => onAddressChange(0, e.target.value)} className="w-2/3 p-2 border rounded-md" />
    </div>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">City</label>
      <input type="text" name="city" value={addressParts[1]} onChange={(e) => onAddressChange(1, e.target.value)} className="w-2/3 p-2 border rounded-md" />
    </div>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">State</label>
      <input type="text" name="state" value={addressParts[2]} onChange={(e) => onAddressChange(2, e.target.value)} className="w-2/3 p-2 border rounded-md" />
    </div>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
      <input type="text" name="zipCode" value={addressParts[3]} onChange={(e) => onAddressChange(3, e.target.value)} className="w-2/3 p-2 border rounded-md" />
    </div>
  </>
);

const PasswordSection = ({ password, onChange, onChangePassword }: any) => (
  <>
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input type="password" name="password" value={password || ''} onChange={onChange} className="w-2/3 p-2 border rounded-md" />
    </div>
    <button type="button" onClick={onChangePassword} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
      Change Password
    </button>
  </>
);

const ActionsSection = ({ onDeactivate }: any) => (
  <div className="flex justify-end space-x-4">
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
      Save
    </button>
    <button type="button" onClick={onDeactivate} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
      Deactivate Account
    </button>
  </div>
);

const UploadSection = ({ onUploadPhoto, onUploadBanner }: any) => (
  <div className="flex justify-between items-center mt-8">
    <button type="button" onClick={onUploadPhoto} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
      Upload Profile Photo
    </button>
    <button type="button" onClick={onUploadBanner} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
      Upload Profile Banner
    </button>
  </div>
);

export default ProfileEditPage;