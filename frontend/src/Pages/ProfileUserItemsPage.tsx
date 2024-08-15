import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Interface
import Item from '../interfaces/Item';


// Components
import ProductCard from '../Components/Cards/ProductCard';

// API Function Calls
import { fetchUserItemsByStatus } from '../services/ItemService';

const ProfileUserItemsPage = () => {
    const { username } = useParams<{ username: string }>();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Get items by seller
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const items = await fetchUserItemsByStatus(username, "LISTED", currentPage);
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
    }, [currentPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };
    
  return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6 mt-6">
                <h2 className="text-2xl font-bold">Listed Items for {username}</h2>
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

            <div className="flex justify-between items-center mt-4">
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span>
                    { items.length > 1 ? ( 
                        <>Page {currentPage + 1} of {totalPages}</>
                    ) : ( 
                        <>Page 0</>
                    )}
                    
                </span>
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>

        </div>
  )
}

export default ProfileUserItemsPage