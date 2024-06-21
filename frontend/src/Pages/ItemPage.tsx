import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Config
import api from '../config/api/loginApi';

// Compontent
import Timer from '../Components/Timer';

// Interface
interface Item {
    itemTitle: string;
    itemCategory: string;
    itemCondition: string;
    description: string;
    auctionType: string;
    endDate: Date;
    currentPrice: number;
    sellerName: string;
}

const ItemPage = () => {
    const { itemID } = useParams<{ itemID: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Bid Item
    const bidItem = async() => {

      

    }

    // Fetch Item
    useEffect(() => {
        const fetchItem = async () => {
          try {
            const response: AxiosResponse<Item> = await api.get(`api/item/${itemID}`);

                if (response.status !== 200) {
                throw new Error('Network response was not ok');
                }
                
                setItem(response.data);

            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchItem();
      }, [itemID]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="flex-shrink-0 mr-6">
          {/* Placeholder image */}
          <img src="/upload-photo.png" alt="Item Image" className="w-48 h-48 object-cover rounded-md shadow-md" />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4">{ item?.itemTitle }</h1>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block font-medium">Category</label>
              <h3>{ item?.itemCategory }</h3>
            </div>

            {/* Condition */}
            <div>
              <label htmlFor="condition" className="block font-medium">Condition</label>
              <h3>{ item?.itemCondition }</h3>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                readOnly
                value={ item?.description }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block font-medium">Auction Type</label>
              <h3>{ item?.auctionType }</h3>
            </div>

            {/* Current Price */}
            <div>
              <label htmlFor="startPrice" className="block font-medium">Price ($)</label>
              <h3>${item.currentPrice.toFixed(2)}</h3>
            </div>

            {/* Timer*/}
            <div>
              <label htmlFor="startPrice" className="block font-medium">Time Remaining</label>
               <Timer endTime={ item?.endDate }/>
            </div>

            {/* Seller*/}
            <div>
              <label htmlFor="startPrice" className="block font-medium">Seller:</label>
               <p>{ item?.sellerName }</p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
                <button 
                  onClick={ bidItem }
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Bid Item
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                    Trade Item
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ItemPage