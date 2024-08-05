import React, { useState } from 'react';
import { toast } from 'react-toastify';

// Config
import api from '../../config/api/loginApi';

import { bidItem } from '../../services/BidService';

interface BidConfirmPopupProps {
    itemId: number;
    username: string;
    onClose: () => void;
}

const BidConfirmPopup: React.FC<BidConfirmPopupProps> = ({ itemId, username, onClose }) => {
    const [bidAmount, setBidAmount] = useState<number | string>('');

    const handleConfirm = async () => {
        try {
            const response = await bidItem(itemId, username, bidAmount);
            console.log(response.data);  // Logs the response message
            
            if (response.status === 200) {
                toast.success(response.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });

                setTimeout(() => {
                    window.location.reload();
                  }, 2000);
            } else {
                toast.error(response.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }
    
        } catch (error: any) {
            console.error('Error:', error);
            
            const errorMessage = error.response?.data || 'Bid Failed!';
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        } finally {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold">Confirm Your Action</h2>
                <p className="mt-2">Are you sure you want to proceed with this action?</p>

                <div className="mt-4">
                    <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">
                        Bid Amount
                    </label>
                    <input
                        type="number"
                        id="bidAmount"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="Enter your bid amount"
                    />
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        No
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BidConfirmPopup;
