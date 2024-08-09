import { useEffect, useState } from 'react';
import AdminUserList from '../../Components/List/AdminUserList'

import IUser from '../../interfaces/User';
import { fetchUsers } from '../../services/UserService';

const AdminUserManagementPage = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const loadUsers = async () => {
          try {
            const usersData = await fetchUsers(currentPage - 1);

            console.log(usersData);

            setUsers(usersData.data.content);
            setTotalPages(usersData.data.totalPages);

          } catch (error) {
            setError(error as Error);
          } finally {
            setLoading(false);
          }
        };
    
        loadUsers();
      }, []);
    
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
        <AdminUserList listTitle="User Management" users={users} />

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
  );
};

export default AdminUserManagementPage