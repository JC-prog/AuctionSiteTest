import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { CiStop1 } from "react-icons/ci";
type User = {
    userId: number;
    image: string;
    title: string;
    price: number;
};

type UserListProps = {
    listTitle: string;
    users: User[];
};

const AdminUserList: React.FC<UserListProps> = ({ listTitle, users }) => {
  return (
    <div className="mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold mb-4">{listTitle}</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {users.map((user, index) => (
                    <Link
                        to={`/user/${user.userId}`}
                        key={user.userId}
                        className="px-2 block transform transition-transform duration-300 hover:bg-gray-100"
                    >
                        <div className="grid grid-cols-12 users-center py-4 border-b border-gray-200">
                            <div className="col-span-1 text-center">
                                <span className="text-gray-500">{index + 1}</span>
                            </div>
                            <div className="col-span-2">
                                <img src={user.image} alt={user.title} className="w-12 h-12 object-cover rounded-md" />
                            </div>
                            <div className="col-span-3">
                                <h3 className="text-lg font-medium">{user.title}</h3>
                                <p className="text-sm text-gray-500">1 Bid</p>
                            </div>
                            <div className="col-span-3 text-center">
                                <p>{user.title}</p>
                            </div>
                            <div className="col-span-2 text-right">
                                <span className="text-gray-500">${user.price}</span>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button className="text-gray-500 hover:text-red-500" >
                                    <CiStop1 size={20} />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
  )
}

export default AdminUserList