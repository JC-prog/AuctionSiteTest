import React from 'react';
import { toast } from 'react-toastify';

// Config
import api from '../../config/api/loginApi';

interface BidConfirmPopupProps {
    itemid: number;
    onClose: () => void;
}

const BidConfirmPopup: React.FC<BidConfirmPopupProps> = ({ itemid, onClose }) => {
    const handleConfirm = async () => {
        try {
            const response = await api.post('/api/bid/', { itemid });

            if (response.status === 200) {
                toast.success('Bid Successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                  });
            }

            // Handle success logic here
        } catch (error) {
            console.error('Error:', error);
            // Handle error logic here
        } finally {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold">Confirm Your Action</h2>
                <p className="mt-2">Are you sure you want to proceed with this action?</p>

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
