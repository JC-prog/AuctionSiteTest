import React from 'react';

interface PopupProps {
    onClose: () => void;
}

const BidConfirmPopup: React.FC<PopupProps> = ({ onClose }) => {
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
                        onClick={() => {
                            // Add your action logic here
                            onClose();
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BidConfirmPopup;
