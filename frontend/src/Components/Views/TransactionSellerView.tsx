import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import Transaction from '../../interfaces/Transaction';
import { fetchSellerTransaction } from '../../services/TransactionService';
import api from '../../config/Api';

// Custom hook for fetching item images
const useItemImages = (transactions: Transaction[]) => {
  const [itemImages, setItemImages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchItemImage = async (itemId: number) => {
      try {
        const response = await api.get(`/api/item/image/${itemId}`, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setItemImages((prev) => ({ ...prev, [itemId]: reader.result as string }));
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Failed to fetch item image:', error);
      }
    };

    transactions.forEach((transaction) => fetchItemImage(transaction.itemId));
  }, [transactions]);

  return itemImages;
};

// Transaction row component
const TransactionRow: React.FC<{ transaction: Transaction; index: number; itemImage: string }> = ({ transaction, index, itemImage }) => (
  <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
    <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
      <div className="col-span-1 text-center">
        <span className="text-gray-500">{index + 1}</span>
      </div>
      <div className="col-span-1">
        <img
          src={itemImage || "/image-placeholder.jpeg"} // Ensure you have the itemImage property or handle the image URL
          alt="Item"
          className="w-12 h-12 object-cover rounded-md"
        />
      </div>
      <div className="col-span-2">
        <a href={`/item/${transaction.itemId}`} className="block">
          <h3 className="text-lg font-medium">{transaction.itemTitle}</h3>
        </a>
      </div>
      <div className="col-span-1">
        <p className="text-sm text-gray-500 px-1">${transaction.saleAmount}</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-gray-500 px-1">{new Date(transaction.transactionTimestamp).toLocaleString()}</p>
      </div>
      <div className="col-span-1 flex items-center">
        {transaction.status}
      </div>
      <div className="col-span-3 flex items-center">
        <button className="mx-1 bg-blue-500 text-white px-2 py-1 rounded">View</button>
        <button className="mx-1 bg-blue-500 text-white px-2 py-1 rounded">Ship</button>
        <button className="mx-1 bg-blue-500 text-white px-2 py-1 rounded">Mark as Delivered</button>
      </div>
    </div>
  </div>
);

// Main component
const TransactionSellerView: React.FC<{ username: string }> = ({ username }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response: AxiosResponse<Transaction[]> = await fetchSellerTransaction(username);
        setTransactions(response.data.content);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [username]);

  const itemImages = useItemImages(transactions);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mb-8 lg:mb-0">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
          <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
            <div className="col-span-1 text-center">
              <span className="text-gray-500">Index</span>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-2">Item Title</div>
            <div className="col-span-1">Sale Amount</div>
            <div className="col-span-2">Transaction Timestamp</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-3">Action</div>
          </div>
        </div>
        <div>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                index={index}
                itemImage={itemImages[transaction.itemId]}
              />
            ))
          ) : (
            <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-lg text-gray-500">No Transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionSellerView;
