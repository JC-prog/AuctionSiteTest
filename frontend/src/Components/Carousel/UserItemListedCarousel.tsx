import React, { useEffect, useState } from 'react';
import ProductCard from '../Cards/ProductCard';
import { Link } from 'react-router-dom';

// Interface
import Item from '../../interfaces/Item';

// API Function Call
import { fetchUserItemsByStatus } from '../../services/ItemService';

type ItemProps = {
    username: string | null | undefined;
};

const UserItemListedCarousel: React.FC<ItemProps> = ({ username }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetchUserItemsByStatus(username, "listed")

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                console.log(response.data);

                setItems(response.data.content);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div className="w-full text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="w-full text-center py-4 text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6 mt-6">
                <h2 className="text-2xl font-bold">Recently Listed</h2>
                <Link to= {`/user/listed-items/${username}`} className="text-blue-500 hover:underline">Show all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.itemId} className="">
                            <ProductCard item={item} username={username} />
                        </div>
                    ))
                ) : (
                    <div className="w-full flex items-center justify-center p-4 bg-gray-200 rounded-lg shadow-lg">
                        <p className="text-lg text-gray-500">No Listings</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserItemListedCarousel;
