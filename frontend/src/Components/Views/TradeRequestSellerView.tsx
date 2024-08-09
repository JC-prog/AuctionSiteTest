import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import TradeRequest from '../../interfaces/TradeRequest.ts';
import { fetchSellerTradeRequest, postAccept, postReject } from '../../services/TradeRequestService';
import api from '../../config/Api';
import { toast } from 'react-toastify';

// Custom hook for fetching item images
const useItemImages = (tradeRequests: TradeRequest[]) => {
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

    tradeRequests.forEach((tradeRequest) => fetchItemImage(tradeRequest.id));
  }, [tradeRequests]);

  return itemImages;
};

// Accept Action
const handleAccept = async (tradeRequestId: number) => {
  try {
    const response: AxiosResponse = await postAccept(tradeRequestId);

    if (response.status === 200) {
      toast.success('Ship Successful', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(`Ship Failed: ${response.data.error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Ship Failed. Please try again.', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }
};

// Reject Acation
const handleReject = async (tradeRequestId: number) => {
  try {
    const response: AxiosResponse = await postReject(tradeRequestId);

    if (response.status === 200) {
      toast.success('Deliver Successful', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } else {
      toast.error(`Deliver Failed: ${response.data.error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Deliver Failed. Please try again.', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }
};

// Render Available Actions
const renderActions = (status: string, tradeRequestId: number) => {
  switch (status) {
    case "PENDING":
      return (
          <>
            <button onClick={() => handleAccept(tradeRequestId)} className="mx-1 bg-green-500 text-white px-2 py-1 rounded">Accept</button>
            <button onClick={() => handleReject(tradeRequestId)} className="mx-1 bg-red-500 text-white px-2 py-1 rounded">Reject</button>
          </>);
    default:
      return <p></p>;
  };
};

// tradeRequest row component
const TradeRequestRow: React.FC<{ tradeRequest: TradeRequest; index: number; itemImage: string }> = ({ tradeRequest, index, itemImage }) => (
  <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
    <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
      <div className="col-span-1 text-center">
        <span className="text-gray-500">{index + 1}</span>
      </div>
      <div className="col-span-1">
        <img
          src={itemImage || "/image-placeholder.jpeg"} 
          alt="Item"
          className="w-12 h-12 object-cover rounded-md"
        />
      </div>
      <div className="col-span-2">
        <a href={`/item/{tradeRequest.buyerItemId}`} className="block">
          <h3 className="text-sm text-gray-500 px-1m">{tradeRequest.buyerItemTitle}</h3>
        </a>
      </div>
      <div className="col-span-1">
        <img
          src={itemImage || "/image-placeholder.jpeg"} 
          alt="Item"
          className="w-12 h-12 object-cover rounded-md"
        />
      </div>
      <div className="col-span-2">
        <p className="text-sm text-gray-500 px-1">{tradeRequest.sellerItemTitle}</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-gray-500 px-1">{new Date(tradeRequest.timestamp).toLocaleString()}</p>
      </div>
      <div className="col-span-1 flex items-center">
        {tradeRequest.status}
      </div>
      <div className="col-span-2 flex items-center">
        <button className="mx-1 bg-blue-500 text-white px-2 py-1 rounded">View</button>
        {renderActions(tradeRequest.status, tradeRequest.id)}
      </div>
    </div>
  </div>
);

// Main component
const TradeRequestSellerView: React.FC<{ username: string | null | undefined }> = ({ username }) => {
  const [tradeRequests, settradeRequests] = useState<TradeRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchtradeRequest = async () => {
      try {
        const response = await fetchSellerTradeRequest(username);
        settradeRequests(response.data.content);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchtradeRequest();
  }, [username]);

  const itemImages = useItemImages(tradeRequests);

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
            <div className="col-span-2">Timestamp</div>
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
                itemImage={itemImages[tradeRequest.id]}
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

export default TradeRequestSellerView;
