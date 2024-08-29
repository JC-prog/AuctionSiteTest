import React, { useEffect, useState } from 'react';
import ProductCard from '../Cards/ProductCard';

// Interface
import Item from '../../interfaces/Item';

// API Function Call
import { fetchItemsByCategorySearch } from '../../services/ItemService';

type ItemProps = {
    username: string | null | undefined;
    keyword: string | null;
};

const ProductGridSearchCategory: React.FC<ItemProps> = ({ username, keyword }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Function to search for items based on keyword
    useEffect(() => {
        const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetchItemsByCategorySearch(username, keyword, currentPage);
            if (response.status !== 200) {
            throw new Error('Network response was not ok');
            }
            setItems(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
        };
  
    if (keyword) {
      fetchItems();
    }
  }, [keyword, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };
      
      const handlePreviousPage = () => {
        if (currentPage > 0) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
      };

    if (loading) {
        return <div className="w-full text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="w-full text-center py-4 text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4">
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
            <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
    
            <p className="text-sm text-gray-500">Page {currentPage + 1} of {totalPages}</p>
    
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
    );
};

export default ProductGridSearchCategory;
