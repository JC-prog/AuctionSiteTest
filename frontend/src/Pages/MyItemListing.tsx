import React from 'react';

// Example data for items (replace with actual data or fetch from API)
const items = [
  { itemId: 1, itemTitle: 'Item 1', itemPrice: 100 },
  { itemId: 2, itemTitle: 'Item 2', itemPrice: 150 },
  { itemId: 3, itemTitle: 'Item 3', itemPrice: 200 },
];

const ItemsTable: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-4">My Listings</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Item Title</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Item Price</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 border-b border-gray-200"></th> {/* Empty cell for Edit button */}
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.itemId}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.itemId}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.itemTitle}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">${item.itemPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right text-sm leading-5 font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
