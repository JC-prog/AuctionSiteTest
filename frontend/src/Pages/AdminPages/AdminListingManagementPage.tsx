import { useEffect, useState } from 'react';

import AdminItemList from '../../Components/List/AdminItemList'
import IItem from '../../interfaces/Item';
import { fetchItems } from '../../services/ItemService';

const AdminListingManagementPage = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
      const loadItems = async () => {
        setLoading(true);
        try {
          const usersData = await fetchItems(currentPage - 1);
          setItems(usersData.content);
          setTotalPages(usersData.totalPages);

          console.log(usersData);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };
      loadItems();
    }, [currentPage]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AdminItemList listTitle="Listings Management" items={items} />
        <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AdminListingManagementPage