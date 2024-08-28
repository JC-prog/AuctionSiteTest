import React, { useEffect, useState } from 'react';
import TradeRequest from '../../interfaces/TradeRequest.ts';
import { fetchBuyerTradeRequest } from '../../services/TradeRequestService';
import api from '../../config/Api';

// Custom hook for fetching item images
const useItemImages = (tradeRequests: TradeRequest[]) => {
  const [buyerItemImages, setBuyerItemImages] = useState<{ [key: number]: string }>({});
  const [sellerItemImages, setSellerItemImages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchItemImage = async (itemId: number, setImage: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>) => {
      try {
        const response = await api.get(`/api/item/image/${itemId}`, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage((prev) => ({ ...prev, [itemId]: reader.result as string }));
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Failed to fetch item image:', error);
      }
    };

    tradeRequests.forEach((tradeRequest) => {
      fetchItemImage(tradeRequest.buyerItemId, setBuyerItemImages);
      fetchItemImage(tradeRequest.sellerItemId, setSellerItemImages);
    });
  }, [tradeRequests]);

  return { buyerItemImages, sellerItemImages };
};

// Render Available Actions
const renderActions = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <>
          {/* Add your pending actions here */}
        </>
      );
    default:
      return <p></p>;
  }
};

// tradeRequest row component
const TradeRequestRow: React.FC<{ tradeRequest: TradeRequest; index: number; buyerItemImage: string; sellerItemImage: string }> = ({ tradeRequest, index, buyerItemImage, sellerItemImage }) => (
  <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
    <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
      <div className="col-span-1 text-center">
        <span className="text-gray-500">{index + 1}</span>
      </div>
      <div className="col-span-1">
        <img
          src={buyerItemImage || "/image-placeholder.jpeg"} 
          alt="Item"
          className="w-12 h-12 object-cover rounded-md"
        />
      </div>
      <div className="col-span-2">
        <a href={`/item/${tradeRequest.buyerItemId}`} className="block">
          <h3 className="text-sm text-gray-500 px-1">{tradeRequest.buyerItemTitle}</h3>
        </a>
      </div>
      <div className="col-span-1">
        <img
          src={sellerItemImage || "/image-placeholder.jpeg"} 
          alt="Item"
          className="w-12 h-12 object-cover rounded-md"
        />
      </div>
      <div className="col-span-2">
        <a href={`/item/${tradeRequest.sellerItemId}`} className="block">
          <p className="text-sm text-gray-500 px-1">{tradeRequest.sellerItemTitle}</p>
        </a>
      </div>
      {/* 
      <div className="col-span-2">
        <p className="text-sm text-gray-500 px-1">
            {new Date(tradeRequest.timestamp).toLocaleString()}
        </p>
      </div> */}
      <div className="col-span-1 flex items-center">
        {tradeRequest.status}
      </div>
      <div className="col-span-2 flex items-center">
        <button className="mx-1 bg-blue-500 text-white px-2 py-1 rounded">View</button>
        {renderActions(tradeRequest.status)}
      </div>
    </div>
  </div>
);

// Main component
const TradeRequestBuyerView: React.FC<{ username: string | null | undefined }> = ({ username }) => {
  const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTradeRequests = async () => {
      try {
        const response = await fetchBuyerTradeRequest(username);
        setTradeRequests(response.data.content);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTradeRequests();
  }, [username]);

  const { buyerItemImages, sellerItemImages } = useItemImages(tradeRequests);

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
            <div className="col-span-2">Buyer Item</div>
            <div className="col-span-1"></div>
            <div className="col-span-2">Seller Item</div>
            {/* <div className="col-span-2">Timestamp</div> */}
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Action</div>
          </div>
        </div>
        <div>
          {tradeRequests.length > 0 ? (
            tradeRequests.map((tradeRequest, index) => (
              <TradeRequestRow
                key={tradeRequest.id}
                tradeRequest={tradeRequest}
                index={index}
                buyerItemImage={buyerItemImages[tradeRequest.buyerItemId]}
                sellerItemImage={sellerItemImages[tradeRequest.sellerItemId]}
              />
            ))
          ) : (
            <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-lg text-gray-500">No Requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeRequestBuyerView;
