import React, { useEffect, useState } from 'react';
import ProductCard from '../Cards/ProductCard';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios'; 

// Interface
import Item from '../../interfaces/Item';

// API Function Call
import api from '../../config/Api';

type ItemProps = {
    username: string | null | undefined;
};

interface PaginatedResponse {
    content: Item[];
}

const ProductGridJustForYou: React.FC<ItemProps> = ({ username }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log(username);
                const response: AxiosResponse<PaginatedResponse> = await api.get(`/api/predict/${username}`);

                if (response.status !== 200) {
                    console.log('Network response was not ok');
                }

                setItems(response.data.content);
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div className="w-full text-center py-4">Loading...</div>;
    }

    return (
        <>
            {items.length > 0 ? (
                items.map((item) => (
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-6 mt-6">
                            <h2 className="text-2xl font-bold">Just For You</h2>
                            <Link to="/all-items" className="text-blue-500 hover:underline">Show all</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    
                        
                            <div key={item.itemId} className="">
                                <ProductCard item={item} username={username} />
                            </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <></>
                )}
        </>
    );
};

export default ProductGridJustForYou;
