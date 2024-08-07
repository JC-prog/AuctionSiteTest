// src/Popup.tsx
import React, { useState } from 'react';
import IItem from '../../interfaces/IItem';

interface PopupProps {
    onClose: () => void;
}

const TradePopup: React.FC<PopupProps> = ({ onClose }) => {

    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const handleRowSelect = (rowIndex: number) => {
        setSelectedRow(rowIndex);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold">Items available for Trade</h2>
                <p className="mt-2"></p>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Item ID
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Item Title
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Item Price
                            </th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <input
                                    type="radio"
                                    name="rowSelect"
                                    checked={selectedRow === 1}
                                    onChange={() => handleRowSelect(1)}
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">Test1</td>
                            <td className="border border-gray-300 px-4 py-2">$100</td>
                        </tr>
                    </tbody>
                </table>

                {/* Actions */}
                <div>
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Close
                    </button>

                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Trade
                    </button>
                </div>
               
            </div>
        </div>
    );
};

export default TradePopup;
