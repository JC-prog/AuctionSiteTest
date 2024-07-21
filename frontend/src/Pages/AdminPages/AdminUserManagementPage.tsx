import React from 'react'
import AdminUserList from '../../Components/List/AdminUserList'

type User = {
    userId: number;
    image: string;
    title: string;
    price: number;
};

const users: User[] = [
    {
        userId: 1,
        image: '/bike.jpg',
        title: 'Bike',
        price: 20,
    },
    {
        userId: 2,
        image: '/bike.jpg',
        title: 'Laptop',
        price: 500,
    },
    // Add more items here
];

const AdminUserManagementPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AdminUserList listTitle="User Management" users={users} />
    </div>
  )
}

export default AdminUserManagementPage