// src/Popup.tsx
import React, { useState, useEffect } from 'react';
import Item from '../../interfaces/Item';
import { toast } from 'react-toastify';
import { initiateTrade } from '../../services/TradeRequestService';
import { fetchCreatedItem } from '../../services/ItemService';

interface PopupProps {
    onClose: () => void;
    itemId: number | null | undefined;
    username: string | null | undefined;
}

const TradePopup: React.FC<PopupProps> = ({ onClose, itemId, username }) => {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedTradeItem, setSelectedTradeItem] = useState<number | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            console.log(itemId);
            try {
                const response = await fetchCreatedItem(username);

                console.log(response);

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setItems(response.data.content);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleSelectedRow = (index: number, tradeItemId: number) => {
        setSelectedRow(index);
        setSelectedTradeItem(tradeItemId);
    };

    const handleTrade = async () => {
        if (selectedTradeItem === null) {
            toast.warning('Please select an item to trade.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return;
        }

        try {
            const response = await initiateTrade(selectedTradeItem, username, itemId);

            const message = response.data;

            toast[response.status === 200 ? 'success' : 'error'](message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });

            if (response.status === 200) {
                setTimeout(() => window.location.reload(), 2000);
            }
        } catch (error: any) {
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">Items Available for Trade</h2>
                    {loading && <p className="text-center text-gray-500">Loading...</p>}
                    {error && <p className="text-center text-red-500">Error: {error.message}</p>}
                </div>

                {!loading && !error && (
                    <>
                        <div className="p-6">
                            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600">
                                        <th className="px-4 py-3 border-b border-gray-300 text-left text-xs font-medium uppercase text-center">Select</th>
                                        <th className="px-4 py-3 border-b border-gray-300 text-left text-xs font-medium uppercase">Item Title</th>
                                        <th className="px-4 py-3 border-b border-gray-300 text-left text-xs font-medium uppercase">Item Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length > 0 ? (
                                        items.map((item, index) => (
                                            <tr
                                                key={item.itemId}
                                                className={`hover:bg-gray-100 ${selectedRow === index ? 'bg-gray-200' : ''}`}
                                                onClick={() => handleSelectedRow(index, item.itemId)}
                                            >
                                                <td className="border-b border-gray-300 px-4 py-2 text-center">
                                                    <input
                                                        type="radio"
                                                        name="rowSelect"
                                                        checked={selectedRow === index}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="border-b border-gray-300 px-4 py-2">{item.itemTitle}</td>
                                                <td className="border-b border-gray-300 px-4 py-2">${item.currentPrice.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="border-b border-gray-300 px-4 py-2 text-center text-gray-500">
                                                No Items Available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleTrade}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                                disabled={selectedTradeItem === null}
                            >
                                Trade
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TradePopup;
