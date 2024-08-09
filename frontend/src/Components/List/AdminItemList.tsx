import React from 'react'
import { Link } from 'react-router-dom';;
import { CiStop1, CiPlay1 } from 'react-icons/ci';
import IItem from '../../interfaces/Item';
import { suspendItem, activateItem } from '../../services/AdminService'; 

type ItemListProps = {
    listTitle: string;
    items: IItem[];
};

const AdminItemList: React.FC<ItemListProps> = ({ listTitle, items }) => {

    const handleSuspendItem = async (itemId: number) => {
        try {
            await suspendItem(itemId);
    
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    
        } catch (error) {
          
          console.error('Error suspending user:', error);
        }
      };
    
      const handleActivateItem = async (itemId: number) => {
        try {
          
            await activateItem(itemId);
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    
        } catch (error) {
          
          console.error('Error activating user:', error);
        }
      };

  return (
    <div className="mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold mb-4">{listTitle}</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                    <div className="col-span-1 text-center">
                        <span className="text-gray-500">Index</span>
                    </div>
                    <div className="col-span-2">
                        
                    </div>
                    <div className="col-span-3">
                        <h3 className="text-lg font-medium">Item Title</h3>
                    </div>
                    <div className="col-span-3 text-center">
                        <p>Item Price</p>
                    </div>
                    <div className="col-span-2">
                        <span className="text-gray-500">Status</span>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <p>Action</p>
                    </div>
                </div>
                {items.map((item, index) => (
                    <Link
                        to={`/item/${item.itemId}`}
                        key={item.itemId}
                        className="px-2 block transform transition-transform duration-300 hover:bg-gray-100"
                    >
                        <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                            <div className="col-span-1 text-center">
                                <span className="text-gray-500">{index + 1}</span>
                            </div>
                            <div className="col-span-2">
                                <img src='/bike.jpg' className="w-12 h-12 object-cover rounded-md" />
                            </div>
                            <div className="col-span-3">
                                <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                            </div>
                            <div className="col-span-3 text-center">
                                <p>${item.currentPrice}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-gray-500">{item.status}</span>
                            </div>
                            <div className="col-span-1 flex justify-center">
                            {item.status === "SUSPENDED" ? (
                                <button 
                                className="text-gray-500 hover:text-green-500"
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    handleActivateItem(item.itemId);
                                }}
                                >
                                <CiPlay1 size={20} className="hover:text-green-700" />
                                </button>
                            ) : (
                                <button 
                                className="text-gray-500 hover:text-red-500"
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    handleSuspendItem(item.itemId);
                                }}
                                >
                                <CiStop1 size={20} className="hover:text-red-700" />
                                </button>
                            )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
  )
}

export default AdminItemList