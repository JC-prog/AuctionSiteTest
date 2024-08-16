import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiStop1, CiPlay1 } from 'react-icons/ci';
import { GrPowerReset } from "react-icons/gr";
import { toast } from 'react-toastify';
import User from '../../interfaces/User';

// API Function Calls
import { resetPassword } from '../../services/AuthService';
import { suspendUser, activateUser } from '../../services/AdminService';
import api from '../../config/Api';

type UserListProps = {
  listTitle: string;
  users: User[];
};

const AdminUserList: React.FC<UserListProps> = ({ listTitle, users = [] }) => {
  const [userImages, setUserImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUserImages = async () => {
      for (const user of users) {
        await fetchUserImage(user.username);
      }
    };

    if (users.length) {
      fetchUserImages();
    }
  }, [users]);

  const fetchUserImage = async (username: string | null | undefined) => {
    if (!username) return; // Exit early if username is null or undefined
  
    try {
      const response = await api.get(`/api/user/photo/${username}`, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImages((prev) => ({ ...prev, [username]: reader.result as string }));
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Failed to fetch user image:', error);
    }
  };

  const handleUserAction = async (username: string | null | undefined, action: 'suspend' | 'activate') => {
    try {
      if (action === 'suspend') {
        await suspendUser(username);
        
      } else {
        await activateUser(username);
        
      }
      reloadPage();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user. Please try again.`);
    }
  };

  const resetUser = async (username: string | null | undefined) => {
    try {
      await resetPassword(username);
      toast.success('User reset successfully.');
      reloadPage();
    } catch (error) {
      console.error('Error resetting user:', error);
      toast.error('Failed to reset user. Please try again.');
    }
  };

  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="mb-8 lg:mb-0">
      <h2 className="text-2xl font-semibold mb-4">{listTitle}</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Header />
        {users.map((user, index) => (
          <UserRow
            key={user.id}
            index={index}
            user={user}
            userImage={userImages[user.id]}
            onActivate={() => handleUserAction(user.username, 'activate')}
            onSuspend={() => handleUserAction(user.username, 'suspend')}
            onReset={() => resetUser(user.username)}
          />
        ))}
      </div>
    </div>
  );
};

const Header = () => (
  <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
    <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
      <div className="col-span-1 text-center">
        <span className="text-gray-500">No</span>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-2">
        <h3>Username</h3>
      </div>
      <div className="col-span-3">
        <p>Email</p>
      </div>
      <div className="col-span-2 text-left">
        <span>Account</span>
      </div>
      <div className="col-span-2 text-left">
        <span>Status</span>
      </div>
      <div className="col-span-1 flex justify-center">
        Action
      </div>
    </div>
  </div>
);

type UserRowProps = {
  index: number;
  user: User;
  userImage: string | undefined;
  onActivate: () => void;
  onSuspend: () => void;
  onReset: () => void;
};

const UserRow: React.FC<UserRowProps> = ({ index, user, userImage, onActivate, onSuspend, onReset }) => (
  <Link
    to={`/user/${user.username}`}
    className="px-2 block transform transition-transform duration-300 hover:bg-gray-100"
  >
    <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
      <div className="col-span-1 text-center">
        <span className="text-gray-500">{index + 1}</span>
      </div>
      <div className="col-span-1">
        <img src={userImage || '/upload-photo.png'} className="w-12 h-12 object-cover rounded-md" />
      </div>
      <div className="col-span-2">
        <p>{user.username}</p>
      </div>
      <div className="col-span-3">
        <p>{user.email}</p>
      </div>
      <div className="col-span-2">
        <span>{user.accountType}</span>
      </div>
      <div className="col-span-2">
        <span className="text-gray-500">{user.status}</span>
      </div>
      <div className="col-span-1 flex justify-center space-x-2">
        {user.status === "SUSPENDED" || user.status === "DEACTIVATED" ? (
          <ActionButton onClick={onActivate} icon={<CiPlay1 size={20} />} color="green" />
        ) : (
          <ActionButton onClick={onSuspend} icon={<CiStop1 size={20} />} color="red" />
        )}
        <ActionButton onClick={onReset} icon={<GrPowerReset size={20} />} color="blue" />
      </div>
    </div>
  </Link>
);

type ActionButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  color: 'green' | 'red' | 'blue';
};

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, color }) => (
  <button
    className={`text-gray-500 hover:text-${color}-500`}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {icon}
  </button>
);

export default AdminUserList;
