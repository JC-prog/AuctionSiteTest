import React from 'react';
import { Link } from 'react-router-dom';
import { CiStop1, CiPlay1 } from 'react-icons/ci';
import { GrPowerReset } from "react-icons/gr";
import User from '../../interfaces/User';

import { toast } from 'react-toastify';


// API Function Call
import { resetPassword } from '../../services/AuthService';
import { suspendUser, activateUser } from '../../services/AdminService'; 

type UserListProps = {
  listTitle: string;
  users: User[];
};

const AdminUserList: React.FC<UserListProps> = ({ listTitle, users = [] }) => {

  const handleUserAction = async (username: string, action: 'suspend' | 'activate') => {
    try {
      if (action === 'suspend') {
        await suspendUser(username);
        toast.success('User suspended successfully.');
      } else {
        await activateUser(username);
        toast.success('User activated successfully.');
      }
      window.location.reload();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user. Please try again.`);
    }
  };

  const resetUser = async (username: string) => {
    try {
      await resetPassword(username);
      toast.success('User reset successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Error resetting user:', error);
      toast.error('Failed to reset user. Please try again.');
    }
  };

  return (
    <div className="mb-8 lg:mb-0">
      <h2 className="text-2xl font-semibold mb-4">{listTitle}</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
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
        {users.map((user, index) => (
          <Link
            to={`/user/${user.username}`}
            key={user.id}
            className="px-2 block transform transition-transform duration-300 hover:bg-gray-100"
          >
            <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
              <div className="col-span-1 text-center">
                <span className="text-gray-500">{index + 1}</span>
              </div>
              <div className="col-span-1">
                <img src="/bike.jpg" alt={user.username} className="w-12 h-12 object-cover rounded-md" />
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
                  <button 
                    className="text-gray-500 hover:text-green-500"
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleUserAction(user.username, 'activate');
                    }}
                  >
                    <CiPlay1 size={20} className="hover:text-green-700" />
                  </button>
                ) : (
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleUserAction(user.username, 'suspend');
                    }}
                  >
                    <CiStop1 size={20} className="hover:text-red-700" />
                  </button>
                )}
                <button
                  className="text-gray-500 hover:text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    resetUser(user.username);
                  }}
                >
                  <GrPowerReset size={20} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminUserList;
