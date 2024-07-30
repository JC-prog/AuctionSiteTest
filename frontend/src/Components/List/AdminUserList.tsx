import React from 'react';
import { Link } from 'react-router-dom';
import { CiStop1, CiPlay1 } from 'react-icons/ci';
import IUser from '../../interfaces/IUser';
import { suspendUser, activateUser } from '../../services/AdminService'; 
import { toast } from 'react-toastify';

type UserListProps = {
  listTitle: string;
  users: IUser[];
};

const AdminUserList: React.FC<UserListProps> = ({ listTitle, users = [] }) => {

  const handleSuspendUser = async (username: string) => {
    try {
      await suspendUser(username);

      window.location.reload();

    } catch (error) {
      
      console.error('Error suspending user:', error);
    }
  };

  const handleActivateUser = async (username: string) => {
    try {
      
      await activateUser(username);
     
      window.location.reload();

    } catch (error) {
      
      console.error('Error activating user:', error);
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
              <div className="col-span-1">
                
              </div>
              <div className="col-span-2">
                <h3 className="">Username</h3>
              </div>
              <div className="col-span-3">
                <p>Email</p>
              </div>
              <div className="col-span-2 text-left">
                <span className="">Account</span>
              </div>
              <div className="col-span-2 text-left">
                <span className="">Status</span>
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
                <p className="">{user.username}</p>
              </div>
              <div className="col-span-3">
                <p>{user.email}</p>
              </div>
              <div className="col-span-2">
                <span className="">{user.accountType}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">{user.status}</span>
              </div>
              <div className="col-span-1 flex justify-center">
                {user.status === "SUSPENDED" ? (
                    <button 
                      className="text-gray-500 hover:text-green-500"
                      onClick={(e) => {
                        e.preventDefault(); 
                        handleActivateUser(user.username);
                      }}
                    >
                      <CiPlay1 size={20} className="hover:text-green-700" />
                    </button>
                  ) : (
                    <button 
                      className="text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault(); 
                        handleSuspendUser(user.username);
                      }}
                    >
                      <CiStop1 size={20} className="hover:text-red-700" />
                    </button>
                  )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminUserList;
