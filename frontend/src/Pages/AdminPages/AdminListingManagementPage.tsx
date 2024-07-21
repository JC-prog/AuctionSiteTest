import React from 'react'

import AdminItemList from '../../Components/List/AdminItemList'


const items: Item[] = [
    {
        itemId: 1,
        image: '/bike.jpg',
        title: 'Bike',
        price: 20,
    },
    {
        itemId: 2,
        image: '/bike.jpg',
        title: 'Laptop',
        price: 500,
    },
    // Add more items here
];

const AdminListingManagementPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AdminItemList listTitle="Listings Management" items={items} />
    </div>
  )
}

export default AdminListingManagementPage