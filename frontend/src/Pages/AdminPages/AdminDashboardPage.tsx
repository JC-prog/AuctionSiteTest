import React from 'react';
import { Link } from "react-router-dom";

import { CiCircleList } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";

const AdminDashboardPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">Admin Dashboard</h2>

            
            <div className="flex justify-center flex-wrap gap-8">
                <Link to="/admin/user-management" className="max-w-xs w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 text-center">User Management</h3>
                    <div className="flex justify-center">
                        <AiOutlineUser size={70}  />
                    </div>
                </Link>

                <Link to="/admin/listing-management" className="max-w-xs w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 text-center">Listing Management</h3>
                    <div className="flex justify-center">
                        <CiCircleList size={70} />
                    </div>
                </Link>

                <Link to="/admin/system-management" className="max-w-xs w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 text-center">System Management</h3>
                    <div className="flex justify-center">
                        <CiSettings size={70}  />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
