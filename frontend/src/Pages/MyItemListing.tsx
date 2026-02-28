import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFolder } from "react-icons/fa6";

// Api Function Call
import { fetchUserItemsByStatus } from '../services/ItemService';

// Interfaces
import IItem from '../interfaces/Item';

interface AuthProps {
    isAuth?: boolean;
    user: string | null | undefined;
}

import UserItemList from '../Components/List/UserItemList';

const ItemsTable: React.FC<AuthProps> = ({ user }) => {
    const [items, setItems] = useState<IItem[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const navigate = useNavigate();

    // Navigate to Create Listing Page
    const navigateToCreateListing = () => {
        navigate('/item/create');
    };

    // Handle filter changes
    const handleFilterChange = (value: string) => {
        setFilter(value);
        setCurrentPage(0); // Reset to first page on filter change
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Get items by seller with filter and pagination
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const items = await fetchUserItemsByStatus(user, filter, currentPage);
                setItems(items.data.content);
                setTotalPages(items.data.totalPages);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [user, filter, currentPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FaFolder className="text-blue-600" /> My Listings
            </h2>

            <div className="flex items-center space-x-4 py-4">
                <button
                    className="bg-green-500 text-white px-6 py-2 font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={navigateToCreateListing}
                >
                    Create New Listing
                </button>

                <select
                    className="block w-52 px-4 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                >
                    <option value="all" className="text-gray-500">Status</option>
                    <option value="CREATED" className="text-black">Created</option>
                    <option value="LISTED" className="text-black">Listed</option>
                    <option value="SOLD" className="text-black">Sold</option>
                    <option value="EXPIRED" className="text-black">Expired</option>
                    <option value="SUSPENDED" className="text-black">Suspended</option>
                    <option value="FINISHED" className="text-black">Finished</option>
                </select>
            </div>

            <UserItemList listTitle='My Listings' items={items} />

            { items.length > 0 ? ( 
                <div className="flex justify-between items-center mt-4">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                    >
                        Next
                    </button>
                </div>
            ) : ( 
                <></>
            )}
        </div>
    );
};

export default ItemsTable;
