import React, { useEffect, useState } from 'react';
import ProductCard from '../Cards/ProductCard';
import { Link } from 'react-router-dom';

// Interface
import Item from '../../interfaces/Item';

// API Function Call
import { fetchItemsByCategory } from '../../services/ItemService';

type ItemProps = {
    username: string | null | undefined;
    category: string;
};

const HomeProductCategoryGrid: React.FC<ItemProps> = ({ username, category }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetchItemsByCategory(username, category)

                console.log(response);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

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
        <>
            {items.length > 0 ? (
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-6 mt-6">
                        <h2 className="text-2xl font-bold">{category}</h2>
                        <Link to="/all-items" className="text-blue-500 hover:underline">Show all</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {items.map((item) => (
                            <div key={item.itemId} className="">
                                <ProductCard item={item} username={username} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default HomeProductCategoryGrid;
